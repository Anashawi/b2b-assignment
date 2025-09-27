const { Product } = require("../../models");

exports.list = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;
  const { rows, count } = await Product.findAndCountAll({
    limit: +limit,
    offset: +offset,
    order: [["createdAt", "DESC"]],
  });
  res.json({ items: rows, total: count, page: +page });
};

exports.get = async (req, res) => {
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message: "Not found" });
  res.json(p);
};

exports.create = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const p = await Product.create({ name, description, price, stock });
  res.status(201).json(p);
};

exports.update = async (req, res) => {
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message: "Not found" });
  await p.update(req.body);
  res.json(p);
};

exports.remove = async (req, res) => {
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message: "Not found" });
  await p.destroy();
  res.status(204).end();
};
