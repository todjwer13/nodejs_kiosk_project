const express = require('express');
const router = express.Router();
const { Item, OrderItem, sequelize } = require('../models');

// 상품 발주 API
router.post('/orderItem', async (req, res) => {
  try {
    const { itemId, amount } = req.body;
    const item = await Item.findOne({ where: { itemId } });

    // if (!['ORDERED', 'PENDING', 'COMPLETED', 'CANCELED'].includes(state)) {
    //   return res.status(400).json({ message: '알맞은 타입을 지정해주십시오.' });
    // }

    console.log(item);

    const orderItem = await OrderItem.create({
      itemId,
      amount,
    });
    res.status(200).json({ message: '상품을 발주하였습니다.', orderItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '오류가 발생하였습니다.' });
  }
});

// 상품 발주 확인 API
router.get('/orderItem/:orderItemId', async (req, res) => {
  try {
    const { orderItemId } = req.params;
    const orderItem = await OrderItem.findOne({ where: { orderItemId } });
    console.log(orderItem);
    if (!orderItem) {
      res.status(404).json({ message: '상품 발주가 존재하지 않습니다.' });
    }
    res.status(200).json({ message: '발주한 상품입니다.', orderItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '오류가 발생하였습니다.' });
  }
});

// 상품 발주 상태 수정 API(트랜잭션)
router.put('/orderItem/:orderItemId', async (req, res) => {
  const { orderItemId } = req.params;
  const orderItem = await OrderItem.findOne({ where: { orderItemId } });
  const itemId = orderItem.itemId;
  const item = await Item.findOne({ where: { itemId } });
  const presState = orderItem.state;
  console.log(presState);
  const ts = await sequelize.transaction();
  try {
    console.log(orderItem);
    console.log(item);

    if (presState === 'ORDERED') {
      await OrderItem.update({ state: 'PENDING' }, { where: { orderItemId } });
    } else if (presState === 'PENDING') {
      // 트랜잭션
      item.amount += orderItem.amount;
      await item.save({ transaction: ts });

      await OrderItem.update({ state: 'COMPLETED' }, { where: { orderItemId } }, { transaction: ts });
      // await Item.update({ amount: item.amount }, { where: { itemId } }, { transaction: ts });
    }
    await ts.commit();
    res.status(200).json({ message: '발주 상태를 수정하였습니다.' });
  } catch (error) {
    console.error(error);
    await ts.rollback();
    res.status(500).json({ message: '오류가 발생하였습니다.' });
  }
});

// 상품 발주 취소 API
// put으로 변경 고려중 cancel
router.delete('/orderItem/:orderItemId', async (req, res) => {
  const { orderItemId } = req.params;
  const orderItem = await OrderItem.findOne({ where: { orderItemId } });
  const presState = orderItem.state;
  const itemId = orderItem.itemId;
  const item = await Item.findOne({ where: { itemId } });
  const ts = await sequelize.transaction();
  try {
    if (presState === 'ORDERED' || presState === 'PENDING') {
      await OrderItem.destroy({ where: { orderItemId } });
      res.status(200).json({ message: '발주를 취소하였습니다.' });
    } else if (presState === 'COMPLETED') {
      item.amount -= orderItem.amount;
      await item.save({ transaction: ts });

      await OrderItem.destroy({ where: { orderItemId } }, { transaction: ts });
      // await Item.update({ amount: item.amount }, { where: { itemId } }, { transaction: ts });
      await ts.commit();
      res.status(200).json({ message: '발주를 취소하였습니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '오류가 발생하였습니다.' });
  }
});

module.exports = router;
