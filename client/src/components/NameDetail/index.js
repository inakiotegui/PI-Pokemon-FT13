import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {clearPokemonDetail, getPokemonSearch} from '../../actions/index';
import Pokemon from '../Pokemon/index';
import '../PokeDetail/PokeDetail.css';
import NavBar from '../NavBar/index';
import BackButton from '../BackButton/index';

export const NameDetail = ({
	match,
	pokemonDetail,
	getPokemonSearch,
	clearPokemonDetail,
}) => {
	useEffect(() => {
		getPokemonSearch(match.params.name);
		return () => clearPokemonDetail();
	}, []);
	
	return (
		<div>
			<NavBar/>
			<BackButton/>
		<div className= 'div_home'>
			{pokemonDetail && (
				<Pokemon
					id={pokemonDetail.id}
					name={pokemonDetail.name}
					hp={pokemonDetail.hp}
					attack={pokemonDetail.attack}
					defense={pokemonDetail.defense}
					speed={pokemonDetail.speed}
					height={pokemonDetail.height}
					weight={pokemonDetail.weight}
					types={pokemonDetail.types}
					image={pokemonDetail.image}
				/>
			)}
		</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	console.log(state,'++++++++++++')
	return {
		pokemonDetail: state.pokemonDetail[0],
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPokemonSearch: (name) => dispatch(getPokemonSearch(name)),
		clearPokemonDetail: () => dispatch(clearPokemonDetail()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NameDetail);