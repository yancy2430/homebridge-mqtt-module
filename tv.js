var Service, Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory('SWITCH', "SWITCH", SwitchAccessory);
}

function SwitchAccessory(log, config) {
    this.tvService = new Service.Television("TV", "tvService");
    this.tvService
        .setCharacteristic(Characteristic.ConfiguredName, "TV");

    this.tvService
        .setCharacteristic(Characteristic.SleepDiscoveryMode, Characteristic.SleepDiscoveryMode.ALWAYS_DISCOVERABLE);

    this.tvService
        .getCharacteristic(Characteristic.Active)
        .on('set', function(newValue, callback) {
            console.log("set Active => setNewValue: " + newValue);
            callback(null);
        });

    this.tvService
        .setCharacteristic(Characteristic.ActiveIdentifier, 1);

    this.inputHDMI1 = new Service.InputSource("hdmi1", "HDMI 1");

    this.inputHDMI1
        .setCharacteristic(Characteristic.Identifier, 1)
        .setCharacteristic(Characteristic.ConfiguredName, "HDMI 1")
        .setCharacteristic(Characteristic.IsConfigured, Characteristic.IsConfigured.CONFIGURED)
        .setCharacteristic(Characteristic.InputSourceType, Characteristic.InputSourceType.HDMI)
        .setCharacteristic(Characteristic.CurrentVisibilityState, Characteristic.CurrentVisibilityState.SHOWN);

    this.tvService.addLinkedService(this.inputHDMI1);
}

SwitchAccessory.prototype.getServices = function() {
    return [this.tvService, this.inputHDMI1];
}