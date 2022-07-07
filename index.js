let Service, Characteristic;
const mqtt = require('mqtt');

module.exports = (api) => {
    Service = api.hap.Service;
    Characteristic = api.hap.Characteristic;
    api.registerPlatform('Tdeado', TdeadoPlatformPlugin);
}

class TdeadoPlatformPlugin {
    log;
    accessories;
    /**
     * REQUIRED - This is the entry point to your plugin
     */
    constructor(log, config, api) {
        this.log = log;
        this.api = api;
        this.config = config;
        this.log.info('Tdeado Platform Plugin Loaded',config);
        this.accessories = [];
        this.client = mqtt.connect("mqtt://home.yangzhe.wiki:1883");   //指定服务端地址和端口
        api.on('didFinishLaunching', () => {

            api.unregisterPlatformAccessories(config.platform, config.name, this.accessories);
            for (let accessoryConfig of config.accessories) {
                const accessory = new this.api.platformAccessory(accessoryConfig.displayName, api.hap.uuid.generate(accessoryConfig.name));
                if (accessoryConfig.childAccessorys){
                    for (let childAccessory of accessoryConfig.childAccessorys) {
                       let service = new Service[childAccessory.type](childAccessory.displayName, childAccessory.name);
                        if (childAccessory.characteristics){
                            for (let characteristic of childAccessory.characteristics) {
                                let char = service.getCharacteristic(Characteristic[characteristic.characteristic])
                                    .onGet(this.onGet.bind(this))
                                    .onSet(this.onSet.bind(this));
                            }
                        }
                        accessory.addService(service)
                    }
                }else {
                    let service = new Service[accessoryConfig.type](accessoryConfig.displayName, accessoryConfig.name);
                    accessory.addService(service)
                }
                api.registerPlatformAccessories(config.platform, config.name, [accessory]);
            }
        });
    }
    onGet(value){
        this.log.info('onGet',value);
        return 1;
    }
    onSet(value){
        this.log.info('onSet',value);
    }
    configureAccessory(accessory) {
        this.accessories.push(accessory);
        this.log.info('configureAccessory accessory',this.accessories);
    }
}
