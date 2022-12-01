$(document).ready(function(){
	initJsGridPreset();
});

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
		height: "700px",

		inserting: false,
		editing: false,
		sorting: true,
		paging: false,
		autoload: true,

		rowClick: function(args){
			if(this.editing) {
				this.editItem($(args.event.target).closest("tr"));
			}
			
			var pcName = args.item.pc_name;

			openPsModal("EDIT", pcName);
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
			// insertItem: function (params) {
			// 	return $.ajax({
			// 		url : "/insertPresetConfigs",
			// 		data : params,
			// 		//dataType : "json",
			// 		type : "post",
			// 		async : false,
			// 		error : function(xhr, status, error) {
			// 			if(xhr.status == 401) {
			// 				alert(message_msg02);
			// 				top.location.href = "/";
			// 			} else if(xhr.status == 403) {
			// 				alert(message_msg03);
			// 				top.location.href = "/";
			// 			} else {
			// 				alert("ERROR CODE : "+ xhr.status+ "\n\n"+ "ERROR Message : "+ error+ "\n\n"+ "Error Detail : "+ xhr.responseText.replace(/(<([^>]+)>)/gi, ""));
			// 			}
			// 		},
			// 		beforeSend: function(xhr) {
			// 			xhr.setRequestHeader("AJAX", true);
			// 		 },
			// 		success : function(val) {
			// 			if(val.result==0){
			// 				alert("등록 실패");
			// 			}else{
			// 				alert("등록 완료");
			// 			}
			// 			gridRefresh(grid_name);
			// 		}
			// 	});
			// },
			// updateItem: function (params) {
			// 	return $.ajax({
			// 		url : "/updatePresetConfigs",
			// 		data : params,
			// 		// dataType : "json",
			// 		type : "post",
			// 		async : false,
			// 		error : function(xhr, status, error) {
			// 			if(xhr.status == 401) {
			// 				alert(message_msg02);
			// 				top.location.href = "/";
			// 			} else if(xhr.status == 403) {
			// 				alert(message_msg03);
			// 				top.location.href = "/";
			// 			} else {
			// 				alert("ERROR CODE : "+ xhr.status+ "\n\n"+ "ERROR Message : "+ error+ "\n\n"+ "Error Detail : "+ xhr.responseText.replace(/(<([^>]+)>)/gi, ""));
			// 			}
			// 		},
			// 		beforeSend: function(xhr) {
			// 			xhr.setRequestHeader("AJAX", true);
			// 		 },
			// 		success : function(val) {
			// 			if(val.result==0){
			// 				alert("수정 실패");
			// 			}else{
			// 				alert("수정 완료");
			// 			}
			// 			gridRefresh(grid_name);
			// 		}
			// 	});
			// },
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
			{
				type: "control",
				modeSwitchButton: false,
				editButton: false,
				headerTemplate: function () {
					return $("<button>").attr("type", "button").addClass("jsgrid-button jsgrid-mode-button jsgrid-insert-mode-button")
						.on("click", function () {
							openPsModal("ADD");
						});
				}
			},
			{ name: "pc_name", headtitle: "Name", type:"text", width: 80, align: "center" },
			{ name: "pc_description", headtitle: "Description", type: "textarea", width: 200, itemTemplate: function(value) {
				return $("<div>").addClass("text-truncate").text(value);
			} },
			{ name: "pc_config", headtitle: "Config JSON", type: "textarea", width: 200, validate: "required", itemTemplate: function(value) {
				return $("<div>").addClass("text-truncate").text(value);
			} },
			{ name: "active_dbs", headtitle: "Active DBs using config", width: 200, itemTemplate: hyperlinkItemTamplate },
			{ name: "pc_last_modified_on", headtitle: "Last modified", type: "text", width: 200, visible: false }
		]
	});

	$("#psModalFormSubmit").click(function() {
		var params = changeSnakeCase($("#psModalForm").serializeArray());
		var psModalMode = $("#psModalCategory").val();
		var requestUrls = (psModalMode ?? "") == "ADD" ? "/insertPresetConfigs" : ((psModalMode ?? "") == "EDIT" ? "/updatePresetConfigs" : "" ) ; 
		var returnMsg = (psModalMode ?? "") == "ADD" ? "등록" : ((psModalMode ?? "") == "EDIT" ? "수정" : "" ) ; 
		var grid = $("#jsGridPresetConfig").data("JSGrid");
		var data = grid.data;
		var tempObject = {};
		var tempObjectContent = {};

		$.each(data, function(i,v) {
			tempObjectContent[v.pc_metric] = Number(v.pc_time);
		});

		tempObject["name"] = "pc_config";
		tempObject["value"] = JSON.stringify(tempObjectContent);

		params.push(tempObject);
		

		$.ajax({
			url : requestUrls,
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
			success : function(result) {
				if(result.length==0){
					alert(returnMsg + " 실패");
				}else{
					alert(returnMsg + " 완료");

					gridRefresh("jsGridPreset");
					$("#psModal").modal('hide');
				}
			}
		});
	});

	// Modal Popup Open event
	$('#psModal').on('shown.bs.modal', function() {
		$("#jsGridPresetConfig").jsGrid("refresh");
	});
}

var initJsGridPresetConfig = function(params) {
	var data = params ?? [];

	$("#jsGridPresetConfig").jsGrid({
		width: "100%",
		height: "450px",
		
		data: data,

		inserting: true,
		editing: true,
		sorting: true,
		paging: false,
		autoload: true,

		rowClick: function(args){
			if(this.editing) {
				this.editItem($(args.event.target).closest("tr"));
			}
		},

		deleteConfirm: function(item) {
			return "\"" + item.pc_name + "\" 삭제하시겠습니까?";
		},

		// data: clients,
		fields: [
			{ type: "control" },
			{ name: "pc_metric", headtitle: "Matric", type:"text", width: 80, align: "center" },
			{ name: "pc_time", headtitle: "Collect Time(s)", type:"text", width: 80, align: "center" }
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

var openPsModal = function (category, name) {
	psModalMode = category;

	$("#psModalForm")[0].reset();
	$("#psModalCategory").val(category);

	$("#psModalAccordionFlush .accordion-item div").collapse('hide');

	if(category == "ADD"){
		$("#psModalTitle").text("Preset 등록");
		$("#psModalName").prop("readonly", false);
		$("#psModal").modal('show');
		
		initJsGridPresetConfig();
	}
	else if(category == "EDIT"){
		$("#psModalTitle").text("Preset 수정[ " + name + " ]");
		$("#psModalName").val(name);
		$("#psModalName").prop("readonly", true);
		selectPresetConfigsDetail(name);
	}
}

var selectPresetConfigsDetail = function(name) {
	$.ajax({
		url : "/selectPresetConfigsDetail",
		data : "pc_name=" + name,
		//dataType : "json",
		type : "get",
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
		success : function(result) {
			console.log(result);

			initModalPsForm(result);
		}
	});
}

var initModalPsForm = function(params) {
	$.each(params, function(i, data){
		var jsonData = data;
		var pcConfigData = JSON.parse(jsonData.pc_config);
		var configArr = [];
		
		$("#psModalName").val(jsonData.pc_name);
		$("#psModalPcDescription").val(jsonData.pc_description);

		$.each(pcConfigData, function(i, v){
			var name = i;
			var value = v;
			var tempJsonObject = {};

			tempJsonObject["pc_metric"] = i;
			tempJsonObject["pc_time"] = v;

			configArr.push(tempJsonObject);
		});

		initJsGridPresetConfig(configArr);
	});
	
	$("#psModal").modal('show');
	gridRefresh("jsGridPresetConfig");
}

var changeSnakeCase = function(params) {
	var changeArr = [];

	$.each(params, function(i, v) {
		var tempObject = {};
		var tempName = v.name;

		tempName = tempName.replace("psModal", "").replace(/([A-Z])/g, function(arg){
			            return "_"+arg.toLowerCase();
			    }).replace("_", "");

		tempObject['name'] = tempName;
		tempObject['value'] = v.value;
		changeArr.push(tempObject);
	});

	return changeArr;
}