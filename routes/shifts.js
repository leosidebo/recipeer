const express = require('express')
const router = express.Router()
const Shift = require('../models/shift')

router.get('/', async (req, res) => {
    try {
        const shifts = await Shift.find()
        res.json(shifts)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getShift, async (req, res) => {
    res.json(res.shift)
})

router.post('/', async (req, res) => {
    const shift = new Shift({
        name: req.body.name,
        payBoost: req.body.payBoost
    })

    try {
        const newShift = await shift.save()
        res.json(newShift)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

async function getShift(req, res, next) {
    let shift
    try {
        shift = await Shift.findById(req.params.id)
        if (shift == null) {
            return res.status(404).json({ message: "Cannot find Shift" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.shift = shift
    next()
}

module.exports = router