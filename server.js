const mongo = require('mongodb')
const express = require("express")
const crypto = require('crypto')
const cors = require('cors')
const app = express()
app.use(cors()) // Allow cross origin referencing
const port = 3500

var main = null

mongo.connect('mongodb://127.0.0.1:4000', (err, result) => { // Load database to main
  main = result.db('main')
  main.collection('sessions').deleteMany({}) // Automatically delete all sessions if server restarts
  setInterval(() => {
    main.collection('sessions').find({}).toArray((err, find) => {
      if(!find) return
    
      for(session of find) {
        if(Date.now() - session.time > 30*60*1000) {
          main.collection('sessions').deleteOne(session)
        }
      }
    })
  }, 1000)
})


app.get('/', (req, res) => { // All server requests not authenticating

  //
  // Verify session id
  //
  main.collection('sessions').findOne({session: req.query.session}, (err, find) => {
    if(find) {
      if(Date.now() - find.time < 30*60*1000) {
        let result = {session: find.session}
        console.log(`Session authenticated: ${find.session}`)
        //
        // Execute primary request
        //
        if(req.query.test) {
          result.requestedData = `query received from client: ${req.query.test}`
        }

        // End response
        res.send(result)
      } else {
        main.collection('sessions').deleteOne({session: req.query.session})
        res.send(false)
      }
    } else {
      res.send(false)
    }
  })
})

app.get('/auth', (req, res) => { // For just authenticating
  let uname = req.query.uname
  let pword = crypto.createHash('sha256').update(req.query.pword).digest('hex')

  main.collection('auth').findOne({uname, pword}, (err, find) => { // Attempt to find auth entry with username and password
    if(find) {
      console.log(find._id.toString()) // If found, debug testing
      const now = Date.now()
      const session = crypto.createHash('sha256').update(find._id.toString() + now).digest('hex') // Create session id based off of mongo _id and current time
      main.collection('sessions').insertOne({time: now, session})
      res.send({session}) // Insert to database sessions and return to client
    } else {
      res.send(false) // Otherwise, return false
    }
  })
})

app.listen(port, () => console.log('Started')) // Listen on 3500