import {
	GetPokemonOrder,
	GetPokemonOrigin,
	GetPokemonType,
	GetPokemonsList,
} from '../controllers/index';

const initialState = {
	pokemons: [],
	pokemonDetail: [],
	pokemonList: {
		all: [],
		now: [],
	},
	pokemonsTypes: [],
	pokemonFilter: 'All',
	pokemonOrigin: 'All',
};

const rootReducer = (state = initialState, {payload, type}) => {
	switch (type) {
		case 'GET_POKEMONS':
			return {
				...state,
				pokemons: payload,
				pokemonList: {
					all: payload,
					now: GetPokemonsList(payload),
				},
			};
		case 'GET_POKEMONS_TYPES':
			return {
				...state,
				pokemonsTypes: payload,
			};
		case 'GET_POKEMON_DETAIL':
			return {
				...state,
				pokemonDetail: state.pokemonDetail.concat(payload),
			};
		case 'SET_POKEMONS_VIEWS':
			return {
				...state,
				pokemonList: {
					...state.pokemonList,
					now: GetPokemonsList(
						state.pokemonList.all,
						payload.min,
						payload.max
					),
				},
			};

		case 'GET_POKEMON_NAME':
			return {
				...state,
				pokemonDetail: state.pokemonDetail.concat(payload),
			};
		case 'POKEMONS_ORDER':
			console.log(payload, state.pokemonList.all)
			return {
				...state,
				pokemonList: {
					...state.pokemonList,
					now: GetPokemonsList(
						GetPokemonOrder(payload, state.pokemonList.all)
					),
				},
				pokemonFilter: payload,
			};
		case 'POKEMONS_ORIGIN':
			return {
				...state,
				pokemonList: {
					...state.pokemonList,
					now: GetPokemonsList(GetPokemonOrigin(payload, state.pokemons)),
					all: GetPokemonOrigin(payload, state.pokemons),
				},

				pokemonOrigin: payload,
				pokemonFilter: payload,
			};
		case 'POKEMONS_TYPE':
			state.pokemonList.all = GetPokemonType(
				payload,
				GetPokemonOrigin(state.pokemonOrigin, state.pokemons)
			);
			return {
				...state,
				pokemonList: {
					...state.pokemonList,
					now: GetPokemonsList(state.pokemonList.all),
				},
				pokemonFilter: payload,
			};
		case 'CLEAR_POKEMON_DETAIL':
			return {
				...state,
				pokemonDetail: [],
				pokemonFilter: '',
			};
		default:
			return state;
	}
};

export default rootReducer;