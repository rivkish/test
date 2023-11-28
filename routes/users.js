const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {auth} = require("../middlewares/auth.js")

const { UserModel, validateUser, loginValid, createToken } = require("../models/userModel")
const router = express.Router();

router.get("/", async (req, res) => {
    let perPage = Math.min(req.query.perPage, 20) || 10;
    let page = req.query.page || 1;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? -1 : 1;
    try {
        let data = await UserModel
            .find({})
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ [sort]: reverse })

        res.json(data)
    }
    catch (err) {
        res.status(500).json({ msg: "err", err })
    }
})

router.post("/", async (req, res) => {
    let validBody = validateUser(req.body)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }
    try {
        let user = new UserModel(req.body)
        user.password = await bcrypt.hash(user.password, 10)
        await user.save()
        user.password = "********"
        res.status(201).json(user)
    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({ msg: "Email already in system try again", code: 11000 })
        }
        res.status(500).json({ msg: "err", err })
    }
})

router.get("/myEmail", auth, async (req, res) => {
    try {
        let user = await UserModel.findOne({ _id: req.tokenData._id }, { email: 1 })
         res.json(user)
    }
    catch (err) {
        res.status(500).json({ msg: "err", err })
    }
})


router.post("/login", async (req, res) => {
    let validLogin = loginValid(req.body)
    if (validLogin.error) {
        return res.status(400).json(validLogin.error.details)
    }
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ msg: "No user found" })
        }
        let valisPass = await bcrypt.compare(req.body.password, user.password)

        if (!valisPass) {
            return res.status(403).json({ msg: "wrong password" })
        }
        let newToken = createToken(user._id);
        res.json({ token: newToken });
    }
    catch (err) {
        res.status(500).json({ msg: "err", err })
    }
})

router.get("/myInfo",auth, async (req, res) => {
    try {
        let user = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0})
         res.json(user)
    }
    catch (err) {
        res.status(500).json({ msg: "err", err })
    }
})

router.put("/:id", async (req, res) => {

    let validBody = validateUser(req.body)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }
    try {
        let id = req.params.id
        req.body.password = await bcrypt.hash(user.password, 10)
        let data = await CountryModel.updateOne({ _id: id }, req.body)
        res.status(201).json(data)
    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({ msg: "Email already in system try again", code: 11000 })
        }
        res.status(500).json({ msg: "err", err })
    }
})
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id
        let data = await UserModel.deleteOne({ _id: id })
        res.json(data)
    }
    catch (err) {
        res.status(500).json(err)
    }

})

module.exports = router;
