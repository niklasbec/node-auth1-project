const express = require('express');
const UserRouter = require('./router-model/user-router.js');
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session);
const server = express();

server.use(express.json());
server.use('/api/users', UserRouter);
server.use(session({
    name: 'session_ID',          
    secret: 'keep it secret',
    cookie: {
      maxAge: 1000 * 60 * 120,
      secure: false,         
      httpOnly: false,       
    },
    resave: false,
    saveUninitialized: false, // good GDPR
    store: new KnexSessionStore({
      knex: require('./data/dbConfig.js'), 
      tablename: 'sessions',
      sidfieldname: 'sid',
      createtable: true, 
      clearInterval: 1000 * 60 * 60,
    }),
  }));

module.exports = server;
