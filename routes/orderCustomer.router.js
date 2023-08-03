const express = require('express');
const router = express.Router();
const { Item, ItemOrderCustomer, OrderCustomer, sequelize } = require('../models');

// 주문 생성
router.post('/orderCustomers', async (req, res) => {
  const { itemId, amount } = req.body;
  let price = 0;
  const item = await Item.findOne({ where: { itemId } });
  price += amount * item.price;

  try {
    const orderCustomer = await OrderCustomer.create({});
    await ItemOrderCustomer.create({ itemId, orderCustomerId: orderCustomer.orderCustomerId, amount, optionId: item.optionId, price });
    res.status(200).json({ message: '상품을 주문하였습니다.', orrderNumber: orderCustomer.orderCustomerId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '오류가 발생하였습니다.' });
  }
});

// 주문 조회
router.get('/orderCustomers/:orderCustomerId', async (req, res) => {
  const { orderCustomerId } = req.params;
  const order = await OrderCustomer.findOne({
    where: { orderCustomerId },
    include: [
      {
        model: ItemOrderCustomer,
        attributes: ['itemId', 'amount', 'optionId', 'price'],
      },
    ],
  });
  res.status(200).json({ order });
});

// 주문 상태 수정
router.put('/orderCustomers/:orderCustomerId', async (req, res) => {
  const { orderCustomerId } = req.params;
  const orderCustomer = await OrderCustomer.findOne({ where: { orderCustomerId } });
  const itemOrderCustomer = await ItemOrderCustomer.findOne({ where: { orderCustomerId } });
  const itemId = itemOrderCustomer.itemId;
  const item = await Item.findOne({ where: { itemId } });

  const presState = orderCustomer.state;
  const ts = await sequelize.transaction();
  try {
    if (presState === true) {
      res.status(400).json({ message: '이미 완료된 주문입니다.' });
    } else if (item.amount < itemOrderCustomer.amount) {
      res.status(400).json({ message: '재고 수량이 부족합니다.' });
    } else {
      item.amount -= itemOrderCustomer.amount;
      await item.save({ transaction: ts });

      // await Item.update({ amount: item.amount }, { where: { itemId } }, { transaction: ts });
      await OrderCustomer.update({ state: true }, { where: { orderCustomerId } }, { transaction: ts });
    }
    await ts.commit();
    res.status(200).json({ message: '주문이 완료되었습니다.' });
  } catch (error) {
    await ts.rollback();
    console.error(error);
    res.status(500).json({ message: '오류가 발생하였습니다.' });
  }
});

// 주문 삭제
router.delete('/orderCustomers/:orderCustomerId', async (req, res) => {
  const { orderCustomerId } = req.params;
  const orderCustomer = await OrderCustomer.findOne({ where: { orderCustomerId } });
  // const itemOrderCustomer = await ItemOrderCustomer.findOne({ where: { orderCustomerId } });
  const presState = orderCustomer.state;
  const ts = await sequelize.transaction();
  try {
    if (presState === true) {
      res.status(400).json({ message: '이미 완료된 주문은 취소할수 없습니다.' });
    } else {
      await OrderCustomer.destroy({ where: { orderCustomerId } }, { transaction: ts });
      await ItemOrderCustomer.destroy({ where: { orderCustomerId } }, { transaction: ts });
    }
    await ts.commit();
    res.status(200).json({ message: '주문이 취소되었습니다.' });
  } catch (error) {
    await ts.rollback();
    console.error(error);
    res.status(500).json({ message: '오류가 발생하였습니다.' });
  }
});

module.exports = router;
