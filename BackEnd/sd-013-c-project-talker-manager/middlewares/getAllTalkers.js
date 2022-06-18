const { getTalkers } = require('../utils');

module.exports = async (_req, res) => {
  const talkers = await getTalkers();
  
  return res.status(200).json(talkers);
};