import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemon, type PokemonTarjeta } from '../context/PokemonContext';
export const BuscadorPokemon: React.FC = () => {
    const navigate = useNavigate(); // 👈 2. Inicializar navigate
    const { entrenadorActivo, guardarPokemonMochila } = usePokemon();
    const [busqueda, setBusqueda] = useState('');
    const [pokemonActual, setPokemonActual] = useState<PokemonTarjeta | null>(null);
    const [mensajeError, setMensajeError] = useState<string | null>(null);
    const [cargando, setCargando] = useState(false);
    const buscarPokemon = async (e: React.FormEvent) => {
        e.preventDefault();
        const query = busqueda.trim().toLowerCase();
        if (!query) return;
        setCargando(true);
        setMensajeError(null);
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if (!res.ok) throw new Error('Auxilio, Socorro, no hay Pokemon');
            const datos = await res.json();
            setPokemonActual({
                id: datos.id,
                name: datos.name.toUpperCase(),
                image: datos.sprites.front_default,
                type: datos.types[0].type.name,
                baseExperience: datos.base_experience,
                esFavorito: false
            });
        } catch (error: any) {
            setPokemonActual(null);
            setMensajeError(error.message);
        } finally {
            setCargando(false);
        }
    };
    const clickGuardar = () => {
        if (!entrenadorActivo) {
            alert('Debes seleccionar o registrar un entrenador');
            return;
        }
        if (pokemonActual) {
            guardarPokemonMochila(pokemonActual);
            alert(`El Pokemon ${pokemonActual.name} es guardado en la mochila de ${entrenadorActivo?.nombreCompleto}`);
            setBusqueda('');
            setPokemonActual(null);
            setMensajeError(null);
            navigate('/inventario');
        }
    };

return(
<div className="">
    <div>
        {entrenadorActivo ? (
            <p>Mochila Activa de: <strong>{entrenadorActivo.nombreCompleto}</strong></p>
        ) : (
            <p>No hay entrenador Activo. Ve al formulario de Registro para activarlo, socio.</p>
        )}
    </div>
    
    <form onSubmit={buscarPokemon}>
        <div>
            <label>Buscar Pokemon</label>
            <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}></input>
        </div>
        <button type='submit' disabled={cargando}> {cargando ? 'Escaneando...' : 'Buscar'}
        </button>
    </form>

{pokemonActual && (
    <div>
        <h3>{pokemonActual.name}</h3>
        <img src={pokemonActual.image}></img>
        <p>
            Elemento: {''}
            <span style={{
                backgroundColor: 
                    pokemonActual.type === 'fire' ? '#FF0000' :
                    pokemonActual.type === 'water' ? '#0000FF' :
                    pokemonActual.type === 'grass' ? '#00FF00' :
                    pokemonActual.type === 'electric' ? '#FFFF00' : '#c5bdc8',
                color: 'white',
                padding: '3px 8px',
                borderRadius: '10px',
            }}>
                {pokemonActual.type.toUpperCase()}
            </span>
        </p>
        <p>Experiencia Base: <strong>{pokemonActual.baseExperience}</strong></p>
        <button type='button' className='btn-capturar' onClick={clickGuardar} disabled={!entrenadorActivo}>
            Guardar en la mochila          
        </button>
    </div>
)}
</div>
);
};