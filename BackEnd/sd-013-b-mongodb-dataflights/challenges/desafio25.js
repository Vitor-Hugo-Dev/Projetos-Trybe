db.voos.deleteMany(
  {
    $and: [
      {
        litrosCombustivel: { $exists: true, $lt: 400 },
      },
      { "empresa.nome": "AZUL" },
    ],
  },
);
