// post route to create a url to insert into DB

const express = require("express")
const router = express.Router()
const config = require("config")
const shortid = require("shortid")
const validUrl = require("valid-url")

const Url = require("../model/URL")

// @route   POST /api/url/shorten
// @desc    Create short URL
router.post("/shorten", async (req, res) => {
    const { longUrl } = req.body
    const baseUrl = config.get("baseURI")

    if (!validUrl.isUri(baseUrl))
        return res.status(401).json("Invalid Base URL !!")

    // Create URL code
    let urlCode = shortid.generate()

    // Check long URL
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl })
            if (url)
                res.json(url)
            else {
                // collision handling
                while (await Url.findOne({ urlCode }))
                    urlCode = shortid.generate()

                const shortUrl = baseUrl + urlCode
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })

                await url.save()
                res.json(url)
            }
        } catch (error) {
            console.error(err)
            res.status(500).json("Server Error!!")
        }
    }
    else res.status(401).json("Invalid Long URL")
})

module.exports = router