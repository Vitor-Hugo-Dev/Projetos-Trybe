const { getTalkers } = require('../utils');

module.exports = async (req, res, _next) => {
  const { name } = req.query;
  const talkers = await getTalkers();

  const searchTalkers = talkers.filter((current) => current.name.includes(name));

  if (!name || name === '') {
    return res.status(200).json(talkers);
  }

  // console.log(searchTalkers);

  res.status(200).json(searchTalkers);
};
