var args = arguments[0] || {};
var loading = Alloy.createController("loading");
/**
 * Navigate to Conversation by u_id
 */
function navToFriendItem(e){
	var f_id = parent({name: "f_id"}, e.source);
	Alloy.Globals.Navigator.open("friends_items", {f_id: f_id});
}

function render_category_menu(){
	var model =  Alloy.createCollection("category");
	data = model.getData();
	var category_list = [];
	
	for (var i=0; i < data.length; i++) {
		console.log(data[i]);
		var view_container = $.UI.create("View",{
			classes: ['hsize'],
			width: "50%",
			backgroundColor: "#ffffff",
			item_category: data[i].c_name
		});
		
		var imageView_item_thumb = $.UI.create("ImageView",{
			classes: ['wfill'],
			height: "auto",
			defaultImage: "/images/default/item.png",
			image: data[i].img_path || "/images/default/item.png"
		});
		
		var view_info_box = $.UI.create("View",{
			classes: ['hsize', 'wfill'],
			top:0,
			backgroundImage: "/images/bg/bg_matt_2.png"
		});
		
		var label_item_name = $.UI.create("Label",{
			classes:['h5','wfill','hsize', 'padding'],
			textAlign: "left",
			color: "#fff",
			text: data[i].c_name
		});
		
		view_info_box.add(label_item_name);
		view_container.add(imageView_item_thumb);
		//view_container.add(view_indicator);
		view_container.add(view_info_box);
		view_container.addEventListener("click", setFilter);
		$.inner_box.add(view_container);
	};
}

function setFilter(e){
	var category_type = parent({name: "item_category"},e.source);
	console.log(category_type);
	Ti.App.Properties.setString('category_type', category_type);
	Ti.App.fireEvent('home:refresh');
	closeWindow();
}

function doSearch(e){
	Ti.App.Properties.setString('category_keyword', e.value);
	Ti.App.fireEvent('home:refresh');
	closeWindow();
}
/*
 	Sync data from server
 * */
function getCategory(callback){
	var checker = Alloy.createCollection('updateChecker'); 
	var isUpdate = checker.getCheckerById(4);
	var last_updated = isUpdate.updated || "";

	API.callByPost({url:"getCategoryListUrl", params: {last_updated: last_updated}}, function(responseText){
		var model = Alloy.createCollection("category");
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		model.saveArray(arr);
		checker.updateModule(4, "getCategoryList", Common.now());
		callback && callback();
	});
}

/*
 	Refresh
 * */
function refresh(){
	loading.start();
	getCategory(function(){
		render_category_menu();
		loading.finish();
	});
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

$.searchbar.addEventListener("return", doSearch);

Ti.App.addEventListener('search:refresh',refresh);

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('search:refresh',refresh);
	$.destroy();
	console.log("window close");
});
