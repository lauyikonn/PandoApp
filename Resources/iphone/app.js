function parent(key, e) {
    console.log(typeof key.value);
    console.log(key.value);
    if ("undefined" != typeof key.value) {
        if (eval("e." + key.name) == key.value) return e;
        if (eval("e.parent." + key.name) == key.value) return e.parent;
        if (eval("e.parent.parent." + key.name) == key.value) return e.parent.parent;
        console.log("box not found");
    } else {
        if ("undefined" != eval("typeof e." + key.name)) return eval("e." + key.name);
        if ("undefined" != eval("typeof e.parent." + key.name)) return eval("e.parent." + key.name);
        if ("undefined" != eval("typeof e.parent.parent." + key.name)) return eval("e.parent.parent." + key.name);
        console.log("box not found");
    }
}

function children(key, e) {
    if (eval("e." + key.name) == key.value) return e;
    for (var i = 0; i < e.children.length; i++) {
        if (eval("e.children[i]." + key.name) == key.value) return e.children[i];
        for (var a = 0; a < e.children[i].children.length; a++) {
            if (eval("e.children[i].children[a]." + key.name) == key.value) return e.children[i].children[a];
            for (var c = 0; c < e.children[i].children[a].children.length; c++) if (eval("e.children[i].children[a].children[c]." + key.name) == key.value) return e.children[i].children[a].children[c];
        }
    }
}

function setCurLoc(e) {
    console.log("set current location");
    longitude = e.coords.longitude;
    latitude = e.coords.latitude;
    console.log(longitude + ", " + latitude);
    Ti.App.Properties.setString("longitude", longitude);
    Ti.App.Properties.setString("latitude", latitude);
}

function checkGeoLocation() {
    if (Titanium.Geolocation.locationServicesEnabled) {
        Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HIGH;
        try {
            Titanium.Geolocation.getCurrentPosition(setCurLoc);
        } catch (e) {
            console.log(e);
        }
    } else Common.createAlert("Error", "Please enable location services");
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var _ = require("underscore")._;

var API = require("api");

var PUSH = require("push");

var Common = require("common");

var DBVersionControl = require("DBVersionControl");

var image_moving = false;

Alloy.Globals.Map = require("ti.map");

DBVersionControl.checkAndUpdate();

Titanium.App.addEventListener("resumed", function() {
    checkGeoLocation();
});

Alloy.createController("index");