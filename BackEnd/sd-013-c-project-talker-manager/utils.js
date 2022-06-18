const fs = require('fs').promises;
const crypto = require('crypto');

const generateToken = () => crypto.randomBytes(8).toString('hex');

const getTalkers = () => {
  const talkers = fs.readFile('./talker.json', 'utf8')
    .then((file) => JSON.parse(file));
  
  return talkers;
};

const setTalker = (newTalkers) => {
  const newFile = fs.writeFile('talker.json', JSON.stringify(newTalkers));
  return newFile;
};

module.exports = { getTalkers, setTalker, generateToken };