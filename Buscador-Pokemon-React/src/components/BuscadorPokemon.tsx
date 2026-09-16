import React, { useState } from 'react';
import {usePokemon, type PokemonTarjeta } from '../context/PokemonContext'

export const BuscadorPokemon: React.FC = () =>{

    const { entrenadorActivo, guardarPokemonMochila } = usePokemon();

    const [busqueda, setBusqueda] = useState('');
    const [pokemonActual, setPokemonActual] = useState<PokemonTarjeta | null>(null);
    const [mensajeError, setMensajeError] = useState<string | null>(null);
    const [cargando, setCargando] = useState(false);

    const buscarPokemon = async (e: React.FormEvent) => {
        e.preventDefault();

        const query = busqueda.trim().toLowerCase();

        if(!query) return;

        setCargando(true);
        setMensajeError(null);

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if(!res.ok) throw new Error('Auxilio, Socorro, no hay Pokemon');

            const datos = await res.json();
            const pokemonEncontrado: PokemonTarjeta = {
                id: datos.id,
                name: datos.name.toUpperCase(),
                image: datos.sprites.front_default,
                type: datos.types[0].type.name,
                baseExperience: datos.base_experience,
                esFavorito: false
            };

            setPokemonActual(pokemonEncontrado);
            guardarPokemonMochila(pokemonEncontrado);
            alert(`El Pokemon ${pokemonEncontrado.name} es guardado en la mochila de ${entrenadorActivo?.nombreCompleto}`);
        } catch (error: any) {
            setPokemonActual(null);
            setMensajeError(error.message);
        } finally {
            setCargando(false);
        }

    };

return(
<div>
    <div>
        {entrenadorActivo ? (
            <p>Mochila Activa de: <strong>{entrenadorActivo.nombreCompleto}</strong></p>
        ) : (
            <p>No hay entrenador Activo. Ve al formulario de Registro para activarlo, socio.</p>
        )}
    </div><form onSubmit={buscarPokemon}>
            <div>
                <label>Buscar Pokemon</label>
                <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}></input>
            </div>
            <button type='submit' disabled={cargando}> {cargando ? 'Escaneando...' : 'Buscar'}
            </button>
            {mensajeError && <p>{mensajeError}</p>}
        </form>

{pokemonActual && (
    <div>
        <h3>{pokemonActual.name}</h3>
        <img src={pokemonActual.image}></img>
    </div>
)}
</div>
);
};