var Service, Characteristic;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-tv", "TV", TVAccessory);
}

function TVAccessory(log, config) {
    this.service = new Service.Outlet("TV", "tvService");
    this.service.setCharacteristic(Characteristic.ConfiguredName, "TV");
    this.service.setCharacteristic(Characteristic.On, 1);
    this.service2 = new Service.Outlet("TV2", "tvService2");
    this.service2.setCharacteristic(Characteristic.ConfiguredName, "TV2");
    this.service2.setCharacteristic(Characteristic.On, 1);
    this.service3 = new Service.GarageDoorOpener("GarageDoorOpener", "garageDoorOpener");
    this.service3.setCharacteristic(Characteristic.ConfiguredName, "GarageDoorOpener");
    this.service3.setCharacteristic(Characteristic.CurrentDoorState, 1);
    this.service4 = new Service.Door("Door", "Door");
    this.service4.setCharacteristic(Characteristic.ConfiguredName, "Door");
    this.service4.setCharacteristic(Characteristic.CurrentPosition, 100);
    this.service4.setCharacteristic(Characteristic.PositionState, 2);
    this.service4.setCharacteristic(Characteristic.TargetPosition, 100);
    this.service5 = new Service.Window("Window", "Window");
    this.service5.setCharacteristic(Characteristic.ConfiguredName, "Window");
    this.service5.setCharacteristic(Characteristic.CurrentPosition, 100);
    this.service5.setCharacteristic(Characteristic.PositionState, 2);
    this.service5.setCharacteristic(Characteristic.TargetPosition, 100);

    this.service6 = new Service.Window("WindowCovering", "WindowCovering");
    this.service6.setCharacteristic(Characteristic.ConfiguredName, "WindowCovering");
    this.service6.setCharacteristic(Characteristic.CurrentPosition, 100);
    this.service6.setCharacteristic(Characteristic.PositionState, 2);
    this.service6.setCharacteristic(Characteristic.TargetPosition, 100);

    this.service7 = new Service.Valve("Valve", "Valve");
    this.service7.setCharacteristic(Characteristic.ConfiguredName, "Valve");
    this.service7.setCharacteristic(Characteristic.Active, Characteristic.Active.ACTIVE);
    this.service7.setCharacteristic(Characteristic.ValveType, Characteristic.ValveType.SHOWER_HEAD);
    this.service7.setCharacteristic(Characteristic.InUse, Characteristic.InUse.IN_USE);
    this.service8 = new Service.Lightbulb("Light bulb", "Light bulb");
    this.service8.setCharacteristic(Characteristic.On,true);
    this.service8.setCharacteristic(Characteristic.Brightness, 50);
    this.service8.setCharacteristic(Characteristic.ColorTemperature, 300);
    this.service8.setCharacteristic(Characteristic.Hue, 300);
    this.service8.setCharacteristic(Characteristic.Name, "test");
    this.service8.setCharacteristic(Characteristic.Saturation, 50);

}

TVAccessory.prototype.getServices = function () {
    return [this.service,this.service2,this.service3,this.service4,this.service5,this.service6,this.service7,this.service8];
}
