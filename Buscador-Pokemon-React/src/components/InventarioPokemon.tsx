import React from 'react';
import { usePokemon } from '../context/PokemonContext';

export const InventarioPokemon: React.FC = () =>{

    const { entrenadorActivo, eliminarPokemon, actualizarFavorito, mochilaActual } = usePokemon();

        if(!entrenadorActivo){
            return(
            <div>
                <h3> NO HAY ENTRENADORES </h3>
                <p> Por favor asigne <strong>entrenador activo</strong> o registre un entrenador</p>
            </div>
            );}


return(
<div className="banner=sesion">
    <header>
        <h2> Mochila de {entrenadorActivo?.nombreCompleto}</h2>
    </header>

    <div className="grid-mochila">
        {mochilaActual.length > 0 ? (
            mochilaActual.map( (poke, index) => (
                <div key={poke.id} className={`tarjeta-item ${poke.esFavorito ? 'tarjeta-favorita' : ''}`}>
                    <span>
                        #{index + 1} de {mochilaActual.length}
                    </span>

                    <img src={poke.image}></img>
                    <h4>{poke.name}</h4>
                    <p> {poke.type} </p>

                    <div className="panel-botones">
                        <button className={`btn-favorito ${poke.esFavorito ? 'activo' : ''}`}
                        onClick={() => actualizarFavorito(poke.id)} >
                            {poke.esFavorito ? '🌟⭐ Favorito' : '⭐ Marcar'}
                        </button>
                        <button type='button' className='btn-eliminar' onClick={() => eliminarPokemon(poke.id)}>
                            Liberar o soltar
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <div>
                <p>Tu mochila está vacía actualmente.</p>
                <p> Vaya y capture pokemon, papi!</p>
            </div>
        )
        }
    </div>
</div>
);
};