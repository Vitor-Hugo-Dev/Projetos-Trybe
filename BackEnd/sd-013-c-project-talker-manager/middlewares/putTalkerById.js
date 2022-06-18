const { getTalkers, setTalker } = require('../utils');

module.exports = async (req, res, _next) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await getTalkers();
  
  const index = talkers.findIndex((i) => i.id === Number(id));
  const talkerEdited = {
    id: Number(id), name, age, talk,
  };
  talkers[index] = { ...talkerEdited };
  await setTalker(talkers);
  
  res.status(200).json(talkers[index]);
};