import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Usuario {
    id: number;
    nombreCompleto: string;
    documento: { tipo: string, numero: string };
    fechaNacimiento: string;
    correo: string;
    celular: string;
    pais: string;
    ciudad: string;
    datosPersonales: boolean;
    fechaRegistro: string;
};

export interface PokemonTarjeta {
    id: number;
    name: string;
    image: string;
    type: string;
    baseExperience: string;
    esFavorito: boolean;
};

interface PokemonContextType {
    entrenadores : Usuario[];
    entrenadorActivo : Usuario | null;
    mochilaActual : PokemonTarjeta[];
    seleccionarEntrenador : (usuario: Usuario) => void; 
    registrarEntrenador : (usuario: Usuario) => void;
    resgistrarEntrenador : (usuario: Usuario) => void;
    guardarPokemonMochila : (pokemon : PokemonTarjeta) => void;
    actualizarFavorito : (pokemonId : number) => void;
    eliminarPokemon : (pokemonId : number ) => void;
};

const PokemonContext = createContext<PokemonContextType | undefined> (undefined);

export const PokemonProvider : React.FC<{ children : React.ReactNode}> = ({ children }) => {
    const [entrenadores,setEntrenadores] = useState<Usuario[]>([]);
    const [entrenadorActivo,setEntrenadorActivo] = useState<Usuario | null>(null);
    const [mochilaActual,setMochilaActual] = useState<PokemonTarjeta[]>([]); 

    useEffect(()=>{
        const data = localStorage.getItem('lista_entrenadores')
        if(data){
            const lista : Usuario[] = JSON.parse(data);
            setEntrenadores(lista);

            const idActivo = localStorage.getItem('entrenador_activo_id');
            if(idActivo){
                const encontrado =lista.find(u => u.id.toString()=== idActivo);
                if(encontrado) seleccionarEntrenador(encontrado);
            }
        }
    },[]);

    const cargarMochilaEntrnador = (usuarioId:number) =>{
        const data = localStorage.getItem(`mochila_${usuarioId}`);
        setMochilaActual(data ? JSON.parse(data) : []);
    };

    const seleccionarEntrenador =(usuario: Usuario) =>{
        setEntrenadorActivo(usuario);
        localStorage.setItem('entrenador_activo_id', usuario.id.toString());
        cargarMochilaEntrnador(usuario.id);
    };

    const registrarEntrenador = (nuevoUsuario : Usuario) =>{
        const actualizados = [...entrenadores, nuevoUsuario];
        setEntrenadores(actualizados);
        localStorage.setItem('lista_entrenadores',JSON.stringify(actualizados));
        seleccionarEntrenador(nuevoUsuario);
    };

    const resgistrarEntrenador = registrarEntrenador;
     const guardarPokemonMochila = (pokemon: PokemonTarjeta) => {
        if (!entrenadorActivo) return;

        const key = `mochila_${entrenadorActivo.id}`;
        const dataActual = localStorage.getItem(key);
        const mochilaReal: PokemonTarjeta[] = dataActual ? JSON.parse(dataActual) : [];

        // Evita guardar el mismo pokémon duplicado
        const yaExiste = mochilaReal.some(p => p.id === pokemon.id);
        if (yaExiste) {
            alert(`¡${pokemon.name} ya se encuentra en tu mochila!`);
            return;
        }

        const actualizada = [...mochilaReal, { ...pokemon, esFavorito: false }];
        localStorage.setItem(key, JSON.stringify(actualizada));
        setMochilaActual(actualizada); 
    };

    const actualizarFavorito = (pokemonId: number) => {
        if (!entrenadorActivo) return;

        const key = `mochila_${entrenadorActivo.id}`;
        const dataActual = localStorage.getItem(key);
        const mochilaReal: PokemonTarjeta[] = dataActual ? JSON.parse(dataActual) : mochilaActual;

        // Modifica únicamente el pokémon existente que coincida con el ID (sin crear elementos nuevos)
        const actualizada = mochilaReal.map(p =>
            p.id === pokemonId ? { ...p, esFavorito: !p.esFavorito } : p
        );

        localStorage.setItem(key, JSON.stringify(actualizada));
        setMochilaActual(actualizada);
    };

    const eliminarPokemon = (pokemonId: number) => {
        if (!entrenadorActivo) return;

        const key = `mochila_${entrenadorActivo.id}`;

        const dataActual = localStorage.getItem(key);
        const mochilaReal: PokemonTarjeta[] = dataActual ? JSON.parse(dataActual) : [];

        const existe = mochilaReal.some(p => p.id === pokemonId);
        if (!existe) {
            console.warn(`El Pokemon ${pokemonId} ya no existe en la base de datos`);
            setMochilaActual(mochilaReal); 
            return;
        }

        const filtrado = mochilaReal.filter(p => p.id !== pokemonId);
        localStorage.setItem(key, JSON.stringify(filtrado));
        setMochilaActual(filtrado);
    };
   return (
        <PokemonContext.Provider value={{
            entrenadores,
            entrenadorActivo,
            mochilaActual,
            seleccionarEntrenador,
            registrarEntrenador,
            resgistrarEntrenador,
            guardarPokemonMochila,
            actualizarFavorito,
            eliminarPokemon
        }}>
            { children }
        </PokemonContext.Provider>

        );
};
export const usePokemon = () => {
    const context = useContext(PokemonContext);
    if(!context) throw new Error('usePokemon debe usarse en un Provider');
    return context;
}