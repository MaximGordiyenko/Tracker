const express = require('express');
const router = express.Router();
const User = require('../../models/users');

router.post('/login', (req, res, next) => {
  const {username, pass} = req.body;
  User.authenticate(username, pass, function (error, user) {
    if (error || !user) {
      const err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err);
    } else {
      return res.redirect('/profile');
    }
  });
});

module.exports = router;