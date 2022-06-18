const socketIo = require('socket.io');
const http = require('./app');

const port = process.env.PORT || 3001;
const { updateSaleStatusServices } = require('../services/saleServices');

const io = socketIo(http, {
  cors: {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT'],
  },
  }); 

io.on('connection', (socket) => {
  socket.on('updateStatus', async (body) => {
    // socket.join(id);
    const updatedSale = await updateSaleStatusServices(body.id, body.status);

    io.emit('updateStatus Response', updatedSale);
    console.log(body);
  });
});

http.listen(port);
console.log(`Api rodando na porta ${port}`);
