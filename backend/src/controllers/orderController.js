const { Order, Product } = require("../../models");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const { customerName, status, products } = req.body;

      const order = await Order.create({ customerName, status });

      if (products && products.length > 0) {
        for (const p of products) {
          await order.addProduct(p.productId, {
            through: { quantity: p.quantity },
          });
        }
      }

      const result = await Order.findByPk(order.id, {
        include: {
          model: Product,
          through: { attributes: ["quantity"] },
        },
      });
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create order" });
    }
  },

  getOrders: async (req, res) => {
    const orders = await Order.findAll({
      include: {
        model: Product,
        through: { attributes: ["quantity"] },
      },
    });
    res.json(orders);
  },

  getOrderById: async (req, res) => {
    const order = await Order.findByPk(req.params.id, {
      include: {
        model: Product,
        through: { attributes: ["quantity"] },
      },
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  },

  updateOrder: async (req, res) => {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    await order.update({ status });
    res.json(order);
  },

  deleteOrder: async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    await order.destroy();
    res.status(204).send();
  },
};
