const userRouter = require('express').Router();
const { User } = require('../db/models');
const bcrypt = require('bcrypt');

userRouter.route('/').put(async (req, res) => {
  const { id } = res.locals.user;
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 2);
    const user = await User.findOne({ where: { id } });
    user.name = name;
    user.email = email;
    user.password = hash;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = userRouter;
