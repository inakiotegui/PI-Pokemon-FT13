import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import NavBar from "./components/NavBar/index";
import HomeContainer from './components/HomeContainer';
import PokeDetail from './components/PokeDetail';
import NameDetail from './components/NameDetail';
import CreatePokemon from './components/CreatePokemon';

function App() {
  return (
    <React.Fragment>
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={NavBar} />
      <Route path='/home' component={HomeContainer} />
      <Route path='/pokemon/search/:name' component={NameDetail} />
      <Route path='/create' component={CreatePokemon} />
      <Route exact path='/pokemon/:id' component={PokeDetail} />
    </React.Fragment>
  );
}

export default App;

/*
<Route path='/home' component={SearchBar} />
<h1>Henry Pokemon</h1>*/