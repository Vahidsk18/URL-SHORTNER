const express = require('express')
const router = express.Router();
const { handleUrlCreation, handleRedirectUrl, handleGetAnalysisUrl } = require('../controllers/url')

router.post('/',handleUrlCreation)

router.get('/:shortid', handleRedirectUrl)

router.get('/analysis/:shortid', handleGetAnalysisUrl)

module.exports = router