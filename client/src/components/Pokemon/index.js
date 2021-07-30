import React from 'react';
import './Pokemon.css';

const Pokemon = ({
	id,
	name,
	hp,
	attack,
	defense,
	speed,
	height,
	weight,
	types,
	image,
}) => {
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
			<div className='div_poke_card' key={id}>
				<div className='div_img'>
					<img src={image} width="220" height="220" className='img' alt='image' />
					<div className='div_type_container'>
						{types &&
							types.map((el, i) => (
								<div key={i} className={cssButtonType(el)}>
									<p key={el.name} className='p'>
										{el.name}
									</p>
								</div>
							))}
					</div>
				</div>
				<div className='div_title'>
					<h1>{name.toUpperCase()}</h1>
				</div>
				<div className='div_details'>
                    <div>❤️HP={hp}</div>
                    <div>💪Attack={attack}</div>
                    <div>🛡️Defense={defense}</div>
                    <div>💨Speed={speed}</div>
                    <div>📏Height={height}</div>
                    <div>⚖️Weight={weight}</div>
				</div>
			</div>
	);
};

export default Pokemon;