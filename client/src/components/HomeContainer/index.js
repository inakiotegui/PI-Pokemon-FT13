import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
	clearPokemonDetail,
	getPokemons,
	getPokemonTypes,
	setPokemonsOrigin,
} from '../../actions';
import Cards from '../Cards/index';
import error from '../../assets/404.png';
import Filter from '../Filters/index';

import './HomeContainer.css';
var contador = 0;
function stateAux(){
	contador++
	return contador
}

export const HomeContainer = ({
	getPokemons,
	getPokemonTypes,
	pokemonList,
	clearPokemonDetail,
}) => {
	const [numPag, setNumPag] = useState(1)
	useEffect(() => {
		getPokemons();
		getPokemonTypes();
	}, [getPokemons, getPokemonTypes]);

	useEffect(() => {
		return () => clearPokemonDetail();
	}, []);

	let ren
	console.log(pokemonList,'eeeeeeeeeeeeee')
    if (numPag*12 > pokemonList.now.length){
        ren = pokemonList.all.slice((numPag*12)-12, pokemonList.length)
    } else {
        ren = pokemonList.all.slice((numPag*12)-12, numPag*12)
    }
	stateAux()
	const aux= pokemonList.all.length /12;
	const aux1= Math.ceil(aux)
	console.log(ren)
	if(contador<=1){
		return (
			<div className='loading_div'>
				<h1>Loading...</h1>
				<img src='https://weichiachang.github.io/pokemon-master/img/loading.45600eb9.gif' width="220" height="220" alt='Loading img'/>
			</div>
		)
	}else{
	return (
		<div className='body_div14'>
			<Filter/>
			{ren.length ? (
				console.log(pokemonList),
				console.log(ren,'aaaaaaaaaaaaaaaa'),
				<div className='div_cards'>
					{ren.map((pokes) => (
						<Cards
							key={pokes.id}
							id={pokes.id}
							name={pokes.name.charAt(0).toUpperCase() + pokes.name.slice(1)}
							types={pokes.types}
							image={pokes.image}
						/>
					))}
				</div>
			) : (
				<div className='not_found_div'>
                <h1>Pokemon NOT FOUND!!</h1>
                <img src={error} width="170" height="170" alt='Error img'/>
            </div>
			)}
			<div className='bottons10'>
                <button className='ant' onClick={()=>{numPag-1 === 0 ? setNumPag(1) : setNumPag(numPag-1)}}>Anterior</button>
                <button className='pag_actual'>{numPag}</button>
                <button className='sig' onClick={()=>{(numPag+1)*12 > pokemonList.all.length ? setNumPag(aux1) : setNumPag(numPag+1)}}>Siguiente</button>
            </div>
		</div>
	);}
};

const mapStateToProps = (state) => {
	return {
		pokemons: state.pokemons,
		pokemonList: state.pokemonList,
		pokemonFilter: state.pokemonFilter,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPokemons: () => dispatch(getPokemons()),
		getPokemonTypes: () => dispatch(getPokemonTypes()),
		setPokemonsOrigin: (origin) => dispatch(setPokemonsOrigin(origin)),
		clearPokemonDetail: () => dispatch(clearPokemonDetail()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);