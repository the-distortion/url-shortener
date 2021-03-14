// redirection of short url to long url

const express = require("express")
const router = express.Router()

const Url = require("../model/URL")

// @route   GET /:urlCode
// @desc    Redirect to long/original URL
router.get("/:code", async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code })

        if (url) return res.redirect(url.longUrl)
        else return res.status(404).json("Url not found!")
    } catch (error) {
        console.error(error)
        res.status(500).json("Server error!!")
    }
})

module.exports = router