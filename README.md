# Cordova Android, OCTO Starter Kit #

##### This kit covers an app published on Android platform and uses GCM for push notifications. #####

# Get Started #

## Download ##

Download the starter kit from here. This starter kit contains a working sample of code that takes all permissions from users, and sends appropriate API calls at appropriate times.

If you already have an app, chances are most of the steps would have been already done. However, it is advised to go through the document and remove any inconsistencies.

The code snippets mentioned here can be found in the starter kit. Should you have any difficulty understaning the flow, the starter kit code should help you out.

## Setup Capabilities ##

### GeoLocation Setup ###

- Add Cordova Plugin : `cordova-plugin-geolocation`

```
	cordova plugin add cordova-plugin-geolocation

```

- Get Geo location details using its predefined methods

```

	navigator.geolocation.getCurrentPosition(function(position) {
	    var latitude = position.coords.latitude;
	    var longitude = position.coords.longitude;
	}, function(error) {
	    // Unable to find location
	});

```

### GCM Setup ###

- Create an application from [Google Developers Console](https://console.developers.google.com).
- Activate GCM API.
- Your Google App **Project number** is your **SENDER_ID**.
- Add Cordova Plugin : `phonegap-plugin-push`
	- Replace SENDER_ID with your own

```
	cordova plugin add phonegap-plugin-push --variable SENDER_ID="XXXXXXX"

```

- Get User GCM registration details to send or receive notifications in future

```

	var push = PushNotification.init({
        "android": {
            "senderID": "123456789" // Replace it with your own Google App Sender ID
        }
    });

    push.on('registration', function(data) {
       console.log(data.registrationId); // User GCM registration token
    });

    // On Receiving Notification
    push.on('notification', function(data) {
        console.log("GCM Debugging");
        console.log(data);
        console.log(data.message);
        console.log(data.title);
        console.log(data.count);
        console.log(data.sound);
        console.log(data.image);
        console.log(data.additionalData);
    });

    push.on('error', function(e) {
    	// Handle Error 
        // e.message
    });

```

### Get Phone Details Setup ###

- Add Cordova Plugin : `cordova-plugin-device`

```
	cordova plugin add cordova-plugin-device

```

- Get Device details using global **device** variable defined by the plugin

```

	var deviceId = device.uuid;
	var manufacturer = device.manufacturer;
	var model = device.model;

```

## How to use ##

#### Phone Details Json ####

- Create a `PhoneDetails` variable & initialize Json variables
	- Fetch location details from GeoLocation API explained above.
	- Fetch device details using cordova plugin as explained above.

```

	var phoneDetails = {
	    "deviceId": device.uuid,
	    "manufacturer": device.manufacturer,
	    "model": device.model,
	    "latitude": latitude,
	    "longitude": longitude
	}

```

---

#### App Init Call ####

- Do an AJAX POST call to hit octo api when application starts
	- Replace **phoneDetails** with your Json type phone details variable
	- Replace **User ID** with your own User's ID
	- Replace **url base address** with **Octo API Base Address** shared with you
	- Set **API Key** shared with you

```

	var data = JSON.stringify({
        "userId": 1234567, // Replace your User ID
        "phoneDetails": phoneDetails // Replace phone details variable
    });

    $.ajax({
        url: 'http://api.octomatic.in/events/app.init/', // Replace Base Address
        type : 'POST',
        headers: { 
            "Content-Type": "application/json",
            "apikey": "API_KEY" // Replace your API Key
        },
        data: data
    });

```

---

#### App Login Call ####

- Do an AJAX POST call to hit octo api when user LoggedIn
	- Replace **phoneDetails** with your Json type phone details variable
	- Replace **User ID** with your own User's ID
	- Replace **url base address** with **Octo API Base Address** shared with you
	- Set **API Key** shared with you

```

    var loginData = JSON.stringify({
        "userId": 1234567, // Replace your User ID
        "phoneDetails": phoneDetails // Replace phone details variable
    });

    $.ajax({
        url: 'http://api.octomatic.in/events/app.login/', // Replace Base Address
        type : 'POST',
        headers: { 
            "Content-Type": "application/json",
            "apikey": "API_KEY" // Replace your API Key
        },
        data: loginData
    });

```

---

#### App Logout Call ####

- Do an AJAX POST call to hit octo api when user LoggedOut
	- Replace **phoneDetails** with your Json type phone details variable
	- Replace **User ID** with your own User's ID
	- Replace **url base address** with **Octo API Base Address** shared with you
	- Set **API Key** shared with you

```

    var logoutData = JSON.stringify({
        "userId": 1234567, // Replace your User ID
        "phoneDetails": phoneDetails // Replace phone details variable
    });

    $.ajax({
        url: 'http://api.octomatic.in/events/app.logout/', // Replace Base Address
        type : 'POST',
        headers: { 
            "Content-Type": "application/json",
            "apikey": "API_KEY" // Replace your API Key
        },
        data: logoutData
    });

```

---

#### App Pageview Call ####

- Do an AJAX POST call to hit octo api when user request a page
	- Replace **phoneDetails** with your Json type phone details variable
	- Replace **User ID** with your own User's ID
	- Replace **url base address** with **Octo API Base Address** shared with you
	- Set **API Key** shared with you
	- Set **Categories**, **tags**, **routeUrl*** with Page Details 

```

    var pageview_data = JSON.stringify({
        "userId": 1234567, // Replace your User ID
        "phoneDetails": phoneDetails, // Replace phone details variable
        "routeUrl": "/Home/DealsOfTheDay/34", // Replace it with your App Page URL
        "categories": [
            "shopping",
            "handbags"
        ], // Replace it with Page Categories
        "tags": [
            "handbags",
            "recommended"
        ] // Replace it with Page Tags
    });

    $.ajax({
        url: 'http://api.octomatic.in/events/page.view/', // Replace Base Address
        type : 'POST',
        headers: { 
            "Content-Type": "application/json",
            "apikey": "API_KEY" // Replace your API Key
        },
        data: pageview_data
    });

```

---

#### App Product Pageview Call ####

- Do an AJAX POST call to hit octo api when user request a product page
	- Replace **phoneDetails** with your Json type phone details variable
	- Replace **User ID** with your own User's ID
	- Replace **url base address** with **Octo API Base Address** shared with you
	- Set **API Key** shared with you
	- Set **Categories**, **tags**, **routeUrl*** according to your Page Details 
	- Set **ProductId**, **ProductName**, **Price** according to your Product Deatils

```

    var productdata = JSON.stringify({
        "userId": 1234567, // Replace your User ID
        "phoneDetails": phoneDetails, // Replace phone details variable
        "routeUrl": "/Home/DealsOfTheDay/34", // Replace it with your App Page URL
        "categories": [
            "shopping",
            "handbags"
        ], // Replace it with Page Categories
        "tags": [
            "handbags",
            "recommended"
        ], // Replace it with Page Tags
        "productId": 12345, // Set Product Id
        "productName": "Smartphone Series S01", // Set Product Name
        "price": 99.99 // Set Product Price
    });

    $.ajax({
        url: 'http://api.octomatic.in/events/productpage.view/', // Replace Base Address
        type : 'POST',
        headers: { 
            "Content-Type": "application/json",
            "apikey": "API_KEY" // Replace your API Key
        },
        data: productdata
    });

```

---

#### App GCM Token Update Call ####

- Do an AJAX POST call to hit octo api when user registered for GCM
	- Replace **phoneDetails** with your Json type phone details variable
	- Replace **User ID** with your own User's ID
	- Replace **url base address** with **Octo API Base Address** shared with you
	- Set **API Key** shared with you
	- Set **pushToken** with User's GCM registration Token
	- Replace **pushKey** with your Google GCM Api Key
	- Set **notificationType** 0 for ios, 1 for android

```

    var gcmdata = JSON.stringify({
        "userId": 1234567, // Replace your User ID
        "pushToken": "##############", // Replace with your User's Google GCM Registration Token
        "pushKey": "AbCdEfGhIjKl0123-4_56789mnop",  // Replace with your Google GCM Key
        "notificationType": 1, // 1 for android
        "phoneDetails": phoneDetails // Replace phoneDetails variable
    });

    $.ajax({
        url: 'http://api.octomatic.in/update_push_token/', // Replace Base Path
        type : 'POST',
        headers: { 
            "Content-Type": "application/json",
            "apikey": "API_KEY" // Replace OCTO API Key
        },
        data: gcmdata
    });

```
