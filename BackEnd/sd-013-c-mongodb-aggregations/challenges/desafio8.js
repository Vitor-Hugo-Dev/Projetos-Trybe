// app
db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      pipeline: [
        {
          $match: {
            airplane: { $in: ["747", "380"] },
          },
        },
      ],
      as: "alliance_routes",
    },
  },
  { $unwind: "$alliance_routes" },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
