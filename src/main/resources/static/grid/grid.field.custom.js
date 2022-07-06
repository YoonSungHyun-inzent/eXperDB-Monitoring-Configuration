var jsGridCustumFields = {
	password : function(config) {
		jsGrid.Field.call(this, config);
	},
	select_custom_link : function(config) {
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

jsGridCustumFields.select_custom_link.prototype = new jsGrid.Field({
	items: [],
	textField: "",
	
	itemTemplate: function(value) {
		return $.makeArray(value).join(", ");
	},
	
	_createSelect: function(selected) {
		var textField = this.textField;
		var $result = $("<select>");

		grid.fieldOption("myGridField", "visible", true);
		
		$.each(this.items, function(_, item) {
			var value = item[textField];
			var $opt = $("<option>").text(value);
			
			if($.inArray(value, selected) > -1) {
				$opt.attr("selected", "selected");
			}
			
			$result.append($opt);
		});

		return $result;
	},
	
	insertTemplate: function() {
		var insertControl = this._insertControl = this._createSelect();

		return insertControl;
	},
	
	editTemplate: function(value) {
		var editControl = this._editControl = this._createSelect(value);

		return editControl;
	},
	
	insertValue: function() {
		return this._insertControl.find("option:selected").map(function() {    
			return this.selected ? $(this).text() : null;
		});
	},
	
	editValue: function() {
		return this._editControl.find("option:selected").map(function() {    
			return this.selected ? $(this).text() : null;
		});
	}
});

jsGrid.fields.password = jsGridCustumFields.password;
jsGrid.fields.select_custom_link = jsGridCustumFields.select_custom_link;