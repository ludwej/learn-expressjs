module.exports = function setBill() {
  var callSettings = 0;
  var smsSettings = 0;
  var totalS = 0;

  var callCost = 0;
  var smsCost = 0;
  var warning = 30;
  var critical = 60;

  let color = '';

  var actionList = [];

  var updateSetting = function (billType) {

    let type = billType;

    if (totalS >= critical) {
      return color;
    }

    // else{ 
    if (type === 'sms') {
      smsSettings += smsCost;
      console.log(smsSettings);

      actionList.push({
        type: type,
        price: getSms(),
        timestamp: new Date()
      });
      // billCost += smsCost;
    }
    if (type === 'call') {
      callSettings += callCost;

    }

    actionList.push({
      type: type,
      price: getCall(),
      timestamp: new Date()

      // billCost += callCost;
    });
    return totalS = smsSettings + callSettings;
  }



  // getters
  var getCall = function () {
    return callSettings;
  }
  var getSms = function () {
    return smsSettings;
  }
  var getWarning = function () {
    return warning;
  }
  var getCritical = function () {
    return critical;
  }
  var getTotals = function () {
    totalS = smsSettings + callSettings;
    return totalS;
  }

  function callCostType() {
    return callCost;
  }

  function smsCostType() {
    return smsCost;
  }
  // setters

  var setCallCost = function (value) {
    callCost = parseFloat(value);
  }
  var setSmsCost = function (value) {
    smsCost = parseFloat(value);
  }
  var setWarning = function (value) {
    warning = parseFloat(value);
  }
  var setCritical = function (value) {
    critical = parseFloat(value);
  }

  var ReachedWarning = function () {
    return getTotals() >= getWarning();
  }

  var ReachedCritical = function () {
    return getTotals() >= getCritical();

  }

  function actionsFor(billT) {
    return actionList.filter((bill) => bill.type === billT)
  }


  function actions() {
    return actionList;
  }

  function myColor() {

    if (totalS >= critical) {
      let color = 'danger'
      return color;
    }
    if (totalS >= warning) {
      let color = 'warning'
      return color;
    }
  }

  function resetBtn(){
    var callSettings = 0;
    var smsSettings = 0;
    var totalS = 0;
    var callCost = 0;
    var smsCost = 0;
    var warning = 0;
    var critical = 0;
    let color = '';
    var actionList = [];


  }



  return {
    updateSetting,
    getCall,
    getSms,
    getWarning,
    getCritical,
    getTotals,
    setCallCost,
    setSmsCost,
    setWarning,
    setCritical,
    ReachedWarning,
    ReachedCritical,
    getTotals,
    callCostType,
    smsCostType,
    actions,
    actionsFor,
    myColor,
    resetBtn



  }
}