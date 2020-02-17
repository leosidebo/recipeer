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

router.get('/:id', async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id)
        res.render('chefs/show', {
            chef: chef
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id)
        res.render('/chefs/edit', {
            chef: chef
        })
    } catch {
        res.redirect('/chefs')
    }
})

router.put('/:id', async (req, res) => {
    let chef
    try {
        chef = await Chef.findById(req.params.id)
        chef.name = req.body.name,
        chef.role = req.body.role,
        chef.hoursPerWeek = req.body.hoursPerWeek,
        chef.shift = req.body.shift,
        chef.yearsWorked = req.body.yearsWorked 

        await book.save()
        res.redirect(`/chefs`) // Update to specific id route
    } catch {
        res.redirect('/')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        
    } catch {
        res.redirect('/')
    }
})


module.exports = router
