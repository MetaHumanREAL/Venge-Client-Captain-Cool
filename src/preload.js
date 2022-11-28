const Store = require('electron-store');

const settings = new Store();

window.onload = function() {
    app.settingsTabs.push({ name: 'Client', icon: 'fa-desktop', tab: 'Client' });

    app.customSettings.push({ name: 'Fullscreen', type: 'checkbox', value: true, tab: 'Client' });
    app.customSettings.push({ name: 'Cap FPS', type: 'checkbox', value: false, tab: 'Client' });

    
    pc.app.on('Client:CustomSettingsChange', function(setting){
        settings.set(setting.name, setting.value);
        console.log()
    });
};