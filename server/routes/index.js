const route = require('express').Router();
const cors = require('cors');
// const app = express();

route.use(cors({
  origin: 'http://localhost:3001', // Menyesuaikan origin yang diizinkan
  methods: 'GET,PUT,POST,DELETE', // Metode yang diizinkan
  allowedHeaders: 'Content-Type, Authorization' // Header yang diizinkan
}));


route.get('/', (req,res) => {
    res.json({
        message: "Home page"
    })
})

const incomeRoutes = require('./income');
const expenseRoutes = require('./expense');

route.use('/incomes', incomeRoutes);
route.use('/expenses', expenseRoutes);


module.exports = route;