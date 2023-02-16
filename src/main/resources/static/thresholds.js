$(document).ready(function(){
	initJsGridThreshold();
});

// var UpdateColPos = function(cols) {
// 	var left = $('#jsGridMetricDefinitions .jsgrid-grid-body').scrollLeft() < $('#jsGridMetricDefinitions .jsgrid-grid-body .jsgrid-table').width() - $('#jsGridMetricDefinitions .jsgrid-grid-body').width() + 16
// 		? $('#jsGridMetricDefinitions .jsgrid-grid-body').scrollLeft() : $('#jsGridMetricDefinitions .jsgrid-grid-body .jsgrid-table').width() - $('#jsGridMetricDefinitions .jsgrid-grid-body').width() + 16;
// 	$('#jsGridMetricDefinitions .jsgrid-header-row th:nth-child(-n+' + cols + '), #jsGridMetricDefinitions .jsgrid-filter-row td:nth-child(-n+' + cols + '), #jsGridMetricDefinitions .jsgrid-insert-row td:nth-child(-n+' + cols + '), #jsGridMetricDefinitions .jsgrid-grid-body tr td:nth-child(-n+' + cols + ')')
// 		.css({
// 			"position": "relative",
// 			"left": left
// 		});
// }
var tableData= new Array();

function overlapCheck(value) { 
	for (let i = 0; i < tableData.length; i++) {
		if(tableData[i].stat_name == value){
			return 1;
		}else{
			
		}
	}
}


var initJsGridThreshold = function() {
	
	var condition_sel = [
		{name: ">=", value: ">="},
		{name: "<=", value: "<="},
		{name: "=", value: "="},
	];
	var stat_name_sel = [
		{name: "Active Count", value: "Active Count"},
		{name: "Lock Wait Count", value: "Lock Wait Count"},
		{name: "User Connection", value: "User Connection"},
		{name: "Elapsed Time/Job/Session", value: "Elapsed Time/Job/Session"},
		{name: "Elapsed Time/Queue/Session", value: "Elapsed Time/Queue/Session"},
		{name: "Elapsed Time/Queue/SqlText", value: "Elapsed Time/Queue/SqlText"},
		{name: "Job failure count CloudWatch", value: "Job failure count CloudWatch"},
		{name: "Job failure count Stat", value: "Job failure count Stat"},
		{name: "Job failure count UserStat", value: "Job failure count UserStat"},
		{name: "Lock Count", value: "Lock Count"},
		{name: "Lock Wait Count", value: "Lock Wait Count"},
		{name: "Waiting_Count", value: "Waiting Count"},
		{name: "blk read time", value: "blk read time"},
		{name: "blk write time", value: "blk write time"},
		{name: "blks_hit", value: "blks_hit"},
		{name: "blks_read", value: "blks_read"},
		{name: "conflicts", value: "conflicts"},
		{name: "deadlocks", value: "deadlocks"},
		{name: "numbackends", value: "numbackends"},
		{name: "stats_reset", value: "stats_reset"},
		{name: "temp_bytes", value: "temp_bytes"},
		{name: "temp_files", value: "temp_files"},
		{name: "tup_deleted", value: "tup_deleted"},
		{name: "tup_fetched", value: "tup_fetched"},
		{name: "tup_inserted", value: "tup_inserted"},
		{name: "tup_returned", value: "tup_returned"},
		{name: "tup_updated", value: "tup_updated"},
		{name: "xact_commit", value: "xact_commit"},
		{name: "xact_rollback", value: "xact_rollback"},
	];
	var Use_YN = [
		{name: "Y", value: "Y"},
		{name: "N", value: "N"},
	];
	var Machine_type=[
		{name:"NORMAL",value:"NORMAL"},
		{name:"AWS_EC2",value:"AWS_EC2"},
		{name:"AWS_RDS",value:"AWS_RDS"},
		{name:"EXADATA",value:"EXADATA"},
	]

	$("#serverMgmt").jsGrid({
		width: "30%",
		height: "700px",
		inserting:true,
		editing: true,
		sorting: true,
		paging: true,
		autoload: true,

		rowClick: function(args){
			if(this.editing) {
				this.editItem($(args.event.target).closest("tr"));
			}
		},

		controller: {
			loadData: function() {
				var d = $.Deferred();
				$.ajax({
					url: "/selectServerMgmt",
					type : "post",
					dataType: "json"
				}).done(function(response) {
					d.resolve(response);
					tableData=response;
				});
				return d.promise();
			},
			
			insertItem: function (params) {	
				if(overlapCheck(params.machine_type)){
					alert('중복된 값이 존재합니다.');	
					
				}else{
					return $.ajax({
						url : "/insertServerMgmt",
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
								alert("등록 실패");
							}else{
								alert("등록 완료");	
							}
							
						
							
						}
					});
				}
			},	
				
			updateItem: function (params) {
				console.log('업데이트_params : ',params)
				return $.ajax({
					url : "/updateServerMgnt",
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
							console.log("ERROR CODE : "+ xhr.status+ "\n\n"+ "ERROR Message : "+ error+ "\n\n"+ "Error Detail : "+ xhr.responseText.replace(/(<([^>]+)>)/gi, ""));
							alert("ERROR CODE : "+ xhr.status+ "\n\n"+ "ERROR Message : "+ error+ "\n\n"+ "Error Detail : "+ xhr.responseText.replace(/(<([^>]+)>)/gi, ""));
						}
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("AJAX", true);
					},
					success : function(val) {
						if(val.result==0){
							alert("수정 실패",val);
							console.log("val",val);
						}else{
							alert("수정 완료");
							console.log("수정완료");
							console.log(val);
						}
						
					}
				});	
			},

			deleteItem: function (params) {
				return $.ajax({
					url : "/deleteServerMgmt",
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
							console.log("실패",val);
						}else{
							alert("삭제 완료");
							console.log("완료",val);
						}
						
						// gridRefresh(grid_name);
					}
				});
			}
		},

		// data: clients,
		fields: [
			{type: "control", modeSwitchButton: true, editButton: false,width: 30},	
			// {name: "number", headtitle: "number", type:"text", width: 20,align: "left",textField:"number",editing:false},
			{name: "machineType", headtitle: "Machine Type", type:"select",align: "left", items:Machine_type, valueField:"value", textField:"name",
			itemTemplate: function(value) {
				return $("<div>").addClass("text-truncate").text(value);
			} }	,
			{name: "description", headtitle: "Description", type:"text",align: "left", items:stat_name_sel, valueField:"value", textField:"name",
			itemTemplate: function(value) {
				return $("<div>").addClass("text-truncate").text(value);
			} }	
		]
	});

	$("#jsGridThreshold").jsGrid({
		width: "60%",
		height: "700px",
		filtering: false,
		inserting:true,
		editing: true,
		sorting: true,
		paging: true,
		autoload: true,

		rowClick: function(args){
			if(this.editing) {
				this.editItem($(args.event.target).closest("tr"));
			}
		},

		controller: {
			loadData: function() {
				var d = $.Deferred();
				$.ajax({
					url: "/selectThresholds",
					type : "post",
					dataType: "json"
				}).done(function(response) {
					d.resolve(response);
					tableData=response;
					$("#jsGridThreshold").jsGrid("reset");
				});
				return d.promise();
				
			},
			
			insertItem: function (params) {
				console.log("params:", params.stat_name);	
				if(overlapCheck(params.stat_name)){
					alert('중복된 값이 존재합니다.');	
				}else{
					return $.ajax({
						url : "/insertThresholds",
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
								alert("등록 실패");
							}else{
								alert("등록 완료");	
								$("#jsGridThreshold").jsGrid("reset");
							}
						}
						
					});
				}
			},	
				
			updateItem: function (params) {
				console.log('업데이트_params : ',params);
				return $.ajax({
					url : "/updateThresholds",
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
							console.log("ERROR CODE : "+ xhr.status+ "\n\n"+ "ERROR Message : "+ error+ "\n\n"+ "Error Detail : "+ xhr.responseText.replace(/(<([^>]+)>)/gi, ""));
							alert("ERROR CODE : "+ xhr.status+ "\n\n"+ "ERROR Message : "+ error+ "\n\n"+ "Error Detail : "+ xhr.responseText.replace(/(<([^>]+)>)/gi, ""));
						}
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("AJAX", true);
					},
					success : function(val) {
						if(val.result==0){
							alert("수정 실패",val);
							console.log("val",val);
							$("#jsGridThreshold").jsGrid("reset");
						}else{
							alert("수정 완료");
							console.log("수정완료");
							console.log(val);
							$("#jsGridThreshold").jsGrid("reset");
						}
						
					}
				});	
			},

			deleteItem: function (params) {
				return $.ajax({
					url : "/deleteThresholds",
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
							console.log("실패",val);
							$("#jsGridThreshold").jsGrid("reset");
						}else{
							alert("삭제 완료");
							console.log("완료",val);
							$("#jsGridThreshold").jsGrid("reset");
						}
						
						
					}
				});
			}
		},

		// data: clients,
		fields: [
			{type: "control", modeSwitchButton: true, editButton: false,width: 30},	
			// {name: "number", headtitle: "number", type:"text", width: 20,align: "left",textField:"number",editing:false},
			{name: "stat_name", headtitle: "Stat_name", type:"select",align: "left", items:stat_name_sel, valueField:"value", textField:"name",
			itemTemplate: function(value) {
				return $("<div>").addClass("text-truncate").text(value);
			} },
			{name: "condition", headtitle: "Condition", type: "select", align: "center",items:condition_sel,valueField: "value",textField:"name",itemTemplate: function(value) {
					return $("<div>").addClass("text-truncate").text(value);
			} },
			{name: "warning", headtitle: "Warning", type: "text", align: "center",itemTemplate: function(value) {
					return $("<div>").addClass("text-truncate").text(value);
			} },
			{name: "critical", headtitle: "Critical", type:"text",align: "center"},
			{name: "use_yn", headtitle: "Use YN", type:"select", items:Use_YN, valueField:"value", textFiled:"name", width: 50, textField:"name"},		
		]
	});

	// Modal Popup Open event
	$('#psModal').on('shown.bs.modal', function() {
		$("#jsGridThreshold").jsGrid("refresh");
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

