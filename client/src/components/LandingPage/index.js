import React from 'react';
import {Link} from 'react-router-dom';
import {StyledDiv} from './styled';
import pokedex from '../../assets/pokedex1.png';

export const LandingPage = () => {
	return (
		<StyledDiv>
			<div className='div_img'>
				<img src={pokedex} />
			</div>
			<div className='div_btn'>
				<Link to='/home'>
					<button className='btn'>Ingresar</button>
				</Link>
			</div>
		</StyledDiv>
	);
};

export default LandingPage;