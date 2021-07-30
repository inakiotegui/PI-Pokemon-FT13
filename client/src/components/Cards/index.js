import React from 'react';
import {NavLink} from 'react-router-dom';
import './Cards.css';

export const Card = ({id, name, types, image}) => {
	const cssType = (type1) => {
		switch (type1.name) {
			case 'Normal': {
				return 'div_normal'
			}
			case 'Fighting': {
				return 'div_fighting'
			}
			case 'Flying': {
				return 'div_flying'
			}
			case 'Poison': {
				return 'div_poison'
			}            
			case 'Ground': {
				return 'div_ground'
			}
			case 'Rock': {
				return 'div_rock'
			}            
			case 'Bug': {
				return 'div_bug'
			}
			case 'Ghost': {
				return 'div_ghost'
			}
			case 'Steel': {
				return 'div_steel'
			}
			case 'Fire': {
				return 'div_fire'
			}
			case 'Water': {
				return 'div_water'
			}
			case 'Grass': {
				return 'div_grass'
			}
			case 'Electric': {
				return 'div_electric'
			}
			case 'Psychic': {
				return 'div_psychic'
			}
			case 'Ice': {
				return 'div_ice'
			}
			case 'Dragon': {
				return 'div_dragon'
			}
			case 'Dark': {
				return 'div_dark'
			}       
			case 'Fairy': {
				return 'div_fairy'
			}
			case 'Unknown': {
				return 'div_unknown'
			}       
			case 'Shadow': {
				return 'div_shadow'
			}
			default:
				return 'div_normal'
		}
    }
	const cssButtonType = (tipo) => {
		switch (tipo.name) {
			case 'Normal': {
				return 'tipo_normal'
			}
			case 'Fighting': {
				return 'tipo_fighting'
			}
			case 'Flying': {
				return 'tipo_flying'
			}
			case 'Poison': {
				return 'tipo_poison'
			}            
			case 'Ground': {
				return 'tipo_ground'
			}
			case 'Rock': {
				return 'tipo_rock'
			}            
			case 'Bug': {
				return 'tipo_bug'
			}
			case 'Ghost': {
				return 'tipo_ghost'
			}
			case 'Steel': {
				return 'tipo_steel'
			}
			case 'Fire': {
				return 'tipo_fire'
			}
			case 'Water': {
				return 'tipo_water'
			}
			case 'Grass': {
				return 'tipo_grass'
			}
			case 'Electric': {
				return 'tipo_electric'
			}
			case 'Psychic': {
				return 'tipo_psychic'
			}
			case 'Ice': {
				return 'tipo_ice'
			}
			case 'Dragon': {
				return 'tipo_dragon'
			}
			case 'Dark': {
				return 'tipo_dark'
			}       
			case 'Fairy': {
				return 'tipo_fairy'
			}
			case 'Unknown': {
				return 'tipo_unknown'
			}       
			case 'Shadow': {
				return 'tipo_shadow'
			}
			default:
				return 'tipo_normal'
		}
    }
	return (
		<div>
			<NavLink to={`/pokemon/${id}`} className='link'>
				<div className={cssType(types[0])}>
					<img className='img' src={image} width="105" height="105" alt='Image' />
					<div className='div_name'>{name}</div>
					<div className='div_type_container'>
						{types &&
							types.map((el, i) => (
								<div key={i} className={cssButtonType(el)}>
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