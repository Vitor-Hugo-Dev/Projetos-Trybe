const validator = require('validator');

module.exports = {
  validateToken: async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
  },
  validateName: (req, res, next) => {
    const { name } = req.body;
    if (!name) { 
      return res.status(400).json({ message: 'O campo "name" é obrigatório' }); 
    }

    if (name.length < 3) {
      return res
        .status(400)
        .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    next();
  },
  validateAge: (req, res, next) => {
    const { age } = req.body;
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }

    if (age < 18) {
      return res
        .status(400)
        .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }

    next();
  },
  validateTalk: {
    exists: (req, res, next) => {
      const { talk } = req.body;
      if (!talk || talk.rate === undefined || talk.watchedAt === undefined) {
        return res.status(400).json({
          message:
            'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
      }
      next();
    },
    watchedAt: (req, res, next) => {
      const { talk } = req.body;
      if (
        !validator.isDate(talk.watchedAt, {
          format: 'DD/MM/YYYY',
          delimiter: '/',
        })
      ) {
        return res.status(400).json({
          message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
      }
      next();
    },
    rate: (req, res, next) => {
      const { talk } = req.body;
      if (talk.rate <= 0 || talk.rate > 5) {
        return res.status(400).json({
          message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        });
      }
      next();
    },
  },
};
