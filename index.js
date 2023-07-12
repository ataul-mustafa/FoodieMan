const express = require('express');
const insert = require('./DataBase/insert');
const fetch = require('./DataBase/fetch');
const fetchAll = require('./DataBase/fetchAll');
const bodyParser = require('body-parser');


const { dirname } = require('path');
const path = require('path');
const { render } = require('ejs');

const app = express();
app.set('view engine', 'ejs');

const PublicPath = path.join(__dirname, '/public');
app.use(express.static(PublicPath));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/sign-in', (req, res) => {
    res.render('sign-in')
});
app.get('/sign-up', (req, res) => {
    res.render('sign-up')
});
app.get('/sign-in/cart', (req, res) => {
    res.render('cart')
});
app.get('/sign-in/cart/order', (req, res) => {
    res.render('delivery')
});
app.get('/vendor-sign-in', (req, res) => {
    res.render('vendor-sign-in');
});
app.get('/contact-us', (req, res) => {
    res.render('contact-us');
});

app.get('*', (req, res) => {
    res.render('404')
});


app.post('/sign-in', async (req, res) => {


    try {
        const mail = req.body.mail;
        const password = req.body.psw;
        const rememberMe = req.body.remember;
        // let result = await insert('sign-in', {mail:mail, password:password, remember:rememberMe});

        const retrieve = await fetch('sign-up', { mail: mail });
        // res.send(retrieve);

        if (retrieve.mail == mail && retrieve.password == password) {
            res.render('afterLogin', { retrieve })
        }
        else {
            res.render('loginFailed');
        }

    } catch (error) {
        res.render('loginFailed');
    }
});


app.post('/sign-up', async (req, res) => {

    let username = req.body.name;
    let mail = req.body.email;
    let password = req.body.psw;
    let repeatPassword = req.body.pswRepeat;
    let rememberMe = req.body.remember;

    let fetchedData = await fetch('sign-up', { mail });
    if (fetchedData == null) {
        if (password == repeatPassword) {
            let result = await insert('sign-up', { name: username, mail: mail, password: password, RepeatPassword: repeatPassword, remember: rememberMe });
            if (result.acknowledged) {
                res.render('index')
            }
        } else {
            res.send("Password does not match");
        }

    } else {
        res.render('alreadySignUp');
    }
});


app.post('/sign-in/cart/order', async (req, res) => {
    let name = req.body.firstname;
    let email = req.body.email;
    let city = req.body.city;
    let zip = req.body.zip;
    let cardname = req.body.cardnumber;
    let expmonth = req.body.expmonth;
    let expyear = req.body.expyear;
    let cvv = req.body.cvv;
    const res2 = await insert('orders', { name: name, email: email, City: city, Zip: zip, Cardname: cardname, Expmonth: expmonth, ExpYear: expyear, CVV: cvv });
    if (res2.acknowledged) {
        res.render('delivery');
    }
});

app.post('/vendor-sign-in', async (req, res) => {
    const mail = req.body.mail;
    const password = req.body.psw;

    try {
        const reslt = await fetch('vendor-sign-in', { mail: mail });
        if (reslt.mail == mail && reslt.password == password) {
            let order = await fetchAll('orders');
            res.render('ordersList', { order });
        } else {
            res.send('You are not a vendor');
        }
    } catch (error) {
        res.send('Incorrect information');
    }
});


app.listen(4000, () => {
    console.log("Server Started");
});