"use strict";

const categoryListView = {
	"rows": [
		{
			"css": "webix_dark",
			"view": "toolbar",
			"cols": [
				{
					"view": "button",
					"type": "icon",
					"icon": "wxi-angle-double-left",
					"label": "",
					"height": 0,
					"name": "btnGotoDesktop",
					"width": 38,
					"click": function(){
						document.location.href = "desktop.html";
					}
				},
				{
					"view": "button",
					"type": "icon",
					"icon": "wxi-plus",
					"label": "",
					"height": 0,
					"name": "btnCategoryAdd",
					"width": 38,
					"click": function(){
						showForm("categoryEditWindow", 0, 0)
					}
				},
				{
					"view": "button",
					"type": "icon",
					"icon": "wxi-pencil",
					"label": "",
					"height": 0,
					"name": "btnCategoryEdit",
					"width": 38,
					"click": function(){
						showForm("categoryEditWindow", 0, 0)
					}
				},
				{
					"view": "button",
					"type": "icon",
					"icon": "wxi-trash",
					"label": "",
					"height": 0,
					"name": "btnCategoryDel",
					"width": 38,
					"click": function(){
						webix.confirm({
							title:"Внимание!",
							type:"confirm-warning",
							text:"Вы уверены, что хотите удалить категорию?"
						})
						.then(function(){
							alert("trash!");
						});
					}
				},
				{ "view": "label", "label": "Категории", "align": "center" }
			]
		},
		{
			"url": "cmd/entity.category_list",
			"scrollX": false,
            //autoConfig:true,
			"columns": [
				{ "id": "category_id"   , "header": "ИД", "width":50 },
                {
                    "id": "category_name" ,
                    "header": "Наименование",
                    "fillspace": true,
                    "template": "{common.treetable()} #category_name#"
                },
                { "id": "img_url"       , "header": "Значок", "fillspace": true },
                { "id": "inout_sign"    , "header": "Знак операции"},
                { "id": "sort"          , "header": "Сортировка"},
                { "id": "visible"       , "header": "Видимость"}
			],
			"view": "treetable"
		}
	]
};

window.onload = function() {
	webix.ready(function(){
		webix.ui(categoryListView);
		webix.ui({
		    view:"window",
		    id:"categoryEditWindow",
		    width:400,
		    position:"center",
		    modal:true,
		    head:"Редактируем группу",
		    body:webix.copy(categoryEditForm)
		});
	});
}
