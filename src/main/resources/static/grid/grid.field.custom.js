var jsGridCustumFields = {
	password : function(config) {
		jsGrid.Field.call(this, config);
	},
	select_custom_shift : function(config) {
		jsGrid.Field.call(this, config);
	}
};

jsGridCustumFields.password.prototype = new jsGrid.Field({
	sorter: function (pass1, pass2) {
              
		if (pass1 < pass2) {
			return -1;
		} else if (pass1 > pass2) {
			return  1;
		} else {
			return 0;
		}
	},

	itemTemplate: function (value) {
		return "<input type='password' value='***'  style='border:none;background:transparent;' >";
	},

	insertTemplate: function (value) {
		return this._insertPicker = $("<input type='password'  >");

	},

	editTemplate: function (value) {
		return this._editPicker = $("<input type='password' >");

	},

	insertValue: function () {
		return this._insertPicker.val();

	},

	editValue: function () {
		return this._editPicker.val();

	}
});

jsGridCustumFields.select_custom_shift.prototype = new jsGrid.Field({
	items: [],
	textField: "",
	
	itemTemplate: function(value) {
		return value;
	},
	
	insertTemplate: function() {
		var insertControl = this.insertControl = this._createSelect();

		return this.insertControl = this._createSelect();
	},
	
	editTemplate: function(value, items) {
		var editControl = this._editControl = this._createSelect(items);
		
		return editControl;
	},
	
	insertValue: function() {
		return this.insertControl.val();
	},
	
	editValue: function() {
		return this._editControl.val();
	},

	_createSelect: function(selected) {
		var valueField = this.valueField;
		var seletedHostName = (selected ?? "") != "" ? selected.md_hostname : "";
		var seletedItemUh = (selected ?? "") != "" ? selected.ms_upstream_hostname : "";
		var $result = $("<select>");
	
		$.each(this.items, function(_, item) {
			var value = item[valueField];
			var $opt = $("<option>").text(value).attr("value", value);
	
			if(seletedHostName != value || seletedHostName == "") {
				$result.append($opt);
				
				$opt.prop("selected", (seletedItemUh === value));
			}
		});
	
		return $result;
	},
});

jsGrid.fields.password = jsGridCustumFields.password;
jsGrid.fields.select_custom_shift = jsGridCustumFields.select_custom_shift;