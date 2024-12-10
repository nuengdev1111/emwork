const transactionModel = require('../models/transactionModel');

module.exports = {
  getAllTransactions: async (req, res) => {
    try {
      const data = await transactionModel.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  },
  
  createTransaction: async (req, res) => {
    try {
      const { type, title, amount, transaction_date } = req.body;
      const insertId = await transactionModel.create({ type, title, amount, transaction_date });
      res.status(201).json({ id: insertId });
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  },
  
  updateTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, title, amount, transaction_date } = req.body;
      await transactionModel.update(id, { type, title, amount, transaction_date });
      res.json({message: "Updated successfully"});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  },
  
  deleteTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      await transactionModel.delete(id);
      res.json({message: "Deleted successfully"});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  },
  
  getTransactionsByMonth: async (req, res) => {
    try {
      const { year, month } = req.params;
      const data = await transactionModel.getByMonth(year, month);
      res.json(data);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  },
  
  getMonthlyReport: async (req, res) => {
    // year, month รับมาจาก params
    try {
      const { year, month } = req.params;
      const transactions = await transactionModel.getByMonth(year, month);
      
      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      const balance = totalIncome - totalExpense;

      res.json({
        transactions,
        totalIncome,
        totalExpense,
        balance
      });
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }
}
