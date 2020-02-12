const express = require('express')
const router = express.Router()
const Chef = require('../models/chef')

/** 
 * All Chefs Route
 */
router.get('/', async (req, res) => {
    res.send('All Chefs')
})

/** 
 * New Chef Route
 */
router.get('/new', async (req, res) => {
    res.render('chefs/new', { chef: new Chef() })
})

/** 
 * Create Chef Route
 */
router.post('/', async (req, res) => {
    let professional = true
    if (req.body.professional != true) {
        professional = false
    }

    const chef = new Chef({
        name: req.body.name,
        professional: professional
    })

    try {
        const newChef = await chef.save()
        res.redirect('/chefs')
    } catch (e) {
        console.log(e)
        res.render('chefs/new', {
            chef: chef
        })
    }
})

module.exports = router
