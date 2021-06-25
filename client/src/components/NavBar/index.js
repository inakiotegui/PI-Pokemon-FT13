import React from 'react';
import { NavLink } from 'react-router-dom';
import pokedex from '../../assets/pokedex.png';
import SearchBar from '../SearchBar/index';

import './NavBar.css';

export default function NavBar() {
    return (
        <header className="navbar">
            <div>
            <NavLink exact to="/">
                <img id="pokedexLogo" src={pokedex} width="220" height="50" className="d-inline-block align-top" alt="" />
            </NavLink>
            </div>
            <div>
                <SearchBar/>
            </div>
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/home" >Home</NavLink>
                        <NavLink to="/create" >Create a Pokemon</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}