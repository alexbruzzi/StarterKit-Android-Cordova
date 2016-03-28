var latitude = 0.0;
var longitude = 0.0;
var phoneDetails = {};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            phoneDetails = {
                "deviceId": device.uuid,
                "manufacturer": device.manufacturer,
                "model": device.model,
                "latitude": latitude,
                "longitude": longitude
            }

        }, function(error) {
            latitude = 0.0;
            longitude = 0.0;
            phoneDetails = {
                "deviceId": device.uuid,
                "manufacturer": device.manufacturer,
                "model": device.model,
                "latitude": latitude,
                "longitude": longitude
            }
        });

        setTimeout(gcmTokenUpdate, 3000);
        setTimeout(appInit, 3000);

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    }
};

app.initialize();

function gcmTokenUpdate(){
    var push = PushNotification.init({
        "android": {
            "senderID": "197644362586"
        },
        "ios": {
            "alert": "true",
            "badge": "true",
            "sound": "true"
        },
        "windows": {}
    });
    push.on('registration', function(data) {

        var gcmdata = JSON.stringify({
            "userId": 2736482,
            "pushToken": data.registrationId,
            "pushKey": "AIzaSyB7YgH_8XYPbHAvwbMt1l-9_BsKoYdlS20",
            "notificationType": 0,
            "phoneDetails": phoneDetails
        });

        $.ajax({
            url: 'http://192.168.0.106:8000/update_push_token/',
            type : 'POST',
            headers: { 
                "Content-Type": "application/json",
                "apikey": "25745dd7d6754297a0883f4ee3201982"
            },
            data: gcmdata
        });

    });

    push.on('notification', function(data) {
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
    });

    push.on('error', function(e) {
        // e.message
    });
}

function appInit() {
    /* Beacon Call : App Init */

    var data = JSON.stringify({
        "userId": 2736482,
        "phoneDetails": phoneDetails
    });

    $.ajax({
        url: 'http://192.168.0.106:8000/events/app.init/',
        type : 'POST',
        headers: { 
            "Content-Type": "application/json",
            "apikey": "25745dd7d6754297a0883f4ee3201982"
        },
        data: data
    });

    /* End App Init */
}

$('#app_init').click(function(){
    var initdata = JSON.stringify({
        "userId": 2736482,
        "phoneDetails": phoneDetails
    });

    $.ajax({
        url: 'http://192.168.0.106:8000/events/app.init/',
        type : 'POST',
        headers: { 
            "Content-Type": "application/json",
            "apikey": "25745dd7d6754297a0883f4ee3201982"
        },
        data: initdata
    });
});

$('#app_login').click(function(){
    var logindata = JSON.stringify({
        "userId": 2736482,
        "phoneDetails": phoneDetails
    });

    $.ajax({
        url: 'http://192.168.0.106:8000/events/app.login/',
        type : 'POST',
        headers: { 
            "Content-Type": "application/json",
            "apikey": "25745dd7d6754297a0883f4ee3201982"
        },
        data: logindata
    });
});

$('#app_logout').click(function(){
    var logoutdata = JSON.stringify({
        "userId": 2736482,
        "phoneDetails": phoneDetails
    });

    $.ajax({
        url: 'http://192.168.0.106:8000/events/app.logout/',
        type : 'POST',
        headers: { 
            "Content-Type": "application/json",
            "apikey": "25745dd7d6754297a0883f4ee3201982"
        },
        data: logoutdata
    });
});

$('#page_view').click(function(){
    var pageview_data = JSON.stringify({
        "userId": 2736482,
        "phoneDetails": phoneDetails,
        "routeUrl": "/Home/DealsOfTheDay/34",
        "categories": [
            "shopping",
            "handbags",
            "rajasthani"
        ],
        "tags": [
            "handbags",
            "aldo",
            "yellow"
        ]
    });

    $.ajax({
        url: 'http://192.168.0.106:8000/events/page.view/',
        type : 'POST',
        headers: { 
            "Content-Type": "application/json",
            "apikey": "25745dd7d6754297a0883f4ee3201982"
        },
        data: pageview_data
    });
});

$('#product_pageview').click(function(){
    var productdata = JSON.stringify({
        "userId": 2736482,
        "phoneDetails": phoneDetails,
        "routeUrl": "/Home/DealsOfTheDay/34",
        "categories": [
            "shopping",
            "handbags",
            "rajasthani"
        ],
        "tags": [
            "handbags",
            "aldo",
            "yellow"
        ],
        "productId": 63726,
        "productName": "Smartphone Series S01",
        "price": 99.99
    });

    $.ajax({
        url: 'http://192.168.0.106:8000/events/productpage.view/',
        type : 'POST',
        headers: { 
            "Content-Type": "application/json",
            "apikey": "25745dd7d6754297a0883f4ee3201982"
        },
        data: productdata
    });
});