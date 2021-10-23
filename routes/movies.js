var express = require('express');
var router = express.Router();
var moviesController = require('../controller/movies')

router.route('/search').get(moviesController.search)
router.route('/detail').get(moviesController.detail)

module.exports = router;
