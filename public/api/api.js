var superagent = require('superagent');
app.use(superagent());
function create() {
    // -------------------------------------
    //  YOUR CODE
    //  Create user account on server
    // -------------------------------------    

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var status = document.getElementById('createStatus');
    var url = '/account/create/' + name + '/' + email + '/' + password;
    
    superagent
    .get(url)
    .end(function(err, res){
        if (err) {
            console.log(err);
            status.innerHTML = res.text;
        }
        else {
            console.log(res.text);
            status.innerHTML = res.text;
            setTimeout(function(){ status.innerHTML = '';},6000);
        }
 });  
}

function login() {
    // -------------------------------------
    //  YOUR CODE
    //  Confirm credentials on server
    // -------------------------------------
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;
    var status = document.getElementById('loginStatus');
    var url = '/account/login/' + email + '/' + password;
    superagent
    .get(url)
    .end(function(err, res){
        if (err) {
            console.log(err);
        } else {
            if (res.text){
                console.log(res.text);
                status.innerHTML = res.text;
                setTimeout(function(){ status.innerHTML = '';},6000);
            }
            else{
                console.log('Authentication Failed');
            }
        }
    });
}

function deposit() {
    // -------------------------------------
    //  YOUR CODE
    //  Deposit funds user funds on server
    // -------------------------------------
    var email    = document.getElementById('depositEmail').value;
    var amount = document.getElementById('depositAmount').value;    
    var status   = document.getElementById('depositStatus');
    var url = '/account/deposit/' + email + '/' + amount;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                if (res.text){
                    console.log(res.text);
                    status.innerHTML = res.text;
                }
                else{
                    console.log('Deposit Failed');
                    status.innerHTML = 'Deposit Failed';
                }
                setTimeout(function(){ status.innerHTML = '';},3000);
            }
        });
}

function withdraw() {
    // -------------------------------------
    //  YOUR CODE
    //  Withdraw funds user funds on server
    // -------------------------------------
    var email = document.getElementById('withdrawEmail').value;
    var amount = document.getElementById('withdrawAmount').value;
    var status = document.getElementById('withdrawStatus');
    var url = '/account/withdraw/' + email + '/' + amount;
    superagent
        .get(url)
        .end(function(err, res){
        if(err){
            console.log(err)
        }
        else{
            if (res.text){
                console.log(res.text);
                status.innerHTML = res.text;
            }
            else{
                console.log('Withdraw Failed');
                status.innerHTML = 'Withdraw Failed';
            }
            setTimeout(function(){ status.innerHTML = '';},3000);
        }
    });
}

function transactions() {
    // -------------------------------------
    //  YOUR CODE
    //  Get all user transactions
    // -------------------------------------
    var email = document.getElementById('transactionsEmail').value;
    var status = document.getElementById('transactionsStatus');
    var url = '/account/transactions/' + email;
    superagent
    .get(url)
    .end(function(err, res){
        if(err){
            console.log(err)
        }
        else{
            status.innerHTML = res.text;
        }
 });  

}

function balance() {
    // -------------------------------------
    //  YOUR CODE
    //  Get user balance
    // -------------------------------------
    var email  = document.getElementById('balanceEmail').value;
    var status = document.getElementById('balanceStatus');
    var url = '/account/balance/' + email;
    superagent
    .get(url)
    .end(function(err, res){
        if(err){
            console.log(err)
        }
        else{
            status.innerHTML = res.text;
        }
 });  
}

function allData() {
    // -------------------------------------
    //  YOUR CODE
    //  Get all data
    // -------------------------------------
    
    const Http = new XMLHttpRequest();
    var url = '/account/all';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = (e) => {
        if (Http.responseText != null && Http.responseText != '') {
            if (Http.status == 200) {
                document.getElementById('output').value = Http.responseText;
            }
            else {
                document.getElementById('output').value = "No data was found";
            }
        }
        else { //empty server response
            document.getElementById('output').value = "All accounts request failed "
        }
    }
}

