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
	return (
			<div className='div_poke_card' key={id}>
				<div className='div_img'>
					<img src={image} width="220" height="220" className='img' alt='image' />
					<div className='div_type_container'>
						{types &&
							types.map((el, i) => (
								<div key={i} className='div_types'>
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