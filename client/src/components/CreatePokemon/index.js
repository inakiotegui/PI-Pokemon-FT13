import axios from 'axios';
import React, {useEffect, useState, Fragment, useCallback} from 'react';
import {connect} from 'react-redux';
import { getPokemonTypes } from '../../actions/index';
import { Validate } from '../../controllers';
import { POKEMONS } from '../../utilities/constants';
import NavBar from '../NavBar/index';
import './CreatePokemon.css'

export const CreatePokemon = ({pokemonsTypes, getPokemonTypes}) => {
	const [Data, setData] = useState({
		name: '',
		hp: '',
		attack: '',
		defense: '',
		speed: '',
		height: '',
		weight: '',
		type: 1,
		image: '',
	});

	const [Errores, setErrores] = useState({});
	const [Types, setTypes] = useState([]);
	const [Alert, setAlert] = useState({errores: false, create: false});

	useEffect(() => {
		getPokemonTypes();
	}, [getPokemonTypes]);

	useEffect(() => {
		setErrores(Validate(Data));
	}, [Data]);

	useEffect(() => {
		if (!Object.keys(Errores).length) {
			setAlert({...Alert, errores: false});
		}
	}, [Errores]);

	useEffect(() => {
		if (Types.length!==0) {
			let total = pokemonsTypes.reduce((acc, el) => {
				if (Types.includes(el.name) === true) {
					acc.push(el.id);
				}
				return acc;
			}, []);
			setData({...Data, type: total});
		}
	}, [Types]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(Errores).length) {
			alert('POKEMON NO CREADO');
		} else {
			try {
				console.log(Data)
                if(Data.image.length===0){
                    Data.image='https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png';
                }
                await axios.post(POKEMONS, Data);
				setAlert({...Alert, create: true});
			} catch (err) {
				alert('POKEMON NO CREADO');
			}
		}
	};

	const handleChange = (e) => {
		console.log(e)
        setData({...Data, [e.target.name]: e.target.value});
	};
	const handleTypes = (e) => {
		if (Types.length < 2) {
			if (!Types.includes(e.target.value)) {
				setTypes([...Types, e.target.value]);
			}
		} else setTypes([e.target.value]);
	};
    console.log(Types)

	return (
        <div>
        <NavBar/>
		<Fragment>
            <form onSubmit={(e) => handleSubmit(e)}>
				<div className='div_g'>
					<div className='div_title_daleboca'>
						<h1 className='title'>Crea tu Pokemon</h1>
					</div>
					{Alert.errors ? (
						<div className='div_errors'>
							<ul>
								{Object.values(Errores).map((err) => (
									<li key={err} className='li_text'>
										{err}
									</li>
								))}
							</ul>
						</div>
					) : null}
                    <div className='div_name1'>
                        <div >
                            <label >
                                Name:
                            </label>
                        </div>
                        <input
                            className='input'
                            key='name'
                            name='name'
                            type='text'
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className='div_hp'>
                        <div >
                            <label >
                                HP:
                            </label>
                        </div>
                        <input
                            className='input'
                            key='hp'
                            name='hp'
                            type='text'
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className='div_attack'>
                        <div >
                            <label >
                                Attack:
                            </label>
                        </div>
                        <input
                            className='input'
                            key='attack'
                            name='attack'
                            type='text'
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className='div_defense'>
                        <div >
                            <label >
                                Defense:
                            </label>
                        </div>
                        <input
                            className='input'
                            key='defense'
                            name='defense'
                            type='text'
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className='div_speed'>
                        <div >
                            <label >
                                Speed:
                            </label>
                        </div>
                        <input
                            className='input'
                            key='speed'
                            name='speed'
                            type='text'
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className='div_height'>
                        <div >
                            <label >
                                Height:
                            </label>
                        </div>
                        <input
                            className='input'
                            key='height'
                            name='height'
                            type='text'
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className='div_weight'>
                        <div >
                            <label >
                                Weight:
                            </label>
                        </div>
                        <input
                            className='input'
                            key='weight'
                            name='weight'
                            type='text'
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className='div_image'>
                        <div >
                            <label >
                                Image URL:
                            </label>
                        </div>
                        <input
                            className='input'
                            key='image'
                            name='image'
                            type='text'
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
					<div className='div_types2'>
                            <div>
                            <label >
                                Types:
                            </label>
                            </div>
						<select onChange={(e) => handleTypes(e)}>
							{pokemonsTypes &&
								pokemonsTypes.map((t, i) => (
									<option key={i} value={t.name}>
										{t.name}
									</option>
								))}
						</select>
						<div className='div_type_container'>
							{Types &&
								Types.map((el, i) => (
									<div key={i} className='div_type'>
										<label className='label'>{el}</label>
									</div>
								))}
						</div>
					</div>
					<div className='div_naranpol'>
						<button className='div_submit1' type='submit1'>
							Crear!
						</button>
					</div>
					{Alert.create ? (
						<div className='div_create_confirm'>
							<h3 className='message_create'>
								Tu Pokemon se ha creado correctamente!
							</h3>
						</div>
					) : null}
				</div>
			</form>
		</Fragment>
        </div>
	);
};

const mapStateToProps = (state) => {
	console.log(state)
    return {
		pokemonsTypes: state.pokemonsTypes,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPokemonTypes: () => dispatch(getPokemonTypes()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePokemon);