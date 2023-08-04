const express = require('express');
const router = express.Router();
const { Item, Option } = require('../models');

// 상품 추가 API
router.post('/item', async (req, res) => {
  const { name, price, type, optionId } = req.body;
  try {
    if (!name || !price) {
      return res.status(400).json({ message: '이름과 가격을 입력해주십시오.' });
    }
    if (!['coffee', 'juice', 'food'].includes(type)) {
      return res.status(400).json({ message: '알맞은 타입을 지정해주십시오.' });
    }
    const option = await Option.fidnOne({ where: { optionId } });
    if (!option) {
      res.status(400).json({ message: '존재하지 않는 옵션입니다.' });
    }

    const createItem = await Item.create({
      name,
      price,
      type,
      optionId,
    });
    res.status(200).json({ message: '상품이 추가되었습니다.', createItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '오류가 발생하였습니다.' });
  }
});

// 상품 전체 조회 API
router.get('/item', async (req, res) => {
  try {
    const items = await Item.findAll({
      oreder: [['createdAt', 'DESC']],
    });

    res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ message: '오류가 발생하였습니다.' });
  }
});

// 상품 타입별 조회 API
router.get('/item/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const items = await Item.findAll({ where: { type } });

    res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ errorMessage: '오류가 발생하였습니다.' });
  }
});

// 상품 수정 API
router.put('/item/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const { name, price, type, optionId } = req.body;
  try {
    const item = await Item.findOne({ where: { itemId } });
    if (!item) {
      res.status(404).json({ message: '상품이 존재하지 않습니다.' });
    }
    if (!name || !price || !type) {
      res.status(400).json({ message: '이름과 가격, 타입을 입력해주세요.' });
    }
    if (!['coffee', 'juice', 'food'].includes(type)) {
      return res.status(400).json({ message: '알맞은 타입을 지정해주십시오.' });
    }
    const option = await Option.fidnOne({ where: { optionId } });
    if (!option) {
      res.status(400).json({ message: '존재하지 않는 옵션입니다.' });
    }
    await Item.update({ name, price, type, optionId }, { where: { itemId } });
    res.status(200).json({ message: '상품이 수정되었습니다.' });
  } catch (error) {
    return res.status(500).json({ errorMessage: '오류가 발생하였습니다.' });
  }
});

// 상품 삭제 1차 API
router.delete('/item/:itemId', async (req, res) => {
  const { itemId } = req.params;
  try {
    const item = await Item.findOne({ where: { itemId } });
    if (!item) {
      res.status(404).json({ message: '상품이 존재하지 않습니다.' });
    }

    if (item.amount > 0) {
      res.status(400).json({ message: '현재 상품 수량이 남아있습니다. 삭제하시겠습니까?', waitForConfirmation: true });
    } else {
      await item.destroy({ where: { itemId } });
      res.status(200).json({ message: '상품이 삭제되었습니다.' });
    }
  } catch (error) {
    return res.status(500).json({ errorMessage: '오류가 발생하였습니다.' });
  }
});

// 상품 삭제 2차 API
router.delete('/item/:itemId/confirmdelete', async (req, res) => {
  const { itemId } = req.params;
  const { confirm } = req.body;
  try {
    const item = await Item.findOne({ where: { itemId } });
    if (!item) {
      res.status(404).json({ message: '상품이 존재하지 않습니다.' });
    }

    if (confirm === 'yes') {
      await item.destroy({ where: { itemId } });
      res.status(200).json({ message: '상품이 삭제되었습니다.' });
    } else {
      res.status(400).json({ message: '상품을 삭제하지 않습니다.' });
    }
  } catch (error) {
    return res.status(500).json({ errorMessage: '오류가 발생하였습니다.' });
  }
});
module.exports = router;
