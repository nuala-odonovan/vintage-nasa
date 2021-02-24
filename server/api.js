const axios = require("axios")

const router = require('express').Router()

router.get('/collection/', async(req, res, next) => {
    try{
        const year = req.params.year
        const response = await axios.get(`https://images-api.nasa.gov/search?media_type=video&year_end=1999&year_start=1952`)
        res.send(response.data)
    }
    catch(err){
        next(err)
    }})

router.get('/asset/:id', async(req, res, next) => {
    try{
        const id = req.params.id
        const {data} = await axios.get(`https://images-api.nasa.gov/asset/${id}`)
        const hrefList = data.collection.items
        const link = hrefList.filter(item => item.href.slice(-3) === 'mp4')[0]
        res.send(link)
    } catch(err){
        next(err)
    }
})

module.exports = router