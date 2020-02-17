const express = require('express')
const router = express.Router()
const Role = require('../models/role')

router.get('/', async (req, res) => {
    try {
        const roles = await Role.find()
        res.json(roles)
    } catch {
        return res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getRole, async (req, res) => {
    res.json(res.role)
})

router.post('/', async (req, res) => {
    const role = new Role({
        name: req.body.name,
        description: req.body.description,
        salaryPerMonth: req.body.salaryPerMonth
    })

    try {
        const newRole = await role.save()
        res.status(201).json(newRole)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

async function getRole(req, res, next) {
    let role
    try {
        role = await Role.findById(req.params.id)
        if (role == null) {
            return res.status(404).json({ message: "Cannot find Role" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.role = role
    next()
}

module.exports = router