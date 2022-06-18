db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: new Date("2016-03-10"), $lt: new Date("2016-03-11") },
    },
  },
  {
    $project: {
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
      _id: null,
      avgTripTime: {
        $avg: "$tripTime",
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$avgTripTime" },
    },
  },
]);
