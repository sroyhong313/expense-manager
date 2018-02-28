// models/Expense.js

var mongoose = require('mongoose');
var schema = mongoose.Schema();

var expenseSchema = new Schema({
    description: String,
    amount : Number,
    month : String,
    year : Number
});

module.exports = mongoose.Model('Expense', expenseSchema);