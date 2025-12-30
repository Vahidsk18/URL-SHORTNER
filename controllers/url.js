const URL = require('../models/url')
const shortid = require('shortid')

async function handleUrlCreation(req, res) {
    let Orgurl = req.body.url;
    const short_id = shortid()

    if (!Orgurl) {
        return res.redirect('/')
    }

    if (!Orgurl.startsWith("http")) {
        Orgurl = "https://" + Orgurl;
    }

    if (!Orgurl) return res.status(400).json({ error: 'url is required' })
    await URL.create({
        shortId: short_id,
        redirectURL: Orgurl,
        visitHistory: [],
        createdBy: req.loggedInUser._id,
    })
    return res.redirect('/');
}

async function handleRedirectUrl(req, res) {
    const shortCode = req.params.shortid;
    const entry = await URL.findOneAndUpdate(
        { shortId: shortCode },
        {
            $push: {
                visitHistory: {
                    timeStamps: Date.now()
                },
            },
        }

    )
    if (!entry) return res.send("No url found")
    return res.redirect(entry.redirectURL);
}

async function handleGetAnalysisUrl(req, res) {
    const shortidd = req.params.shortid
    const result = await URL.findOne(
        { shortId: shortidd },
    )
    res.json({ clicks: result.visitHistory.length, analysis: result.visitHistory })
}

module.exports = {
    handleUrlCreation,
    handleRedirectUrl,
    handleGetAnalysisUrl,
}