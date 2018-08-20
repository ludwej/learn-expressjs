let express = require('express')
let app = express()
var moment = require('moment');
// let settings = 0;
// let assert = require('assert')
let Settingfunction = require('./Settingfunction.js')
const billSetting = Settingfunction()

var exphbs = require('express-handlebars')
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars');


app.use(express.static('public'))

app.get('/', function (req, res) {

  let Call = billSetting.callCostType();
  let Sms = billSetting.smsCostType();
  let Warning = billSetting.getWarning();
  let Critical = billSetting.getCritical();

  let callTotal = billSetting.getCall();
  let smsTotal = billSetting.getSms();
  let grandTotal = billSetting.getTotals();

  let color = billSetting.myColor();
  

  res.render('home', {
    Call,
    Sms,
    Warning,
    Critical,
    callTotal,
    smsTotal,
    grandTotal,
    color
    
  });
});


app.post('/settings', function (req, res) {
  const sms = req.body.smsCost;
  const call = req.body.callCost;
  const warningL = req.body.warningLevel;
  const criticalL = req.body.criticalLevel;

  billSetting.setSmsCost(sms);
  billSetting.setCallCost(call);
  billSetting.setWarning(warningL);
  billSetting.setCritical(criticalL);

  res.redirect('/');
});

app.post('/action', function (req, res) {
  billSetting.updateSetting(req.body.actionType);

  res.redirect('/')
});

app.post('/resetBtn', function (req, res) {
  billSetting.resetBtn();

  res.render('home')
});

app.get('/actions', function (req, res) {
  

  res.render('actions', {actions: billSetting.actions()})
});

app.get('/actions/:billAction', function (req, res) {
  let billAction = req.params.billAction;

  res.render('actions', {actions: billSetting.actionsFor(billAction)})

});


let PORT = process.env.PORT || 3001

app.listen(PORT, function () {
  console.log('App  starting on port', PORT)
})