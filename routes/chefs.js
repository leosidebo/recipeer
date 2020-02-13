const express = require('express')
const router = express.Router()
const Chef = require('../models/chef')
const Role = require('../models/role')
const Shift = require('../models/shift')

/** 
 * All Chefs Route
 */
router.get('/', async (req, res) => {
    try {
        const chefs = await Chef.find()
        res.render('chefs', { chefs: chefs })
    } catch {
        res.redirect('/')
    }
})

/** 
 * New Chef Route
 */
router.get('/new', async (req, res) => {
    try {
        const roles = await Role.find()
        const shifts = await Shift.find()
        res.render('chefs/new', { chef: new Chef(), roles: roles, shifts: shifts })
    } catch {
        res.redirect('/')
    }
})

/** 
 * Create Chef Route
 */
router.post('/', async (req, res) => {

    const chef = new Chef({
        name: req.body.name,
        role: req.body.role,
        hoursPerWeek: req.body.hoursPerWeek,
        shift: req.body.shift,
        yearsWorked: req.body.yearsWorked
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
