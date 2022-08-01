const router   = require('express').Router();
const { access, AUTHENTICATED, UNAUTHENTICATED } = require('../middlewares/access');
const { User } = require('../db/models');
const bcrypt   = require('bcrypt');

function clientUser(data) {
  return {
    user: {
      id: data.id,
      email: data.email,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  };
}

router.route('/out')
  .get(access(AUTHENTICATED), async (req, res) => {
    req.session.destroy();
    res.clearCookie(process.env.SESSION_COOKIE);

    res.status(200).json({ message: 'Session destroyed!' });
  });

router.route('/in')
  .get(access(AUTHENTICATED), (req, res) => {
    if (req.session.userId && res.locals.user) {

      res.status(200).json(
        clientUser(res.locals.user)
      );

    } else {
      res.status(404).json({ message: 'Session not found!' });
    }
  })
  .post(access(UNAUTHENTICATED), async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.isExists(email);

      if(!user) {
        res.status(404).json({ message: 'User not found!' });
        return;
      }

      if(! await bcrypt.compare(password, user.password)){
        res.status(401).json({ message: 'Incorrect password!' });
        return;
      }

      req.session.userId = user.id;

      res.status(200).json(
        clientUser(user)
      );

    } catch(error){
      res.status(500).json(error);
    }
  });

router.route('/up')
  .post(access(UNAUTHENTICATED), async (req, res) => {
  try {
    const { email, username, password }  = req.body;

    if (!password[0] || password[0] !== password[1]) {
      res.status(401).json({ message: 'Incorrect password!' });
      return;
    }

    if(await User.isExists(email)){
      res.status(409).json({ message: 'User exists!' });
      return;
    }

    const hash = await bcrypt.hash(password[0], 2);
    const user = await User.create({ email, username, password:hash });
    await user.save();
    req.session.userId = user.id;

    res.status(200).json(
      clientUser(user)
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
