// server/routes/routes.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Expense = require('../../models/Expense');

router.get('/', function(req, res) {
    res.render('index')
});

router.route('/insert')
.post(function(req, res) {
    var expense = new Expense();
    expense.description = req.body.desc;
    expense.amount = req.body.amount;
    expense.month = req.body.month;
    expense.year = req.body.year;

    expense.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.send('Expense successfully added!');
    });
});

router.route('/update')
.post(function(req, res) {
    const doc = {
        description : req.body.description,
        amount : req.body.amount,
        month : req.body.month,
        year : req.body.year
    };
    console.log(docs);
    Expense.update({ _id : req.body._id}, doc, function(err, result) {
        if (err) {
            res.send(err);
        }
        res.send('Expense successfully updated!');
    });
});

router.get('getAll', function(req, res) {
    var monthRec = re.query.month;
    var yearRec = req.query.year;
    if (monthRec && monthRec != 'All') {
        Expense.find({ year : yearRec}, function(err, expenses) {
            if (err) {
                res.send(err);
            }
            res.json(expenses)
        });
    }
});

module.exports = router;