const express = require('express');
const bcrypt = require('bcryptjs')
const UserDB = require('./user-model.js');
const restrict = require('../middleware/restrict')
const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    const bcryptHash = bcrypt.hashSync(password, 10);

    const user = {
      username,
      password: bcryptHash,
    };
  
    UserDB.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    UserDB.findBy({ username })
      .first()
      .then(user => {
        
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.loggedInUser = user
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
});

router.post('/', (req, res) => {
    let { username, password } = req.body;

    UserDB.findBy({username})
    .first()
    .then(user => { 
      if (user && bcrypt.compareSync(password, user.password)) {
        UserDB.getUsers()
          .then(data => {
            res.status(200).json(data)
          })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

module.exports = router;