const Product = require("../models/product.model");
const products = [
  new Product(1, "Teclado mecânico", 249.9, 12),
  new Product(2, "Mouse sem fio", 89.9, 20),
];
let nextId = 3;
function listProducts() {
  return products.map((product) => ({ ...product }));
}
function findProductById(id) {
  return products.find((product) => product.id === id) ?? null;
}
function createProduct({ name, price, stock }) {
  const product = new Product(nextId++, name.trim(), price, stock);
  products.push(product);
  return { ...product };
}
function deleteProduct(id) {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return false;
  }
  products.splice(index, 1);
  return true;
}

module.exports = {
  listProducts,
  findProductById,
  createProduct,
  deleteProduct,
};
