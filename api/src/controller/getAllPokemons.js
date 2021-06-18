async function getAllPokemons (req, res, next){
    let { name } = req.query
    if(name) {
        try {
            let api = await axios.get(`${BASE_URL}/${name}`)
            res.status(200).send(api)
        } catch (error) {
            res.status(404).send('Pokemon not found')
        }
    } else {
        let pokemonList = []
        let api = await axios.get(`${BASE_URL}`)
        let slicedApi = api.data.results.slice(0,12)
        for(i = 0; i < slicedApi.length; i++) {
            let pokemon = await axios.get(slicedApi[i].url)
            pokemonList.push({
                image: pokemon.sprites.other.official-artwork.front_default, 
                name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1), 
                types: pokemon.types
            })
        }
        res.status(200).send(pokemonList)
    }
}