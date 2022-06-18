module.exports = (err, req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ err: {
      code: err.code,
      message: err.message,
    } });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
};