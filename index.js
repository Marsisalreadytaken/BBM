// setting up server
var express = require('express');
var app     = express();
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);
//var superagent = require('superagent');

var cors    = require('cors');
app.use(cors());

// setup directory used to serve static files
app.use(express.static('public'));

// setup data store
// YOUR CODE

/* required data store structure
db.defaults(
{ 
    accounts:[
        {name        : '',
         email       : '',
         balance     : 0.0,
         password    : '',
         transactions: []}
    ] 
}).write();*/

// Creating a new account, error message if account already exists!
app.get('/account/create/:name/:email/:password', function (req, res) {
    var exist_acccount= db.get('accounts').find({email:req.params.email}).value();
    if (exist_acccount!=null){
        console.log('This account already exists.');
        res.send('This account already exists.');
        return;
    }
    else{
        var create_new_account = {
            "name" : req.params.name,
            "email" : req.params.email,
            "password" : req.params.password,
            "balance": 0.0,
            "transactions":[]
    }
    db.get('accounts').push(create_new_account).write();
        console.log('Welcome ' + create_new_account.name + ', your account has been created!');
        res.send('Welcome ' + create_new_account.name + ', your account has been created!');        
    }
            
});

app.get('/account/login/:email/:password', function (req, res) {
    var email = req.params.email;
    var password = req.params.password; 
    var current_acc = db.get('accounts').find({email}).value();
    
    if (current_acc == null){
        console.log('Account with this email address does not exist!');
        res.send('Account with this email address does not exist!');
    } else if (current_acc!=null && current_acc.password!= password) {
        console.log('The password you have entered is not valid!');
        res.send('This password you have entered is not valid!');
    } else {
	    console.log('Welcome back ' + current_acc.name);
        res.send('Welcome back ' + current_acc.name);
    };
    
    
    // Login user - confirm credentials
    // If success, return account object    
    // If fail, return null
});

app.get('/account/get/:email', function (req, res) {
    var email = req.params.email;
    var account_email= db.get('accounts').find({email}).value();
    console.log('Here is your account with given email-id ' + account_email.name);
    res.send(account_email.name);

    
    // Return account based on email
});

app.get('/account/deposit/:email/:amount', function (req, res){
    var email = req.params.email;
    var deposit= req.params.amount;
    var current_acc = db.get('accounts').find({email}).value();
    
        if(current_acc == null) {
            console.log('Account with this email address does not exist!');
            res.send('Account with this email address does not exist!');
            }
        else{
            balance_new = current_acc.balance + Number(deposit);
            transactions_new = current_acc.transactions + (' Deposited ' + deposit + ', ');
            db.get('accounts')
            .find({email})
            .assign({ balance: balance_new , transactions:transactions_new})
            .write()
        console.log('Thank you ' + current_acc.name + ', you have succesfully lost ' + deposit);
        res.send('Thank you ' + current_acc.name + ', you have succesfully lost ' + deposit);
        };
        
    
    
    // Deposit amount for email
    // return success or failure string
});

app.get('/account/withdraw/:email/:amount', function (req, res) {
        var email = req.params.email;
        var withdrawal = req.params.amount;
        

        var current_acc = db.get('accounts').find({email}).value();
        var current_balance=Number(current_acc.balance)
    
        if(current_acc == null) {
            console.log('Account with this email address does not exist!');
            res.send('Account with this email address does not exist!');
        }
        else if(current_balance<withdrawal) { 
            console.log('Not enough money in the account!');
            res.send('Not enough money in the account!');
            return;
        } else{
            balance_new = current_balance - Number(withdrawal);
            transactions_new = current_acc.transactions + (' Withdraw ' + req.params.amount + ', ');
            db.get('accounts')
            .find({ email})
            .assign({ balance: balance_new, transactions:transactions_new})
            .write()
        console.log('Withdrawal was made for' + current_acc.name);
        res.send('Withdrawal was made for' + current_acc.name);
        };
        
    
    
    // Withdraw amount for email
    // return success or failure string
});

app.get('/account/transactions/:email', function (req, res) {
    var email = req.params.email;
    

    var current_acc = db.get('accounts').find({email}).value();
    if(current_acc == null) {
        console.log('Account with this email address does not exist!');
        res.send('Account with this email address does not exist!');
    }
    else{ 
    console.log('Hello '+ current_acc.name +', your transaction history is as follows: ' + current_acc.transactions);
    res.send('Hello '+ current_acc.name +', your transaction history is as follows: ' + current_acc.transactions);
    };

    // YOUR CODE
    // Return all transactions for account
});
app.get('/account/balance/:email', function (req, res) {
    var email = req.params.email;

    var current_acc = db.get('accounts').find({email}).value(); 

    if(current_acc == null) {
        console.log('Account with this email address does not exist!');
        res.send('Account with this email address does not exist!');
    }
    else{ 
    console.log('Hello '+ current_acc.name +', here is your balance: ' + current_acc.balance);
    res.send('Hello '+ current_acc.name +', here is your balance:  ' + current_acc.balance);
    };
});

app.get('/account/all', function (req, res) {
    
    var accounts = db.get('accounts').value();
    console.log(accounts);
    res.send(accounts);
    
    // YOUR CODE
    // Return data for all accounts
});



// start server
app.listen(3000,function(){

    console.log('Running on port:3000');
});