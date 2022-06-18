db.trips.aggregate([
  {
    $addFields: {
      tripTime: {
        $divide: [
          {
            $subtract: ["$stopTime", "$startTime"],
          },
          60000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      avgTripTime: {
        $avg: "$tripTime",
      },
    },
  },
  { $sort: { avgTripTime: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: false,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$avgTripTime" },
    },
  },
]);
