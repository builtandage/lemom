var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
var base = '1610A';
var coll = 'iconlist'

var list = require('./classifyApi/index.js');
router.get('/classify', list.iconlist);
router.get('/addclassify', list.addclassify);
router.get('/getclassify', list.getclassify)

module.exports = router;