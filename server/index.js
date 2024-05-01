const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const Model = require('./models/model')

const app = express()
app.use(express.json())
app.use(cors())

mongoose
  .connect(
    "mongodb://localhost:27017/mern-auth"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(8086, () => {
      console.log("Server Status -- Running Port: 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.post('/register', (req, res) => {
    Model.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    Model.findOne({email: email})
    .then(user => {
        console.log(user)
        if(user) {
            if(user.password === password) {
                res.json({message: "Success"})
            } else {
                res.json({message: "Incorrect Password"})
            }

        } else {
            res.json({message: "No records found"})
        }
    })
})



