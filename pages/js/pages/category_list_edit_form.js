"use strict";

var categoryEditForm = {
	view:"form",
    id:"categoryEditForm",
	borderless:true,
	elements: [
        { "view": "text", "label": "Наименование", "name": "categoryName" },
		{
			"cols": [
				{ "label": "Это группа", "view": "checkbox", "name": "isGroup" },
				{ "label": "Видимость", "view": "checkbox", "name": "isVisible" },
				{ "view": "text", "label": "Сортировка", "name": "sort" }
			]
		},
		{
			"label": "Направление движений",
			"value": "Расход",
			"options": [
				"Доход",
				"Расход"
			],
			"view": "radio",
			"name": "plusOrMinus",
			"width": 0
		},
		{ "icon": "wxi-download", "view": "icon", "width": 0 },
		{
			"cols": [
				{ "view": "button", "label": "Записать", "click":function() { modalForm_OnSave(this); } },
				{ "view": "button", "label": "Отмена", "click":function() { this.getTopParentView().hide(); } }
			]
		}
	],
	rules:{
		"categoryName":webix.rules.isNotEmpty,
		"plusOrMinus":webix.rules.isNotEmpty,
		"sort":webix.rules.isNumber
	},
	elementsConfig:{
		labelPosition:"top"
	}
};

function showForm(winId, categoryId, categoryParentId) {

    let win = $$(winId);
    let formView = win.getBody();

    formView.clear();

    formView.setValues(
        {
            "categoryId": categoryId
            ,"categoryParentId": categoryParentId
        }
    );

    win.show();
    formView.focus();

    //let formView = frm.getFormView();
}

function modalForm_OnSave(frm) {
    let formView = frm.getFormView();
	if (formView.validate()) {
		let result = try_http_post(THIS_APP_URL + "/cmd/entity.category_merge", formView.getValues());
        if (result != false) {
            this.getTopParentView().hide();
        }
	}
	else {
		webix.message({ type:"error", text:"Пожалуйста проверьте значения." });
	}
}
