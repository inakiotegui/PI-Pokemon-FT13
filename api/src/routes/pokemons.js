const {Router} = require('express');
const router = Router();
const axios = require('axios');
const { Op } = require("sequelize");
const {BASE_URL} = require('../utilities/constants');
const { Pokemon, Type } = require('../db.js');
const { v4: uuidv4 } = require('uuid');

var pokemonList = []

router.get('/', async (req, res, next) => {
    let { name } = req.query
    if(name) {
        try {
            let api = await axios.get(`${BASE_URL}${name}`)
            /*if (!api){
                let dbName = await Pokemon.findOne({
                    include: Type,
                    where: {
                        name: {
                            [Op.iLike]: name
                        }
                    }
                })
                console.log(dbName)
                res.status(200).json(dbName.data)
            }*/
            console.log(api)
            res.status(200).json(api.data)
        } catch (error) {
            next(error)
        }
    } else if(!name) {
        //if (pokemonList.lenght===0){
            let api = await axios.get(`${BASE_URL}`)
            let api2 = await axios.get(api.data.next)
            let dbPoke = await Pokemon.findAll()
            console.log(dbPoke)
            let allApi = api.data.results.concat(api2.data.results)
            //let slicedApi = api.data.results.slice(0,12)
            //console.log(allApi)
            for(i = 0; i < allApi.length; i++) {
                let pokemon = await axios.get(allApi[i].url)
                //console.log(pokemon)
                pokemonList.push({
                    image: pokemon.data.sprites.other.dream_world.front_default, 
                    name: pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.slice(1), 
                    types: pokemon.data.types.map((aux) => {
                        return {name: aux.type.name};
                    })
                })
            }
            res.status(200).json(pokemonList)
        //}
        //else{
            //return pokemonList
        //}
    }
})

router.get('/:idPokemon', async (req, res, next) => {
    const { idPokemon } = req.params
    if (idPokemon.length>34){
        try{
            let searchId = Number(idPokemon)
            let dbId = await Pokemon.findOne({
                include: Type,
                where: {
                    id: searchId
                }
            })
            res.status(200).send(dbId)
        } catch(error){
            next(error)
        }
    }
    else {try {
        let api = await axios.get(`${BASE_URL}${idPokemon}`)
        let info = {
            image: api.data.sprites.other.dream_world.front_default,
            name: api.data.name.charAt(0).toUpperCase() + api.data.name.slice(1),
            type: api.data.types[0].type.name,
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
	const uuid = uuidv4()
    const {
		image,
        name,
        types,
		hp,
		attack,
		defense,
		speed,
		weight,
		height,
	} = req.body;
    if (!name || !types){
        return res.status(404).send('Necessary parameters not found');
    }
    /*let pokeTypesId = types.split(',')
    let arrPokeTypesId = pokeTypesId.map(id => Number(id))
    let dbPokeTypes = await Type.findAll({
        where: {
            id: {
                [Op.or]: arrPokeTypesId
            }
        }
    })*/
    //await Pokemon.sync()
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
        //await newPokemon.setTypes(dbPokeTypes);
        const aux= await newPokemon.addType(types, {through:'PokemonType'})
        //await newPokemon.addType(types, {through:'PokemonType'})
        const result = await Pokemon.findOne({
            where: {
                name: name
            },
            include: Type
        });
        pokemonList.unshift(result)
        return res.status(200).send(result);
    }catch (error){
        next(error)
    }
})


module.exports= router;