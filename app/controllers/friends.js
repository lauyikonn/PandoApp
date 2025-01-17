var args = arguments[0] || {};
var loading = Alloy.createController("loading");
var friends = Alloy.createCollection("friends");
var data = friends.getData();

/**
 * Navigate to Conversation by u_id
 */
function navToFriendItem(e){
	var f_id = parent({name: "f_id"}, e.source);
	Alloy.Globals.Navigator.open("friends_items", {f_id: f_id});
}

/*
 	render friends list
 * */
function render_friends_list(){
	$.inner_box.removeAllChildren();
	for (var i=0; i < data.length; i++) {

		var view_container = $.UI.create("View",{
			classes: ['hsize', 'wfill', 'horz'],
			f_id: data[i].f_id
		});
		
		var imageView_item_thumb = $.UI.create("ImageView",{
			top: 10,
			width: 60,
			height: "auto",
			image: data[i].thumb_path,
			defaultImage: "/images/default/small_item.png",
		});
		
		var view_info_box = $.UI.create("View",{
			classes: ['hsize', 'vert', 'padding'],
			width: "70%"
		});
		var total = data[i].total || 0;
		
		var label_item_name = $.UI.create("Label",{
			classes:['h5','wfill','hsize'],
			textAlign: "left",
			text: data[i].fullname
		});
		
		var label_number_people = $.UI.create("Label",{
			classes:['h6','wfill','hsize'],
			color: "#333333",
			textAlign: "left",
			text: total+" unread message."
		});
		
		view_info_box.add(label_item_name);
		view_info_box.add(label_number_people);
		
		view_container.add(imageView_item_thumb);
		view_container.add(view_info_box);
		$.inner_box.add(view_container);
		
		view_container.addEventListener("click", navToFriendItem);
	};
}

/*
 	Refresh
 * */
function refresh(){
	loading.start();
	var u_id = Ti.App.Properties.getString('user_id') || 0;
	var checker = Alloy.createCollection('updateChecker'); 
	var isUpdate = checker.getCheckerById(3, u_id);
	var last_update = isUpdate.updated || "";
	console.log(u_id);
	API.callByPost({url:"getFriendListUrl", params: {last_updated: last_update, u_id:u_id}}, function(responseText){
		var model = Alloy.createCollection("friends");
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		model.saveArray(arr);
		data = model.getData();
		checker.updateModule(3,"friends", Common.now(), u_id);
		render_friends_list();
		$.label_friends.text = "Friends ("+data.length+")";
		loading.finish();
	});
}

/**
 * Closes the Window
 */
function closeWindow(){
	$.win.close();
}

function init(){
	$.win.add(loading.getView());
	refresh();
}

init();

Ti.App.addEventListener('friends:refresh',refresh);

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('friends:refresh',refresh);
	$.destroy();
	console.log("window close");
});
