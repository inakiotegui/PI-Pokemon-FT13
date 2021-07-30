import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {clearPokemonDetail, getPokemonDetail} from '../../actions/index';
import Pokemon from '../Pokemon/index';
import './PokeDetail.css';
import NavBar from '../NavBar/index';
import BackButton from '../BackButton/index';

export const PokeDetail = ({
	match,
	pokemonDetail,
	getPokemonDetail,
	clearPokemonDetail,
}) => {
	useEffect(() => {
		getPokemonDetail(match.params.id);
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
	console.log(state.pokemonDetail)
	return {
		pokemonDetail: state.pokemonDetail[0],
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPokemonDetail: (id) => dispatch(getPokemonDetail(id)),
		clearPokemonDetail: () => dispatch(clearPokemonDetail()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PokeDetail);