db.produtos.updateMany(
  {
    $and: [{ ingredientes: { $nin: ["ketchup"] } }, { nome: { $ne: "McChicken" } }],
  },
  {
    $push: { ingredientes: "ketchup" },
  },
);

db.produtos.find({},
  {
    _id: 0,
    nome: 1,
    ingredientes: 1,
  });