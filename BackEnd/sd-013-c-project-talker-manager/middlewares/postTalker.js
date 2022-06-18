const { getTalkers, setTalker } = require('../utils');

module.exports = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await getTalkers();
  const newTalker = { id: talkers.length + 1, name, age, talk };
  talkers.push(newTalker);

  await setTalker(talkers);
  return res.status(201).json(newTalker);
};