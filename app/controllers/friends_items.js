var args = arguments[0] || {};
var f_id = args.f_id;
var loading = Alloy.createController("loading");
var items = Alloy.createCollection("items");
var data = items.getDataByFid(f_id);
console.log(data);
/**
 * Navigate to Conversation by u_id
 */
function navToConversation(e){
	var id = parent({name: "id"}, e.source);
	Alloy.Globals.Navigator.open("conversation", {f_id: f_id, id: id});
}

/*
 	render friends list
 * */
function render_items_list(){
	$.inner_box.removeAllChildren();
	for (var i=0; i < data.length; i++) {

		var view_container = $.UI.create("View",{
			classes: ['hsize', 'wfill', 'horz'],
			f_id: data[i].f_id,
			id: data[i].id
		});
		
		var imageView_item_thumb = $.UI.create("ImageView",{
			top: 10,
			width: 60,
			height: "auto",
			defaultImage: "/images/default/small_item.png",
			image: data[i].img_path
		});
		
		var view_info_box = $.UI.create("View",{
			classes: ['hsize', 'vert', 'padding'],
			width: "70%"
		});
		
		var label_item_name = $.UI.create("Label",{
			classes:['h5','wfill','hsize'],
			textAlign: "left",
			text: data[i].item_name
		});
		
		var total = data[i].total || 0;
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
		
		view_container.addEventListener("click", navToConversation);
	};
}

/*
 	Refresh
 * */
function refresh(){
	loading.start();
	data = items.getDataByFid(f_id);
	render_items_list();
	$.label_friends.text = "Items ("+data.length+")";
	loading.finish();
	return;
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

Ti.App.addEventListener('friends_items:refresh', refresh);

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('friends_items:refresh', refresh);
	$.destroy();
	console.log("window close");
});
