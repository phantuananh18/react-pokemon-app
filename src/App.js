import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './components/PokemonList';
import Pagination from './components/Pagination';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setprevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        setNextPageUrl(res.data.next);
        setprevPageUrl(res.data.previous);
        setPokemon(res.data.results.map(poke =>
          <div>
            <span>Name: <b>{poke.name}</b></span>
            <br />
            <span>Url: <b><ins>{poke.url}</ins></b></span>
          </div>
        ));
      })

    return () => cancel()
  }, [currentPageUrl])

  const gotoNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  }

  const gotoPrevPage = () => {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return "Loading...";


  return (
    <div className='App'>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </div>
  )
}

export default App;