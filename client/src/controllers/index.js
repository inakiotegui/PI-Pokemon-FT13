export const GetPokemonsList = (array, min, max) => {
	if (!min && !max) {
		//return array.slice(0, 12);
		return array;
	}
	return array.slice(min, max);
};

export const GetPokemonOrder = (order, array) => {
	const firstArray= array;
	switch (order) {
		case 'All':
			return firstArray.sort((a,b)=>{
				if(a.id > b.id){
					return 1;
				}else{
					return -1;
				}
			});
		case 'A-Z':
			return firstArray.sort((a, b) => {
				const nameA = a.name.charAt(0).toUpperCase() +a.name.slice(1)
				const nameB = b.name.charAt(0).toUpperCase() +b.name.slice(1)
				if (nameA > nameB) {
					return 1;
				} else {
					return -1;
				}
			});
		case 'Z-A':
			return firstArray.sort((a, b) => {
				const nameA = a.name.charAt(0).toUpperCase() +a.name.slice(1)
				const nameB = b.name.charAt(0).toUpperCase() +b.name.slice(1)
				if (nameA < nameB) {
					return 1;
				} else {
					return -1;
				}
			});
		case 'More Attack':
			return firstArray.sort((a, b) => {
				if (a.attack < b.attack) {
					return 1;
				} else {
					return -1;
				}
			});
		case 'Less Attack':
			return firstArray.sort((a, b) => {
				if (a.attack > b.attack) {
					return 1;
				} else {
					return -1;
				}
			});
		case 'More Defense':
			console.log(firstArray)
			return firstArray.sort((a, b) => {
				if (a.defense < b.defense) {
					return 1;
				} else {
					return -1;
				}
			});
		default:
			return array;
	}
};

export const GetPokemonOrigin = (origin, array) => {
	switch (origin) {
		case 'PokeAPI':
			return array.filter((el) => typeof el.id === 'number');

		case 'HenryPokedex':
			let reg_ex = /-/;
			return array.filter((el) => el.id.toString().search(reg_ex) !== -1);

		case 'All':
			return array;

		default:
			return array;
	}
};

export const GetPokemonType = (type, array) => {
	if (type === 'All') return array;
	let newArray = array.filter((el) =>
		el.types.length
			? el.types[0].name === type
				? true
				: el.types.length > 1
				? el.types[1].name === type
					? true
					: false
				: false
			: false
	);
	console.log(newArray)
	return newArray;
};

export const Validate = (data) => {
	let errores = {};
	let reg = /^\d+$/;
	if (!data.name) {
		errores.name = 'Name is required';
	}
	if (!data.hp || data.hp.search(reg) === -1) {
		errores.hp = 'HP is required and it must be a number';
	}
	if (!data.attack || data.attack.search(reg) === -1) {
		errores.attack = 'Attack is required and it must be a number';
	}
	if (!data.defense || data.defense.search(reg) === -1) {
		errores.defense = 'Defense is required and it must be a number';
	}
	if (!data.speed || data.speed.search(reg) === -1) {
		errores.speed = 'Speed is required and it must be a number';
	}
	if (!data.height || data.height.search(reg) === -1) {
		errores.height = 'Height is required and it must be a number';
	}
	if (!data.weight || data.weight.search(reg) === -1) {
		errores.weight = 'Weight is required and it must be a number';
	}
	return errores;
};

export default {
	GetPokemonsList,
	GetPokemonOrder,
	GetPokemonOrigin,
	GetPokemonType,
	Validate,
};