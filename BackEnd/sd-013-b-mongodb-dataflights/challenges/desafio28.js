const nomeEmpresa = "LATAM AIRLINES BRASIL";
const voosDomesticos = db.voos.find({
  $and: [{ natureza: "Doméstica" },
  { "empresa.nome": nomeEmpresa }] });

db.resumoVoos.insertOne({
  empresa: nomeEmpresa,
  totalVoosDomesticos: voosDomesticos.count(),
});

db.resumoVoos.find({}, { _id: 0, empresa: 1, totalVoosDomesticos: 1 });