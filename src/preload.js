const Store = require('electron-store');

const settings = new Store();


window.onload = function() {
    app.settingsTabs.push({ name: 'Client', icon: 'fa-desktop', tab: 'Client' });

    app.customSettings.push({ name: 'Fullscreen', type: 'checkbox', value: true, tab: 'Client' });
    app.customSettings.push({ name: 'Cap FPS', type: 'checkbox', value: false, tab: 'Client' });
};



function syncSettings() {
    settings.set('fullScreen', app.customSettings[0].value);
    settings.set('capFPS', app.customSettings[1].value);
}

setInterval(() => {
    syncSettings()
}, 1000);