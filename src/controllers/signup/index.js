const express = require('express');
const router = express.Router();
import User from '../../models/users';

router.post('/signup',(req, res, next) => {
  const {username, email, pass, repass, role} = req.body;
  if (!role) {
    return res.status(400).send("role is not specified");
  }
  if (pass !== repass) {
    return res.status(400).send("passwords dont match");
  }

  if (username && email && pass && repass && role) {
    const userData = {
      email,
      username,
      role,
      password: pass,
    };

    User.create(userData, function(error, user) {
      if (error) {
        return res.status(400).send("mongoDB cannot create such user");
      } else {
        req.session.userId = user._id;

        return res.redirect('/profile'); // TODO: should be implemented
      }
    });

  }

});

export { router as SignupController };
