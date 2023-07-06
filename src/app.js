require('dotenv').config();
const createServer = require('./Infrastructures/http/CreateServer');

const app = createServer();
app.listen(process.env.PORT, () => {
  console.log(`Server Berjalan di Port : ${process.env.PORT}`);
});

module.exports = app;
