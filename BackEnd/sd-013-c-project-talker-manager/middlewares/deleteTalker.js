const { getTalkers, setTalker } = require('../utils');

module.exports = async (req, res, _next) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  // const currentTalker = talkers.find((current) => current.id === Number(id));

  const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
  await setTalker(newTalkers);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};