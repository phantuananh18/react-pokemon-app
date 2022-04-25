import React from 'react';

const PokemonList = ({ pokemon }) => {
    return (
        <div>
            {pokemon.map(poke =>
                <p>{poke}</p>)}
        </div>
    )
}

export default PokemonList;