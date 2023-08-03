const express = require('express');
const router = express.Router();
const { Option } = require('../models');

router.post('/options', async (req, res) => {
  const { extraPrice, shotPrice, hot } = req.body;
  try {
    if (!extraPrice || !shotPrice || !hot) {
      res.status(400).json({ message: '사이즈, 샷, 온도를 적어주십시오' });
    }
    const optionDate = await Option.create({ extraPrice, shotPrice, hot });
    res.status(200).json({ optionDate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '오류가 발생했습니다.' });
  }
});

router.get('/options/:optionId', async (req, res) => {
  const { optionId } = req.params;
  try {
    const optionDate = await Option.findOne({ where: { optionId } });
    res.status(200).json({ optionDate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '오류가 발생했습니다.' });
  }
});

router.delete('/options/:optionId', async (req, res) => {
  const { optionId } = req.params;
  try {
    await Option.destroy({ where: { optionId } });
    res.status(200).json({ message: '옵션을 삭제하였습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '오류가 발생했습니다.' });
  }
});
module.exports = router;
