const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    let user = await User.findOne({
        where: {email: req.body.email}
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)){
        res.status(404).json({
            message: "Could not find a user with the provided username and password."
        })
    } else{
        req.session.userId = user.userId
        res.json({user})
    }
})

router.get("/profile", async (req, res) => {
    try {
        let user = await User.findOne({
            where: {userId: req.session.userId}
        })
        res.json(user)
    } catch (error) {
        res.json(null)
    }
})

router.post("/super-important-route", async (req, res) => {
    if(req.session.userId){
        console.log("Does super cool stuff and super important and also super secret and-")
        res.send("Done.")
    } else{
        console.log("You're not authorized to do all of the cool stuff here!")
        res.send("Denied.")
    }
})

module.exports = router
