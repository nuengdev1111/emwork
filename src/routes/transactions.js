const express = require('express');
const router = express.Router();
const { 
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByMonth,
  getMonthlyReport
} = require('../controllers/transactionController');

router.get('/', getAllTransactions);                      
router.post('/', createTransaction);                      
router.put('/:id', updateTransaction);                    
router.delete('/:id', deleteTransaction);                 
router.get('/:year/:month', getTransactionsByMonth);      
router.get('/:year/:month/report', getMonthlyReport);   

module.exports = router;
