import React from 'react';
import {connect} from 'react-redux';
import {
	setPokemonsOrder,
	setPokemonsOrigin,
	setPokemonsType,
} from '../../actions';
import './Filters.css';

const Filters = ({
	setPokemonsOrder,
	setPokemonsOrigin,
	setPokemonsType,
	pokemonsTypes,
}) => {
	const handleFilter = (e) => {
		setPokemonsOrder(e.target.value);
	};

	const handleOrigin = (e) => {
		setPokemonsOrigin(e.target.value);
	};
	const handleTypes = (e) => {
		setPokemonsType(e.target.value);
	};

	return (
			<div className='div_filters'>
				<label className='label_fil'>
                    Filters
                </label>
				<select name='Orden alfabético/Nivel de fuerza' onChange={(e) => handleFilter(e)}>
					<option value='All'>All</option>
					<option value='A-Z'>A-Z</option>
					<option value='Z-A'>Z-A</option>
					<option value='More Attack'>More Attack</option>
					<option value='Less Attack'>Less Attack</option>
					<option value='More Defense'>More Defense</option>
				</select>
				<select name='Type' onChange={(e) => handleTypes(e)}>
					<option value='All'>All</option>
					{pokemonsTypes &&
						pokemonsTypes.map((t, i) => (
							<option key={i} value={t.name}>
								{t.name}
							</option>
					))}
				</select>
				<select name='Origin' onChange={(e) => handleOrigin(e)}>
					<option value='All'>All</option>
					<option value='PokeAPI'>PokeAPI</option>
					<option value='HenryPokedex'>HenryPokedex</option>
				</select>
			</div>
	);
};

const mapStateToProps = (state) => {
	return {
		pokemonsTypes: state.pokemonsTypes,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setPokemonsOrder: (order) => dispatch(setPokemonsOrder(order)),
		setPokemonsOrigin: (origin) => dispatch(setPokemonsOrigin(origin)),
		setPokemonsType: (type) => dispatch(setPokemonsType(type)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

