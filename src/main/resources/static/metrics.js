$(document).ready(function(){
	initJsGridMetricDefinitions();	
});

var initJsGridMetricDefinitions = function() {
	var grid_name = "jsGridMetricDefinitions";

	$("#jsGridMetricDefinitions").jsGrid({
		width: "100%",
		height: "600",

		inserting: false,
		editing: false,
		sorting: true,
		paging: false,
		autoload: true,

		filtering: true,

		// pageSize: 5,

		rowClick: function(args){
			if(this.editing) {
				this.editItem($(args.event.target).closest("tr"));
			}
			
			var mId = args.item.m_id;

			openMsModal("EDIT", mId);
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
			loadData: function(filter) {
				var d = $.Deferred();

				$.ajax({
					url: "/metric",
					type : "get",
					dataType: "json",
					data: filter
				}).done(function(response) {
					d.resolve(response);
				});

				return d.promise();
			},
			// insertItem: function (params) {
			// 	return $.ajax({
			// 		url : "/metric",
			// 		data : params,
			// 		dataType : "json",
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
			// 		url : "/metric",
			// 		data : params,
			// 		dataType : "json",
			// 		type : "put",
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
					url : "/metric",
					data : params,
					dataType : "json",
					type : "delete",
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
							openMsModal("ADD");
						});
				}
			},
			{ name: "m_id", width: 80, visible: false },
			{ name: "m_name", headtitle: "Metric", type: "text", width: 170 },
			{ name: "m_pg_version_from", headtitle: "PG ver", type: "text", width: 80 },
			{ name: "m_sql", headtitle: "SQL", type: "textarea", width: 200, itemTemplate: function(value) {
				return $("<div>").addClass("text-truncate").text(value);
			} },
			{ name: "m_sql_su", headtitle: "Privileged SQL", type: "textarea", width: 200, itemTemplate: function(value) {
				return $("<div>").addClass("text-truncate").text(value);
			} },
			{ name: "m_comment", headtitle: "Comment", type: "text", width: 200 },
			// { name: "m_is_active", headtitle: "Is active?", type: "checkbox", width: 80 },
			// { name: "m_is_helper", headtitle: "Is helper?", type: "checkbox", width: 80 },
			// { name: "m_master_only", headtitle: "Master only?", type: "checkbox", width: 80 },
			// { name: "m_standby_only", headtitle: "Standby only?", type: "checkbox", width: 80 },
			// { name: "ma_metric_attrs", headtitle: "Metric attributes", type: "textarea", width: 400 },
			// { name: "m_column_attrs", headtitle: "Column attributes", type: "textarea", width: 400 },
			{ name: "m_last_modified_on", headtitle: "Last modified", type: "text", width: 200, visible: false }
		]
	});

	/**
	 * jsgrid scroll
	 */
	 $('#jsGridMetricDefinitions .jsgrid-grid-body').scroll(function () {
		UpdateColPos(1);
	});

	$("#msModalFormSubmit").click(function() {
		var params = changeSnakeCase($("#msModalForm").serializeArray());
		var msModalMode = $("#msModalCategory").val();
		var requestType = (msModalMode ?? "") == "ADD" ? "POST" : ((msModalMode ?? "") == "EDIT" ? "PUT" : "" ) ; 
		var returnMsg = (msModalMode ?? "") == "ADD" ? "등록" : ((msModalMode ?? "") == "EDIT" ? "수정" : "" ) ; 

		$.each($("#msModalForm [type=checkbox]"), function(i, v){
			var tempName = v.id;
			var tempValue = v.checked;

			tempName = tempName.replace("msModal", "").replace(/([A-Z])/g, function(arg){
				            return "_"+arg.toLowerCase();
				    }).replace("_", "");

			params.push({name:tempName, value:tempValue});
		});

		$.ajax({
			url : "/metric",
			data : params,
			dataType : "json",
			type : requestType,
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

					gridRefresh("jsGridMetricDefinitions");
					$("#msModal").modal('hide');
				}
			}
		});
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

var gridRefresh = function(grid_name){
	$("#" + grid_name).jsGrid("option", "inserting", false);
	$("#" + grid_name).jsGrid("loadData");
	$("#" + grid_name + " > .jsgrid-grid-body").scrollTop(0);
	$("#" + grid_name + " > .jsgrid-grid-body").scrollLeft(0);
}

var openMsModal = function (category, id) {
	msModalMode = category;

	$("#msModalForm")[0].reset();
	$("#msModalCategory").val(category);

	if(category == "ADD"){
		$("#msModalTitle").text("Metrics 등록");
		$("#msModalMName").prop("readonly", false);
		$("#msModal").modal('show');
	}
	else if(category == "EDIT"){
		$("#msModalTitle").text("Metrics 수정");
		$("#msModalMId").val(id);
		$("#msModalMName").prop("readonly", true);
		selectMetricsDetail(id);
	}
}

var selectMetricsDetail = function(id) {
	$.ajax({
		url : "/metric/" + id,
		// data : "m_id=" + id,
		dataType : "json",
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

			initModalMsForm(result);
		}
	});
}

var initModalMsForm = function(params) {
	$.each(params, function(i, data){
		var jsonData = data;
	
		$("#msModalMName").val(jsonData.m_name);
		$("#msModalPgVersion").val(jsonData.m_pg_version_from);
		
		$("#msModalMSql").val(jsonData.m_sql);
		$("#msModalMSqlSu").val(jsonData.m_sql_su);
		$("#msModalMComment").val(jsonData.m_comment);
		$("#msModalMColumnAttrs").val(jsonData.m_column_attrs);
		$("#msModalMaMetricAttrs").val(jsonData.ma_metric_attrs);

		$("#msModalMIsActive").prop("checked", jsonData.m_is_active);
		$("#msModalMIsHelper").prop("checked", jsonData.m_is_helper);
		$("#msModalMMasterOnly").prop("checked", jsonData.m_master_only);
		$("#msModalMStandbyOnly").prop("checked", jsonData.m_standby_only);
	});

	$("#msModal").modal('show');
}

var changeSnakeCase = function(params) {
	var changeArr = [];

	$.each(params, function(i, v) {
		var tempObject = {};
		var tempName = v.name;

		tempName = tempName.replace("msModal", "").replace(/([A-Z])/g, function(arg){
			            return "_"+arg.toLowerCase();
			    }).replace("_", "");

		tempObject['name'] = tempName;
		tempObject['value'] = v.value;
		changeArr.push(tempObject);
	});

	return changeArr;
}