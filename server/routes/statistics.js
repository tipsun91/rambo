const router = require('express').Router();

const { access, AUTHENTICATED } = require('../middlewares/access');

const gameData = (data) => ({
  userId: data.userId,
  countEnemies: data.countEnemies,
  countDamage: data.countDamage,
  countWaves: data.countWaves,
  timeGame: Math.round(data.timeGame),
});

const { sequelize, User, Game } = require('../db/models');

router.route('/:id').get(async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await User.findByPk(id);
    if (!user || !user.id) {
      res.status(404).json({ message: `User with id=${id} not found!` });
      return;
    }

    const statistics = await Game.findAll({
      where: {
        userId: id,
      },
      raw: true,
      group: ['User.id'],
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('Game.id')), 'Game.countGames'],
        [
          sequelize.fn('SUM', sequelize.col('countEnemies')),
          'Game.countEnemies',
        ],
        [sequelize.fn('SUM', sequelize.col('countMoney')), 'Game.countMoney'],
        [sequelize.fn('SUM', sequelize.col('countDamage')), 'Game.countDamage'],
        [sequelize.fn('SUM', sequelize.col('timeGame')), 'Game.timeGame'],
        [sequelize.fn('SUM', sequelize.col('countWaves')), 'Game.countWaves'],
      ],
      include: {
        raw: true,
        model: User,
        attributes: ['id', 'name'],
      },
    });

    res.status(200).json({ statistics });
  } catch (e) {
    res.status(502).json({ message: e.message });
  }
});

router
  .route('/')
  .get(async (req, res) => {
    try {
      const statistics = await Game.findAll({
        raw: true,
        group: ['User.id'],
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('Game.id')), 'Game.countGames'],
          [
            sequelize.fn('SUM', sequelize.col('countEnemies')),
            'Game.countEnemies',
          ],
          [sequelize.fn('SUM', sequelize.col('countMoney')), 'Game.countMoney'],
          [
            sequelize.fn('SUM', sequelize.col('countDamage')),
            'Game.countDamage',
          ],
          [sequelize.fn('SUM', sequelize.col('timeGame')), 'Game.timeGame'],
          [sequelize.fn('SUM', sequelize.col('countWaves')), 'Game.countWaves'],
        ],
        include: {
          raw: true,
          model: User,
          attributes: ['id', 'name'],
        },
      });

      res.status(200).json({ statistics });
    } catch (e) {
      res.status(502).json({ message: e.message });
    }
  })
  .post(access(AUTHENTICATED), async (req, res) => {
    try {
      console.log(req.body);
      const gameResult = await Game.create(
        gameData({
          userId: res.locals.user.id,
          ...req.body,
        })
      );
      await gameResult.save();
      if (gameResult.id) {
        console.log('====> 2');
        res.status(201).json({ message: 'Created!' });
      } else {
        console.log('====> 3');
        res.status(501).json({ message: 'Can not create!' });
      }
    } catch (e) {
      console.log('====> 4');
      res.status(502).json({ message: e.message });
    }
  })
  .patch(access(AUTHENTICATED), async (req, res) => {
    try {
      if (res.locals.user.id !== req.body.userId) {
        res.status(403).json({ message: 'Your are not owner!' });
        return;
      }
      let gameResult = await Game.findByPk(req.body.id);
      if (!gameResult) {
        res.status(404).json({ message: 'Not found!' });
        return;
      }
      const { updatedAt } = gameResult;
      gameResult = gameData(req.body);
      await gameResult.save();

      if (gameResult.updatedAt !== updatedAt) {
        res.status(201).json({ message: 'Saved!' });
      } else {
        res.status(501).json({ message: 'Not saved!' });
      }
    } catch (e) {
      res.status(502).json({ message: e.message });
    }
  })
  .delete(access(AUTHENTICATED), async (req, res) => {
    try {
      if (res.locals.user.id !== req.body.userId) {
        res.status(403).json({ message: 'Your are not owner!' });
        return;
      }
      const gameResult = await Game.findByPk(req.body.id);
      if (!gameResult) {
        res.status(404).json({ message: 'Not found!' });
        return;
      }
      const { id } = gameResult;
      gameResult.destroy();
      if (!gameResult || gameResult.id !== id) {
        res.status(200).json({ message: 'Record deleted!' });
      } else {
        res.status(501).json({ message: 'Record not deleted!' });
      }
    } catch (e) {
      res.status(502).json({ message: e.message });
    }
  });

module.exports = router;
