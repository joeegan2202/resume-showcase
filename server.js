const mongo = require('mongodb')
const express = require("express")
const crypto = require('crypto')
const app = express()
const port = 3500

var main = null

mongo.connect('mongodb://127.0.0.1:4000', (err, result) => {
  main = result.db('main')
})

app.get('/', (req, res) => {
  main.collection('sessions').findOne({session: req.query.session}, (err, find) => {
    res.send(find)
  })
})

app.get('/auth', (req, res) => {
  let uname = req.query.uname
  let pword = req.query.pword

  main.collection('auth').findOne({uname, pword}, (err, find) => {
    console.log(find._id.toString())
    const now = Date.now()
    const session = crypto.createHash('md5').update(find._id.toString() + now).digest('hex')
    main.collection('sessions').insertOne({time: now, session})
    res.send({session})
  })
})

app.listen(port, () => console.log('Started'))