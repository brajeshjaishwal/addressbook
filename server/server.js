const express = require('express')
const cors = require('cors')
const favicon = require('serve-favicon')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgon = require('morgan')
const auth = require('./services/auth')
const contact = require('./services/contact')
const { PORT } = require('./config/config').Initialize()

let app = express()

require('./db/index').Connect()

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }

app.use(cors())

app.use(helmet())

app.use(favicon('favicon.ico'));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))

app.use(morgon("dev"))

app.use((req, res, next) => auth.authenticate(req, res, next))

app.get('/welcome', (req, res) => auth.welcome(req, res))

app.post('/users/register', (req, res) => auth.register(req, res))

app.post('/users/login', async (req, res) => auth.login(req, res))

app.post('/contacts/add', async(req, res) => contact.createContact(req, res))

app.post('/contacts/edit/:contactid', async(req, res) => contact.updateContact(req, res))

app.post('/contacts/remove/:contactid', async(req, res) => contact.removeContact(req, res))

app.post('/contacts/activate/:contactid', async(req, res) => contact.createContact(req, res))

app.get('/contacts/fetch/:contactid', async(req, res) => contact.createContact(req, res))

app.get('/contacts/group/fetch', async(req, res) => contact.getContactList(req, res))

app.get('/contacts/group/fetch/:group', async(req, res) => contact.getContactList(req, res))

app.get('/contacts/group/activate/:group', async(req, res) => contact.getContactList(req, res))

app.listen(PORT, () => console.log(`server is running on ${PORT}`))