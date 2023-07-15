import React, { useState, useEffect } from 'react'
import Restart from './Restart';
import Header from './Header';
const Playground = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState([]);
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    const [end, setEnd] = useState(false)

    useEffect(() => {
        fetchPokemonList();
    }, []);

    const fetchPokemonList = async () => {
        const randomOffset = Math.floor(Math.random() * 1000);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${randomOffset}`);
        const data = await response.json();
        const results = data.results;

        const fetchedPokemonList = await Promise.all(
            results.map(async (pokemon) => {
                const pokemonDataResponse = await fetch(pokemon.url);
                const pokemonData = await pokemonDataResponse.json();
                return {
                    name: pokemonData.name,
                    image: pokemonData.sprites.front_default,
                };
            })
        );

        setPokemonList(shuffleArray(fetchedPokemonList));
        setSelectedPokemon([]);
    };

    const handleClick = (pokemon) => {
        if (!selectedPokemon.length) {
            setSelectedPokemon(selectedPokemon.concat(pokemon))
            setScore(1)
            if(score > bestScore) {
                setBestScore(score)
            }
            setPokemonList(shuffleArray(pokemonList))

        }
        if (!selectedPokemon.includes(pokemon)) {
            setSelectedPokemon(selectedPokemon.concat(pokemon))
            const nextScore = score + 1
            if(nextScore > bestScore) {
                setBestScore(nextScore)
            }
            setScore(nextScore)
            setPokemonList(shuffleArray(pokemonList))

        }
        else {
                setEnd(true)
        }
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    const handleRestart = () => {
        setScore(0)
        setSelectedPokemon([])
        fetchPokemonList()
        setEnd(false)
    }

    return (
        <>
        <Header score={score} bestScore={bestScore}/>
        <section>

            <div className='md:container mx-auto md:py-8'>
                <p className='text-center text-white text-xl font-mono'>Click a pokemon. Do not click a pokemon twice.</p>
                <div>
                    <ul className='flex flex-wrap gap-4 justify-center py-4'>
                        {pokemonList.map((pokemon, index) => (
                            <li key={index} onClick={() => handleClick(pokemon)} className='w-32 flex flex-col items-center hover:scale-110 md:w-40'>
                                <img src={pokemon.image} alt={pokemon.name} className='w-28 md:w-36' />
                                <p className='text-xl text-violet-500 font-mono font-semibold text-center'>{pokemon.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                {end ? <Restart handleRestart={handleRestart}>Restart</Restart> : null}</div>
            </div>

        </section>
        </>
    )
}

export default Playground