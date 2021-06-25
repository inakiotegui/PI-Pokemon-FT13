const {Router} = require('express');
const router = Router();
const axios = require('axios');
const { Op } = require("sequelize");
const {BASE_URL} = require('../utilities/constants');
const { Pokemon, Type } = require('../db.js');
const { v4: uuidv4 } = require('uuid');

var pokemonList = []

router.get('/', async (req, res, next) => {
    const { name } = req.query
    console.log(name)
    if(name) {
        let response = await Pokemon.findOne({
            include: Type,
            where: {
                name: {
                    [Op.iLike]: name
                }
            }
        })
        console.log('*********',response,'***********')
        if (response!==null){
            let info = {
                image: response.dataValues.image,
                name: response.dataValues.name.charAt(0).toUpperCase() + response.dataValues.name.slice(1),
                types: response.dataValues.types.map((aux) => {
                    return {name: aux.name};
                }),
                id: response.dataValues.id,
                hp: response.dataValues.hp,
                attack: response.dataValues.attack,
                defense: response.dataValues.defense,
                speed: response.dataValues.speed,
                weight: response.dataValues.weight,
                height: response.dataValues.height
            }
            return res.json(info)
        }
        try {
            let api = await axios.get(`${BASE_URL}/${name}`)
                let info = {
                    image: api.data.sprites.other.dream_world.front_default,
                    name: api.data.name.charAt(0).toUpperCase() + api.data.name.slice(1),
                    types: api.data.types.map((aux) => {
                        return {name: aux.type.name.charAt(0).toUpperCase() + aux.type.name.slice(1)};
                    }),
                    id: api.data.id,
                    hp: api.data.stats[0].base_stat,
                    attack: api.data.stats[1].base_stat,
                    defense: api.data.stats[2].base_stat,
                    speed: api.data.stats[5].base_stat,
                    weight: api.data.weight,
                    height: api.data.height
                }
                return res.status(200).json(info)
        } catch (error) {
            next(error)
        }
    } else{
        if (pokemonList.length<40){
            let api = await axios.get(`${BASE_URL}`)
            let api2 = await axios.get(api.data.next)
            let allApi = api.data.results.concat(api2.data.results)
            //let slicedApi = api.data.results.slice(0,12)
            //console.log(allApi)
            for(i = 0; i < allApi.length; i++) {
                let pokemon = await axios.get(allApi[i].url)
                //console.log(pokemon)
                pokemonList.push({
                    id: pokemon.data.id,
                    image: pokemon.data.sprites.other.dream_world.front_default, 
                    attack: pokemon.data.stats[1].base_stat,
                    defense: pokemon.data.stats[2].base_stat,
                    name: pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.slice(1), 
                    types: pokemon.data.types.map((aux) => {
                        return {name: aux.type.name.charAt(0).toUpperCase() + aux.type.name.slice(1)};
                    })
                })
            }
            res.status(200).json(pokemonList)
        }
        else{
            return res.status(200).json(pokemonList)
        }
    }
})

router.get('/:idPokemon', async (req, res, next) => {
    const { idPokemon } = req.params
    if (idPokemon.length>34){
        try{
            let dbId = await Pokemon.findOne({
                include: Type,
                where: {
                    id: idPokemon
                }
            })
            res.status(200).send(dbId)
        } catch(error){
            next(error)
        }
    }
    else {try {
        let api = await axios.get(`${BASE_URL}/${idPokemon}`)
        let info = {
            image: api.data.sprites.other.dream_world.front_default,
            name: api.data.name.charAt(0).toUpperCase() + api.data.name.slice(1),
            types: api.data.types.map((aux) => {
                return {name: aux.type.name.charAt(0).toUpperCase() + aux.type.name.slice(1)};;
            }),
            id: api.data.id,
            hp: api.data.stats[0].base_stat,
            attack: api.data.stats[1].base_stat,
            defense: api.data.stats[2].base_stat,
            speed: api.data.stats[5].base_stat,
            weight: api.data.weight,
            height: api.data.height
        }
        res.status(200).send(info)
    } catch (error) {
        next(error)
    }}
})

router.post('/', async (req, res, next) => {
	console.log(req.body)
    const uuid = uuidv4()
    const {
		image,
        name,
        type,
		hp,
		attack,
		defense,
		speed,
		weight,
		height,
	} = req.body;
    if (!name || !type){
        return res.status(404).send('Necessary parameters not found');
    }
    try {
        const newPokemon = await Pokemon.create({
            id: uuid,
            image,
            name,
            hp,
            attack,
            defense,
            speed,
            weight,
            height,
        });
        console.log(typeof type)
        //await types.map((aux)=>
            //newPokemon.addType(aux.name, {through: 'PokemonType'}))
        if (typeof type ==='number'){
            await newPokemon.addType(type, {through:'PokemonType'})
        }
        else{
            await newPokemon.addType(type[0], {through:'PokemonType'})
            await newPokemon.addType(type[1], {through:'PokemonType'})
        }
        //await newPokemon.addType(type2, {through:'PokemonType'})
        //await newPokemon.addType(types, {through:'PokemonType'})
        const result = await Pokemon.findOne({
            where: {
                name: name
            },
            include: Type
        });
        pokemonList.push(result)
        return res.status(200).send(result);
    }catch (error){
        next(error)
    }
})


module.exports= router;
