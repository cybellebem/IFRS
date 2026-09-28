# Resultados dos testes — Seção 4.5

| #   | Cenário                             | Requisição               | Status esperado | Status obtido | Corpo retornado                                                        | Resultado |
| --- | ----------------------------------- | ------------------------ | --------------: | ------------: | ---------------------------------------------------------------------- | --------- |
| 1   | Listar os produtos                  | `GET /api/products`      |             200 |           200 | Array contendo os produtos cadastrados.                                | OK        |
| 2   | Consultar o produto 1               | `GET /api/products/1`    |             200 |           200 | `{ "id": 1, "name": "Teclado mecânico", "price": 249.9, "stock": 12 }` | OK        |
| 3   | Consultar o produto 999             | `GET /api/products/999`  |             404 |           404 | `{ "message": "Produto não encontrado." }`                             | OK        |
| 4   | Consultar um identificador inválido | `GET /api/products/abc`  |             400 |           400 | `{ "message": "O identificador deve ser um inteiro positivo." }`       | OK        |
| 5   | Cadastrar um produto válido         | `POST /api/products`     |             201 |           201 | `{ "id": 3, "name": "Headset USB", "price": 159.9, "stock": 5 }`       | OK        |
| 6   | Cadastrar com preço negativo        | `POST /api/products`     |             400 |           400 | `{ "message": "O preço deve ser um número maior que zero." }`          | OK        |
| 7   | Cadastrar com estoque fracionário   | `POST /api/products`     |             400 |           400 | `{ "message": "O estoque deve ser um inteiro não negativo." }`         | OK        |
| 8   | Excluir um produto existente        | `DELETE /api/products/1` |             204 |           204 | Sem corpo                                                              | OK        |
| 9   | Consultar o produto excluído        | `GET /api/products/1`    |             404 |           404 | `{ "message": "Produto não encontrado." }`                             | OK        |
