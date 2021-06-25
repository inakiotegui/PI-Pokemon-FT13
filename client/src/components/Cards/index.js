import React from 'react';
import {NavLink} from 'react-router-dom';
import './Cards.css';

export const Card = ({id, name, types, image, pokemonFilter, handleClick}) => {
	return (
		<div>
			{pokemonFilter === 'Search' ? (
				<div value={'All'} onClick={handleClick} className='div_back'>
					{'< BACK'}
				</div>
			) : null}
			<NavLink to={`/pokemon/${id}`} className='link'>
				<div className='div_card'>
					<img className='img' src={image} width="170" height="170" alt='Image' />
					<div className='div_name'>{name}</div>
					<div className='div_type_container'>
						{types &&
							types.map((el, i) => (
								<div key={i} className='div_types'>
									<p key={i} className='p'>
										{el.name}
									</p>
								</div>
							))}
					</div>
				</div>
			</NavLink>
		</div>
	);
};

export default Card;