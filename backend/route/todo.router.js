const express = require('express')
const { get, post, put, deleted } = require('../controller/todo.controller')
const router = express.Router()

router.get('/',get)
router.post('/',post)
router.put('/:id',put)
router.delete('/:id',deleted)

module.exports =router