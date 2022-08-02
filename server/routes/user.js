const userRouter = require('express').Router();
const { User } = require('../db/models');
const bcrypt = require('bcrypt');

userRouter.route('/').put(async (req, res) => {
  const { id } = res.locals.user;
  const { name, email, password } = req.body;
  try {
    const user = await User.find({ where: { id } });
    const hash = await bcrypt.hash(password, 2);
    user.name = name;
    user.email = email;
    user.password = hash;
    user.save();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = userRouter;
