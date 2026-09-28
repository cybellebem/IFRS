const service = require("../services/products.service");
function parseId(rawId) {
  const id = Number(rawId);
  return Number.isInteger(id) && id > 0 ? id : null;
}
function listProducts(req, res) {
  return res.status(200).json(service.listProducts());
}
function getProductById(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({
      message: "O identificador deve ser um inteiro positivo.",
    });
  }
  const product = service.findProductById(id);
  if (!product) {
    return res.status(404).json({
      message: "Produto não encontrado.",
    });
  }
  return res.status(200).json(product);
}
function createProduct(req, res) {
  const { name, price, stock } = req.body ?? {};
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      message: "O nome é obrigatório e não pode estar vazio.",
    });
  }
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
    return res.status(400).json({
      message: "O preço deve ser um número maior que zero.",
    });
  }
  if (!Number.isInteger(stock) || stock < 0) {
    return res.status(400).json({
      message: "O estoque deve ser um inteiro não negativo.",
    });
  }
  const product = service.createProduct({
    name,
    price,
    stock,
  });
  return res.location(`/api/products/${product.id}`).status(201).json(product);
}
function deleteProduct(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({
      message: "O identificador deve ser um inteiro positivo.",
    });
  }
  if (!service.deleteProduct(id)) {
    return res.status(404).json({
      message: "Produto não encontrado.",
    });
  }
  return res.status(204).send();
}
module.exports = {
  listProducts,
  getProductById,
  createProduct,
  deleteProduct,
};
