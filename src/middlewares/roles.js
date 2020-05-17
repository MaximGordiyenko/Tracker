import User from '../models/users';


const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if ('admin' === user.role) {
      return next();
    } else if (user === null) {
      console.log(`unauthorized`);
      return res.redirect('/');
    } else {
      console.log(`wrong role for this route, ADMIN required, but ${user} present`);

      return res.redirect('/profile');
    }
  } catch (err) {
    console.log('error');

    return res.status(401);
  }
};

const isDriver = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if ('driver' === user.role || 'admin' === user.role) {
      return next();
    } else if (user === null) {
      console.log(`unauthorized`);

      return res.redirect('/');
    } else {
      console.log(`wrong role for this route, DRIVER required, but ${user} present`);

      return res.redirect('/profile');
    }
  } catch (err) {
    console.log('error');

    return res.status(401);
  }
};

const isCustomer = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if ('customer' === user.role || 'admin' === user.role) {
      return next();
    } else if (user === null) {
      console.log(`unauthorized`);

      return res.redirect('/');
    } else {
      console.log(`wrong role for this route, CUSTOMER required, but ${user} present`);

      return res.redirect('/profile');
    }
  } catch (err) {
    console.log('error');

    return res.status(401);
  }
};

export {isCustomer, isAdmin, isDriver};
