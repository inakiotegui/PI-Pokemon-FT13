const router = require('express').Router();
const axios = require('axios');
const { Type } = require('../db.js')
const {TYPE_URL} = require('../utilities/constants');


router.get('/', async (req, res) => {
    const dbTypes = await Type.findAll();
    if (dbTypes.lenght===0){
        try {
            let api = await axios.get(TYPE_URL)
            for(i = 0; i < api.data.results.lenght; i++) {
                await Type.create({
                    name: api.data.results[i].name.charAt(0).toUpperCase() + api.data.results[i].name.slice(1)
                })
            }
        }catch(error){
            return res.status(404).send('Types not found')
        }
    } else {
        return res.status(200).json(dbTypes)
    }
})
/*async function getAddTypes (req, res) {
    
    const dbTypes =await Tipo.findAll();
    if(dbTypes.length === 0) {
        try {
            const types = await axios('https://pokeapi.co/api/v2/type');
            for(let i in types.data.results){
                await Tipo.create({name: types.data.results[i].name});
            }
              
         } catch(error) {

           return res.status(404).send('ERROR!')
         }
        } else {
            return res.status(200).json(dbTypes);
        }
}*/

module.exports = router;