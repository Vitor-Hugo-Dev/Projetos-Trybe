module.exports = (err, req, res, _next) => {
  if (err.status) {
    console.log(err.message);
    return res.status(err.status).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
};