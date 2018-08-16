let assert = require('assert');

let SettingsBill = require('../Settingfunction');


describe('settings-bill', function() {

  it('Update the appropriate smsTotal.', function() {
    const set = SettingsBill() ;

    set.setSmsCost(11);
    set.setCritical(40)
    set.updateSetting('sms');
    set.updateSetting('sms');
    set.updateSetting('sms');
    assert.equal(set.getSms(),33);

  });

  it('Update the appropriate callsTotal.', function() {
    const set = SettingsBill() ;

    set.setCallCost(2);
    set.setCritical(40);
    set.updateSetting('call')
    set.updateSetting('call')
    set.updateSetting('call')
    assert.equal(set.getCall(),6);

  });


  it('should calculate total amount of sms&call.', function() {
    const set = SettingsBill() ;


    set.setCallCost(2.75);
    set.setSmsCost(2);
    set.setCritical(40)
    set.updateSetting('call')
    set.updateSetting('call')
    set.updateSetting('sms');
    set.updateSetting('sms');
    set.updateSetting('call')
    set.updateSetting('call')
    assert.equal(set.getCall(), 11);

  });
  
  it('test if reached warning level' , function(){

    const set = SettingsBill() ;
    
    set.updateSetting('call')
    set.updateSetting('sms');
    assert.equal(set.ReachedWarning(),true);
    set.updateSetting('sms');
    set.updateSetting('call')
    set.updateSetting('sms');
    set.updateSetting('sms');
    set.updateSetting('call')
    set.updateSetting('call')
    set.updateSetting('sms');

    assert.equal(set.ReachedWarning(),true);

  });

  it('test if reaches critical level' , function(){
    const set = SettingsBill() ;

    set.updateSetting('call')
    set.updateSetting('sms');
    assert.equal(set.ReachedCritical(), true);
    set.updateSetting('sms');
    set.updateSetting('call')
    set.updateSetting('sms');
    set.updateSetting('sms');
    set.updateSetting('call')
    set.updateSetting('call')
    set.updateSetting('sms');
    set.updateSetting('sms');
    set.updateSetting('call')
    set.updateSetting('call')
    set.updateSetting('call')
    set.updateSetting('call')

    assert.equal(set.ReachedCritical(),true );


    });

});
