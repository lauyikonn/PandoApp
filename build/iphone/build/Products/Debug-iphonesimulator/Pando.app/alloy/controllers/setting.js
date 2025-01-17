function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function switch_left_handed(e) {
        true === e.source.value ? Ti.App.Properties.setString("left-handed", "yes") : Ti.App.Properties.setString("left-handed", "");
    }
    function nav2Profile() {
        Alloy.Globals.Navigator.open("setting_profile");
    }
    function logout() {
        var user = require("user");
        user.logout(function() {
            Alloy.Globals.Navigator.navGroup.close();
            var win = Alloy.createController("auth/login").getView();
            win.open();
        });
    }
    function check_switch() {
        var left_handed = Ti.App.Properties.getString("left-handed") || "";
        "" != left_handed && ($.left_handed_switch.value = true);
    }
    function init() {
        check_switch();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "setting";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ebebeb",
        titleAttributes: {
            color: "#ffffff"
        },
        navBarHidden: "false",
        font: {
            fontFamily: "Lato-Regular"
        },
        barColor: "#323136",
        navTintColor: "#75d0cb",
        id: "win",
        title: "Setting"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    var __alloyId76 = [];
    var __alloyId78 = [];
    $.__views.__alloyId79 = Ti.UI.createTableViewRow({
        id: "__alloyId79"
    });
    __alloyId78.push($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        id: "__alloyId80"
    });
    $.__views.__alloyId79.add($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createLabel({
        color: "#2a363a",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontFamily: "Lato-Light",
            fontSize: 18
        },
        text: "Left-handed",
        left: "0",
        id: "__alloyId81"
    });
    $.__views.__alloyId80.add($.__views.__alloyId81);
    $.__views.left_handed_switch = Ti.UI.createSwitch({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        value: false,
        id: "left_handed_switch",
        right: "0"
    });
    $.__views.__alloyId80.add($.__views.left_handed_switch);
    switch_left_handed ? $.addListener($.__views.left_handed_switch, "change", switch_left_handed) : __defers["$.__views.left_handed_switch!change!switch_left_handed"] = true;
    $.__views.__alloyId82 = Ti.UI.createTableViewRow({
        id: "__alloyId82"
    });
    __alloyId78.push($.__views.__alloyId82);
    nav2Profile ? $.addListener($.__views.__alloyId82, "click", nav2Profile) : __defers["$.__views.__alloyId82!click!nav2Profile"] = true;
    $.__views.__alloyId83 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        id: "__alloyId83"
    });
    $.__views.__alloyId82.add($.__views.__alloyId83);
    $.__views.__alloyId84 = Ti.UI.createLabel({
        color: "#2a363a",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontFamily: "Lato-Light",
            fontSize: 18
        },
        text: "Profile",
        left: "0",
        id: "__alloyId84"
    });
    $.__views.__alloyId83.add($.__views.__alloyId84);
    $.__views.__alloyId85 = Ti.UI.createTableViewRow({
        id: "__alloyId85"
    });
    __alloyId78.push($.__views.__alloyId85);
    $.__views.__alloyId86 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        id: "__alloyId86"
    });
    $.__views.__alloyId85.add($.__views.__alloyId86);
    $.__views.__alloyId87 = Ti.UI.createLabel({
        color: "#2a363a",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontFamily: "Lato-Light",
            fontSize: 18
        },
        text: "Privacy",
        left: "0",
        id: "__alloyId87"
    });
    $.__views.__alloyId86.add($.__views.__alloyId87);
    $.__views.__alloyId88 = Ti.UI.createTableViewRow({
        id: "__alloyId88"
    });
    __alloyId78.push($.__views.__alloyId88);
    logout ? $.addListener($.__views.__alloyId88, "click", logout) : __defers["$.__views.__alloyId88!click!logout"] = true;
    $.__views.__alloyId89 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        id: "__alloyId89"
    });
    $.__views.__alloyId88.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createLabel({
        color: "#2a363a",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontFamily: "Lato-Light",
            fontSize: 18
        },
        text: "Logout",
        left: "0",
        id: "__alloyId90"
    });
    $.__views.__alloyId89.add($.__views.__alloyId90);
    $.__views.__alloyId77 = Ti.UI.createTableView({
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderRadius: 4,
        data: __alloyId78,
        id: "__alloyId77"
    });
    __alloyId76.push($.__views.__alloyId77);
    $.__views.__alloyId75 = Ti.UI.createScrollableView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        views: __alloyId76,
        id: "__alloyId75"
    });
    $.__views.win.add($.__views.__alloyId75);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    init();
    $.win.addEventListener("close", function() {
        $.destroy();
        console.log("window close");
    });
    __defers["$.__views.left_handed_switch!change!switch_left_handed"] && $.addListener($.__views.left_handed_switch, "change", switch_left_handed);
    __defers["$.__views.__alloyId82!click!nav2Profile"] && $.addListener($.__views.__alloyId82, "click", nav2Profile);
    __defers["$.__views.__alloyId88!click!logout"] && $.addListener($.__views.__alloyId88, "click", logout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;