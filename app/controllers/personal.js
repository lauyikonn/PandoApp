var args = arguments[0] || {};
var u_id = Ti.App.Properties.getString('user_id');
var items = Alloy.createCollection("items");
var loading = Alloy.createController("loading");
var data;
var match_data;
var status = ["Active", "Waiting for receive", "Banned", "Removed", "TRANSACTION SUCCESS"];

/**
 * Closes the Window
 */
function closeWindow(){
	$.win.close();
}

/**
 * Navigate to Upload New Item
 */
function navToPersonalUpload(e){
	Alloy.Globals.Navigator.open("personal_upload");
}


/**
 * Navigate to Conversation by u_id
 */
function navToConversation(e){
	var f_id = parent({name: "f_id"}, e.source);
	var id = parent({name: "id"}, e.source);
	console.log(f_id+" "+id);
	Alloy.Globals.Navigator.open("conversation", {f_id: f_id, id: id});
}


/**
 * Navigate to Waiting List by item_id
 */
function navToWaitingList(e){
	var item_response_id = parent({name: "item_response_id"}, e.source);
	Alloy.Globals.Navigator.open("personal_waiting_list", {id: item_response_id});
}
/*
 	render waiting list
 * */
function render_waiting_list(){
	var view_title_waiting = $.UI.create("View", {
		classes:['wfill'],
		backgroundColor: "#f1f5f7",
		height: 40
	});
	var label_title = $.UI.create("Label", {
		classes:['h5','wfill','hsize','padding'],
		text: "ITEMS(S) WAITING TO BE PAIRED",
		color: "#2eafa8"
	});
	view_title_waiting.add(label_title);
	var tblsec_waiting_list = $.UI.create("TableViewSection", {
		headerView: view_title_waiting
	});
	
	for (var i=0; i < data.length; i++) {
		var tableviewrow = $.UI.create("TableViewRow",{});
		var view_container = $.UI.create("View",{
			classes: ['wfill', 'horz'],
			height: 70,
			backgroundColor: "#ffffff",
			item_response_id: data[i].id
		});
		var view_indicator = $.UI.create("View", {
			classes: ['indicator_yellow']
		});
		var imageView_item_thumb = $.UI.create("ImageView",{
			
			width: 70,
			height: 70,
			defaultImage: "/images/default/small_item.png",
			image: data[i].img_path
		});
		
		var view_horz_div = $.UI.create("View",{
			classes: ['horz_div']
		});
		
		var view_info_box = $.UI.create("View",{
			classes: ['hfill', 'vert', 'padding'],
			width: "auto"
		});
		var total = data[i].total || 0;
		
		var label_item_name = $.UI.create("Label",{
			classes:['h5','wfill','hsize'],
			textAlign: "left",
			text: data[i].item_name
		});
		
		var label_number_unread = $.UI.create("Label",{
			classes:['h6','wfill','hsize', 'font_light_grey'],
			textAlign: "left",
			text: total+" people interest on it"
		});
		
		view_info_box.add(label_item_name);
		view_info_box.add(label_number_unread);
		
		view_container.add(imageView_item_thumb);
		//view_container.add(view_indicator);
		view_container.add(view_horz_div);
		view_container.add(view_info_box);
		
		tableviewrow.add(view_container);
		tblsec_waiting_list.add(tableviewrow);
		
		view_container.addEventListener("click", navToWaitingList);
	};
	
	var view_title_waiting2 = $.UI.create("View", {
		classes:['wfill'],
		backgroundColor: "#f1f5f7",
		height: 40
	});
	var label_title2 = $.UI.create("Label", {
		classes:['h5','wfill','hsize', 'padding'],
		text: "ITEM(S) WAITING TO PICKUP",
		color: "#2eafa8"
	});
	view_title_waiting2.add(label_title2);
	//matching List
	var tblsec_matching_list = $.UI.create("TableViewSection", {
		headerView: view_title_waiting2,
	});
	
	for (var i=0; i < match_data.length; i++) {
		var tableviewrow = $.UI.create("TableViewRow",{});
		var view_container = $.UI.create("View",{
			classes: ['wfill', 'horz'],
			height: 70,
			backgroundColor: "#ffffff",
			f_id: match_data[i].receiver_id,
			id: match_data[i].id
		});
		
		var view_indicator = $.UI.create("View", {
			classes: ['indicator_green']
		});
		
		var imageView_item_thumb = $.UI.create("ImageView",{
			
			width: 70,
			height: 70,
			defaultImage: "/images/default/small_item.png",
			image: match_data[i].img_path
		});
		
		var view_horz_div = $.UI.create("View",{
			classes: ['horz_div']
		});
		
		var view_info_box = $.UI.create("View",{
			classes: ['hsize', 'vert', 'padding'],
			width: "auto"
		});
		var total = match_data[i].total || 0;
		
		var label_item_name = $.UI.create("Label",{
			classes:['h5','wfill','hsize'],
			textAlign: "left",
			text: match_data[i].item_name
		});
		
		var label_receiver_name = $.UI.create("Label",{
			classes:['h5','wfill','hsize'],
			textAlign: "left",
			text: match_data[i].receiver_name
		});
		
		var label_number_unread = $.UI.create("Label",{
			classes:['h6','wfill','hsize','font_light_grey'],
			textAlign: "left",
			text: status[match_data[i].status-1]
		});
		
		view_info_box.add(label_item_name);
		view_info_box.add(label_receiver_name);
		view_info_box.add(label_number_unread);
		
		view_container.add(imageView_item_thumb);
		//view_container.add(view_indicator);
		view_container.add(view_horz_div);
		view_container.add(view_info_box);
		
		tableviewrow.add(view_container);
		tblsec_matching_list.add(tableviewrow);
		view_container.addEventListener("click", navToConversation);
	};
	$.tblview.setData([tblsec_waiting_list, tblsec_matching_list]);
}

/*
 	Sync data from server
 * */
function getItemList(callback){
	var checker = Alloy.createCollection('updateChecker'); 
	var isUpdate = checker.getCheckerById(1);
	var last_updated = isUpdate.updated || "";

	API.callByPost({url:"getItemListUrl", params: {last_updated: last_updated}}, function(responseText){
		var model = Alloy.createCollection("items");
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		model.saveArray(arr);
		checker.updateModule(1,"items", Common.now());
		callback && callback();
	});
}

function getItemResponseList(callback){
	var checker = Alloy.createCollection('updateChecker'); 
	var u_id = Ti.App.Properties.getString('user_id');
	
	var isUpdate = checker.getCheckerById(2, u_id);
	var last_updated = isUpdate.updated || "";
	
	API.callByPost({url:"getItemResponseByUidUrl", params: {last_updated: "", u_id: u_id}}, function(responseText){
		var model = Alloy.createCollection("item_response");
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		model.saveArray(arr);
		checker.updateModule(2,"item_response", Common.now(), u_id);
		callback && callback();
	});
}
/*
 refresh
 * */
function refresh(){
	loading.start();
	getItemList(function(){
		getItemResponseList(function(){
			var model =  Alloy.createCollection("items");;
			data = model.getWaitingDataByOwner();
			match_data = model.getMatchingDataByOwner();
			render_waiting_list();
			loading.finish();
		});
	});
}

function init(){
	$.win.add(loading.getView());
	refresh();
}

init();

Ti.App.addEventListener('personal:refresh',refresh);

$.win.addEventListener("close", function(){
	$.destroy();
	console.log("window close");
	Ti.App.removeEventListener('personal:refresh',refresh);
});
