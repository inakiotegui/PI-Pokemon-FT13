import React, { useState } from 'react';
import {connect} from 'react-redux';
import {getPokemonSearch} from '../../actions';
import {NavLink} from 'react-router-dom';
import './SearchBar.css';

export const SearchBar = ({getPokemonSearch}) => {
	const [Name, setName] = useState('');

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Name.length!==0) {
			getPokemonSearch(Name);
		}
	};
    return (
		<div className= 'sb_div'>
			<div className='div_menu12'>
				<div className='div_title12'>
					<h2>Search for a Pokemon</h2>
				</div>
					<div className='div_btn12'>
				<form onSubmit={(e) => handleSubmit(e)}>
					<input
						className='input'
						type='text'
						autoComplete='off'
						onChange={(e) => handleChange(e)}
					/>
						<NavLink to={`/pokemon/search/${Name}`} className='link'>
							<button className='btn_search' type='submit'>
								Find it!
							</button>
						</NavLink>
				</form>
					</div>
			</div>
		</div>
	);
};

export default connect(null, {getPokemonSearch})(SearchBar);