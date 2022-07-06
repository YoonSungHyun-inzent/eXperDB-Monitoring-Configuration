$(document).ready(function(){
    initJsGridPreset();
	initJsGridMetricDefinitions();	

	$("#show_metrics_dialog").dialog({
		autoOpen: false,
		width: 400,
		close: function() {
		}
	});

	$("#copy_metrics_dialog").dialog({
		autoOpen: false,
		width: 400,
		close: function() {
			$("#copy_metrics_dialog_form").validate().resetForm();
			$("#copy_metrics_dialog_form").find(".error").removeClass("error");
		}
	});

	$("#copy_metrics_dialog_form").validate({
		rules: {
			name: "required",
			age: { required: true, range: [18, 150] },
			address: { required: true, minlength: 10 },
			country: "required"
		},
		messages: {
			name: "Please enter name",
			age: "Please enter valid age",
			address: "Please enter address (more than 10 chars)",
			country: "Please select country"
		},
		submitHandler: function() {
			formSubmitHandler();
		}
	});

    /**
     * tab set
     */
    $('.tabs').tabslet();

	$('.tabs').on("_after", function() {
		// do stuff here
		$("#" + $(this).find("div:visible > div").attr("id")).jsGrid("refresh");
	});
});

var initJsGridMetricDefinitions = function() {
	var grid_name = "jsGridMetricDefinitions";

    $("#jsGridMetricDefinitions").jsGrid({
		width: "100%",
		height: "600",

		inserting: true,
		editing: true,
		sorting: true,
		paging: false,
		autoload: true,

		// pageSize: 5,

		rowClick: function(args){
			if(this.editing) {
				this.editItem($(args.event.target).closest("tr"));
			}

			$("#copy_metrics_dialog").dialog("close");
		},

		deleteConfirm: function(item) {
			return "\"" + item.m_name + "\" 삭제하시겠습니까?";
		},

		onItemUpdated: function (args) {
			UpdateColPos(1);
		},
		onItemEditing: function (args) {
			setTimeout(function () { UpdateColPos(1); }, 1);
		},
		onRefreshed: function (args) {
			UpdateColPos(1);
		},

		controller: {
			loadData: function() {
				var d = $.Deferred();

				$.ajax({
					url: "/selectMetrics",
					type : "post",
					dataType: "json"
				}).done(function(response) {
					d.resolve(response);
				});

				return d.promise();
			},
			insertItem: function (params) {
				return $.ajax({
					url : "/insertMetric",
					data : params,
					//dataType : "json",
					type : "post",
					async : false,
					error : function(xhr, status, error) {
						if(xhr.status == 401) {
							alert(message_msg02);
							top.location.href = "/";
						} else if(xhr.status == 403) {
							alert(message_msg03);
							top.location.href = "/";
						} else {
							alert("ERROR CODE : "+ xhr.status+ "\n\n"+ "ERROR Message : "+ error+ "\n\n"+ "Error Detail : "+ xhr.responseText.replace(/(<([^>]+)>)/gi, ""));
						}
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("AJAX", true);
					 },
					success : function(val) {
						if(val.result==0){
							alert("등록 실패");
						}else{
							alert("등록 완료");
						}
						gridRefresh(grid_name);
					}
				});
			},
			updateItem: function (params) {
				return $.ajax({
					url : "/updateMetric",
					data : params,
					// dataType : "json",
					type : "post",
					async : false,
					error : function(xhr, status, error) {
						if(xhr.status == 401) {
							alert(message_msg02);
							top.location.href = "/";
						} else if(xhr.status == 403) {
							alert(message_msg03);
							top.location.href = "/";
						} else {
							alert("ERROR CODE : "+ xhr.status+ "\n\n"+ "ERROR Message : "+ error+ "\n\n"+ "Error Detail : "+ xhr.responseText.replace(/(<([^>]+)>)/gi, ""));
						}
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("AJAX", true);
					 },
					success : function(val) {
						if(val.result==0){
							alert("수정 실패");
						}else{
							alert("수정 완료");
						}
						gridRefresh(grid_name);
					}
				});
			},
			deleteItem: function (params) {
				return $.ajax({
					url : "/deleteMetric",
					data : params,
					// dataType : "json",
					type : "post",
					async : false,
					error : function(xhr, status, error) {
						if(xhr.status == 401) {
							alert(message_msg02);
							top.location.href = "/";
						} else if(xhr.status == 403) {
							alert(message_msg03);
							top.location.href = "/";
						} else {
							alert("ERROR CODE : "+ xhr.status+ "\n\n"+ "ERROR Message : "+ error+ "\n\n"+ "Error Detail : "+ xhr.responseText.replace(/(<([^>]+)>)/gi, ""));
						}
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("AJAX", true);
					 },
					success : function(val) {
						if(val.result==0){
							alert("삭제 실패");
						}else{
							alert("삭제 완료");
						}
						gridRefresh(grid_name);
					}
				});
			}
		},

		// data: clients,
		fields: [
			{ type: "control" },
			{ name: "m_id", width: 80, visible: false },
			{ name: "m_name", headtitle: "Metric", type: "text", width: 170 },
			{ name: "m_pg_version_from", headtitle: "PG ver", type: "text", width: 80 },
			{ name: "m_sql", headtitle: "SQL", type: "textarea", width: 400, itemTemplate: function(value) {
				return $("<div>").addClass("sql").text(value);
			} },
			{ name: "m_sql_su", headtitle: "Privileged SQL", type: "textarea", width: 400, itemTemplate: function(value) {
				return $("<div>").addClass("sql").text(value);
			} },
			{ name: "m_comment", headtitle: "Comment", type: "text", width: 400 },
			{ name: "m_is_active", headtitle: "Is active?", type: "checkbox", width: 80 },
			{ name: "m_is_helper", headtitle: "Is helper?", type: "checkbox", width: 80 },
			{ name: "m_master_only", headtitle: "Master only?", type: "checkbox", width: 80, editTemplate: checkboxTemplate },
			{ name: "m_standby_only", headtitle: "Standby only?", type: "checkbox", width: 80, editTemplate: checkboxTemplate },
			{ name: "ma_metric_attrs", headtitle: "Metric attributes", type: "textarea", width: 400 },
			{ name: "m_column_attrs", headtitle: "Column attributes", type: "textarea", width: 400 },
            { name: "m_last_modified_on", headtitle: "Last modified", type: "text", width: 200, visible: false }
		]
	});

	/**
	 * jsgrid scroll
	 */
	 $('#jsGridMetricDefinitions .jsgrid-grid-body').scroll(function () {
		UpdateColPos(1);
	});

}

var UpdateColPos = function(cols) {
	var left = $('#jsGridMetricDefinitions .jsgrid-grid-body').scrollLeft() < $('#jsGridMetricDefinitions .jsgrid-grid-body .jsgrid-table').width() - $('#jsGridMetricDefinitions .jsgrid-grid-body').width() + 16
		? $('#jsGridMetricDefinitions .jsgrid-grid-body').scrollLeft() : $('#jsGridMetricDefinitions .jsgrid-grid-body .jsgrid-table').width() - $('#jsGridMetricDefinitions .jsgrid-grid-body').width() + 16;
	$('#jsGridMetricDefinitions .jsgrid-header-row th:nth-child(-n+' + cols + '), #jsGridMetricDefinitions .jsgrid-filter-row td:nth-child(-n+' + cols + '), #jsGridMetricDefinitions .jsgrid-insert-row td:nth-child(-n+' + cols + '), #jsGridMetricDefinitions .jsgrid-grid-body tr td:nth-child(-n+' + cols + ')')
		.css({
			"position": "relative",
			"left": left
		});
}


var initJsGridPreset = function() {
	var grid_name = "jsGridPreset";

    $("#jsGridPreset").jsGrid({
		width: "100%",
		height: "600",

		inserting: true,
		editing: true,
		sorting: true,
		paging: false,
		autoload: true,

		rowClick: function(args){
			if(this.editing) {
				this.editItem($(args.event.target).closest("tr"));
			}

			$("#copy_metrics_dialog").dialog("close");
		},

		deleteConfirm: function(item) {
			return "\"" + item.pc_name + "\" 삭제하시겠습니까?";
		},

		controller: {
			loadData: function() {
				var d = $.Deferred();

				$.ajax({
					url: "/selectPresetConfigs",
					type : "post",
					dataType: "json"
				}).done(function(response) {
					d.resolve(response);
				});

				return d.promise();
			},
			insertItem: function (params) {
				return $.ajax({
					url : "/insertPresetConfigs",
					data : params,
					//dataType : "json",
					type : "post",
					async : false,
					error : function(xhr, status, error) {
						if(xhr.status == 401) {
							alert(message_msg02);
							top.location.href = "/";
						} else if(xhr.status == 403) {
							alert(message_msg03);
							top.location.href = "/";
						} else {
							alert("ERROR CODE : "+ xhr.status+ "\n\n"+ "ERROR Message : "+ error+ "\n\n"+ "Error Detail : "+ xhr.responseText.replace(/(<([^>]+)>)/gi, ""));
						}
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("AJAX", true);
					 },
					success : function(val) {
						if(val.result==0){
							alert("등록 실패");
						}else{
							alert("등록 완료");
						}
						gridRefresh(grid_name);
					}
				});
			},
			updateItem: function (params) {
				return $.ajax({
					url : "/updatePresetConfigs",
					data : params,
					// dataType : "json",
					type : "post",
					async : false,
					error : function(xhr, status, error) {
						if(xhr.status == 401) {
							alert(message_msg02);
							top.location.href = "/";
						} else if(xhr.status == 403) {
							alert(message_msg03);
							top.location.href = "/";
						} else {
							alert("ERROR CODE : "+ xhr.status+ "\n\n"+ "ERROR Message : "+ error+ "\n\n"+ "Error Detail : "+ xhr.responseText.replace(/(<([^>]+)>)/gi, ""));
						}
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("AJAX", true);
					 },
					success : function(val) {
						if(val.result==0){
							alert("수정 실패");
						}else{
							alert("수정 완료");
						}
						gridRefresh(grid_name);
					}
				});
			},
			deleteItem: function (params) {
				return $.ajax({
					url : "/deletePresetConfigs",
					data : params,
					// dataType : "json",
					type : "post",
					async : false,
					error : function(xhr, status, error) {
						if(xhr.status == 401) {
							alert(message_msg02);
							top.location.href = "/";
						} else if(xhr.status == 403) {
							alert(message_msg03);
							top.location.href = "/";
						} else {
							alert("ERROR CODE : "+ xhr.status+ "\n\n"+ "ERROR Message : "+ error+ "\n\n"+ "Error Detail : "+ xhr.responseText.replace(/(<([^>]+)>)/gi, ""));
						}
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("AJAX", true);
					 },
					success : function(val) {
						if(val.result==0){
							alert("삭제 실패");
						}else{
							alert("삭제 완료");
						}
						gridRefresh(grid_name);
					}
				});
			}
		},

		// data: clients,
		fields: [
			{ type: "control" },
			{ name: "pc_name", headtitle: "Name", type:"text", width: 80, align: "center" },
			{ name: "pc_description", headtitle: "Description", type: "textarea", width: 200, itemTemplate: function(value) {
				return $("<div>").addClass("sql").text(value);
			} },
			{ name: "pc_config", headtitle: "Config JSON", type: "textarea", width: 200, validate: "required", itemTemplate: function(value) {
				return $("<div>").addClass("sql").text(value);
			} },
			{ name: "active_dbs", headtitle: "Active DBs using config", width: 200, itemTemplate: hyperlinkItemTamplate },
            { name: "pc_last_modified_on", headtitle: "Last modified", type: "text", width: 200, visible: false }
		]
	});
}

var hyperlinkItemTamplate = function(value, item){
    var $link = $("<a>").attr("href", "/dbs").text(item.active_dbs);
    return $("<div>").append($link);
}

var gridRefresh = function(grid_name){
	$("#" + grid_name).jsGrid("option", "inserting", false);
	$("#" + grid_name).jsGrid("loadData");
	$("#" + grid_name + " > .jsgrid-grid-body").scrollTop(0);
	$("#" + grid_name + " > .jsgrid-grid-body").scrollLeft(0);
}

var checkboxTemplate = function(value, item){
	var $check = jsGrid.fields.checkbox.prototype.editTemplate.call(this);
	var grid = this._grid;

	$check.on("change", function() {
		// your handler here
		if(grid.option('fields')[9].editControl.prop("checked") && grid.option('fields')[10].editControl.prop("checked")){
			alert("Master 또는 Standby 중 하나만 선택해주세요.");
			grid.option('fields')[9].editControl.prop("checked", false);
			grid.option('fields')[10].editControl.prop("checked", false);
		}
	});
	return $check;
}