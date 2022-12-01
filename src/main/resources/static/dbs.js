var grid_name = "jsGrid";

$(document).ready(function(){
	$("#dbsModalAccordionFlush .accordion-body input[type=text]").prop("disabled", true);

	var db_type_arr = [
		{name: "postgres", value: "postgres"},
		{name: "postgres-continuous-discovery", value: "postgres-continuous-discovery"},
		{name: "pgbouncer", value: "pgbouncer"},
		{name: "pgpool", value: "pgpool"},
		{name: "patroni", value: "patroni"},
		{name: "patroni-continuous-discovery", value: "patroni-continuous-discovery"},
		{name: "patroni-namespace-discovery", value: "patroni-namespace-discovery"}
	];

	var enc_type_arr = [
		{name: "plain-text", value: "plain-text"},
		{name: "aes-gcm-256", value: "aes-gcm-256"}
	];

	var ssl_mode_arr = [
		{name: "disable", value: "disable"},
		{name: "require", value: "require"},
		{name: "verify-ca", value: "verify-ca"},
		{name: "verify-full", value: "verify-full"}
	];

	var Upstream_arr = [];

	$("#jsGrid").jsGrid({
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

			var md_id = args.item.md_id;

			openDbsModal("EDIT", md_id);

			// var getData = args.item;
			// var keys = Object.keys(getData);
			// var text = [];

			// $.each(keys, function(idx, value) {
			// text.push(value + " : " + getData[value])
			// });

			// $("#label").text(text.join(", "))

			// $("#copy_metrics_dialog").dialog("close");
		},

		deleteConfirm: function(item) {
			return "\"" + item.md_unique_name + "\" 삭제하시겠습니까?";
		},

		onItemUpdated: function (args) {
			UpdateColPos(3);
		},
		onItemEditing: function (args) {
			setTimeout(function () { UpdateColPos(3); }, 1);
		},
		onRefreshed: function (args) {
			UpdateColPos(3);
		},
		onDataLoaded: function(args) {
			var modalSelectBox = document.getElementById("dbsModalUpstream");
			// var modalSelectBox = args.grid._insertRow[0].cells[28].getElementsByTagName("select")[0];

			Upstream_arr.length = 0;

			modalSelectBox.options[0] = new Option("", "");
			Upstream_arr.push({"name":"","value":""});

			$.each(args.data, function(key, value){
				var tempUpstream_arr = {};
				var temp_arr = value;

				tempUpstream_arr.name = temp_arr.md_hostname;
				tempUpstream_arr.value = temp_arr.md_hostname;

				Upstream_arr.push(tempUpstream_arr);

				modalSelectBox.options[key+1] = new Option(temp_arr.md_hostname, temp_arr.md_hostname);
			});

			// args.grid.option('fields')[29].items = Upstream_arr;
		},

		controller: {
			loadData: function() {
				var d = $.Deferred();

				$.ajax({
					url: "/selectMonitoredDb",
					type : "post",
					dataType: "json"
				}).done(function(response) {
					console.log(response);
					d.resolve(response);
				});

				return d.promise();
			},
			// insertItem: function (params) {
			// 	return $.ajax({
			// 		url : "/insertMonitoredDb",
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
			// 		success : function(result) {
			// 			if(result.length==0){
			// 				alert("등록 실패");
			// 			}else{
			// 				alert("등록 완료");

			// 				gridRefresh();
			// 			}
			// 		}
			// 	});
			// },
			// updateItem: function (params) {
			// 	return $.ajax({
			// 		url : "/updateMonitoredDb",
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
			// 		success : function(result) {
			// 			if(result.length==0){
			// 				alert("수정 실패");
			// 			}else{
			// 				alert("수정 완료");

			// 				gridRefresh();
			// 			}
			// 		}
			// 	});
			// },
			deleteItem: function (params) {
				return $.ajax({
					url : "/deleteMonitoredDb",
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
					success : function(result) {
						if(result.length==0){
							alert("삭제 실패");
						}else{
							alert("삭제 완료");

							gridRefresh();
						}
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
							openDbsModal("ADD");
						});
				}
			},
			{ name: "md_id", headtitle: "ID", width: 80 },
			{ name: "md_unique_name", headtitle: "Unique name", type: "text", width: 200 },
			{ name: "md_dbtype", headtitle: "DB type", type: "select", items: db_type_arr, valueField: "value", textField: "name", width: 100
					// editTemplate: dbTypeEditTemplate
			},
			{ name: "md_hostname", headtitle: "DB host", type: "text", width: 140 },
			{ name: "md_port", headtitle: "DB port", type: "text", width: 80 },
			{ name: "md_dbname", headtitle: "DB dbname", type: "text", width: 200 },
			// { name: "md_include_pattern", headtitle: "DB name inclusion pattern", type: "text", width: 100 },
			// { name: "md_exclude_pattern", headtitle: "DB name exclusion pattern", type: "text", width: 100 },
			{ name: "md_user", headtitle: "DB user", type: "text", width: 120 },
			// { name: "md_password", headtitle: "DB password", type: "password", width: 80 },
			// { name: "md_password_type", headtitle: "Password encryption", type: "select", items: enc_type_arr, valueField: "value", textField: "name", width: 100 },
			// { name: "md_is_superuser", headtitle: "Auto-create helpers?", type: "checkbox", width: 80, visible: false },
			{ name: "md_sslmode", headtitle: "SSL Mode", type: "select", items: ssl_mode_arr, valueField: "value", textField: "name", width: 130},
			// { name: "md_root_ca_path", headtitle: "Root CA", type: "text", width: 100 },
			// { name: "md_client_cert_path", headtitle: "Client cert", type: "text", width: 100 },
			// { name: "md_client_key_path", headtitle: "Client key", type: "text", width: 100 },
			{ name: "md_group", headtitle: "Group", type: "text", width: 80 },
			{ name: "md_preset_config_name", headtitle: "Preset metrics config", type: "select", items: preset_configs_names, valueField: "value", textField: "name", width: 200},
			// { name: "md_preset_config_button", headtitle:"Preset metrics show/copy",width: 100 ,align: "center", type: "contorl", idx: "1",
			// 		ieditButton: false, deleteButton: false,
			// 		insertTemplate: presetMetricsButton,
			// 		editTemplate: presetMetricsButton
			// },
			// { name: "md_config", headtitle: "Custom metrics config", type: "textarea", width: 150 },
			{ name: "md_preset_config_name_standby", headtitle: "Standby preset config", type: "select", items: preset_configs_names, valueField: "value", textField: "name", width: 200 },
			// { name: "md_preset_config_standby_button", headtitle:"Standby Preset metrics show/copy",width: 100 ,align: "center", type: "contorl", idx: "2",
			// 		ieditButton: false, deleteButton: false,
			// 		insertTemplate: presetMetricsButton,
			// 		editTemplate: presetMetricsButton
			// },
			// { name: "md_config_standby", headtitle: "Custom metrics config", type: "textarea", width: 150 },
			// { name: "md_host_config", headtitle: "Host config", type: "textarea", width: 150, editTemplate: textareaToJSONView },
			// { name: "md_custom_tags", headtitle: "Custom tags", type: "textarea", width: 150, editTemplate: textareaToJSONView},
			{ name: "md_statement_timeout_seconds", headtitle: "Statement timeout [seconds]", type: "text", width: 100 },
			// { name: "md_only_if_master", type: "checkbox", headtitle: "Master mode only?", width: 100 },
			{ name: "md_is_enabled", type: "checkbox", headtitle: "Enabled?	", width: 100 },
			{ name: "ms_upstream_hostname", headtitle: "Upstream", type: "select_custom_shift", items: Upstream_arr, valueField: "value", textField: "name", width: 150 },
			{ name: "md_last_modified_on", type: "text", width: 200, visible: false }
		]
	});


	/**
	 * jsgrid scroll
	 */
	$('.jsgrid-grid-body').scroll(function () {
		UpdateColPos(3);
	});

	// $("#show_metrics_dialog").dialog({
	// 	autoOpen: false,
	// 	width: 400,
	// 	close: function() {
	// 	}
	// });

	// $("#copy_metrics_dialog").dialog({
	// 	autoOpen: false,
	// 	width: 400,
	// 	close: function() {
	// 		$("#copy_metrics_dialog_form").validate().resetForm();
	// 		$("#copy_metrics_dialog_form").find(".error").removeClass("error");
	// 	}
	// });

	// $("#copy_metrics_dialog_form").validate({
	// 	rules: {
	// 		name: "required",
	// 		age: { required: true, range: [18, 150] },
	// 		address: { required: true, minlength: 10 },
	// 		country: "required"
	// 	},
	// 	messages: {
	// 		name: "Please enter name",
	// 		age: "Please enter valid age",
	// 		address: "Please enter address (more than 10 chars)",
	// 		country: "Please select country"
	// 	},
	// 	submitHandler: function() {
	// 		formSubmitHandler();
	// 	}
	// });

	$("#dbsModalSslMode").change(function() {
		if(this.value != "disable")
			$("#dbsModalAccordionFlush .accordion-body input[type=text]").prop("disabled",false);
		else
			$("#dbsModalAccordionFlush .accordion-body input[type=text]").prop("disabled",true);
	});
	
	$("#dbsModalFormSubmit").click(function() {
		var params = changeSnakeCase($("#dbsModalForm").serializeArray());
		var dbsModalMode = $("#dbsModalCategory").val();
		var requestUrls = (dbsModalMode ?? "") == "ADD" ? "/insertMonitoredDb" : ((dbsModalMode ?? "") == "EDIT" ? "/updateMonitoredDb" : "" ) ; 
		var returnMsg = (dbsModalMode ?? "") == "ADD" ? "등록" : ((dbsModalMode ?? "") == "EDIT" ? "수정" : "" ) ; 

		var forms = document.querySelectorAll('.needs-validation')

		// Loop over them and prevent submission
		Array.prototype.slice.call(forms).forEach(function (form) {
			if (!form.checkValidity()) {
				console.log('no');
				form.classList.add('was-validated');
			}else {
				form.classList.remove('was-validated');
				console.log('yes');
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
		
							gridRefresh();
							$("#dbsModal").modal('hide');
						}
					}
				});
			}
		});

	});

});

// var dbTypeEditTemplate = function (value, item) {
// 	var $select = jsGrid.fields.select.prototype.editTemplate.apply(this, arguments);
// 	// var $select = jsGrid.fields.select.prototype.editTemplate.call(this);
// 	var grid = this._grid;

// 	$select.on("change", function(e) {
// 		var selectvalue = $(this).val();
// 		// your handler here
// 		console.log(JSON.stringify(item));
// 		if (selectvalue == 'pgbouncer') {
// 			$(this).val(selectvalue);
// 			alert('NB! Preset Config set to "pgbouncer"');
// 		} else if (selectvalue == 'postgres' || selectvalue == 'postgres-continuous-discovery') {
// 			$(this).val('');
// 		} else if (selectvalue == 'patroni' || selectvalue == 'patroni-continuous-discovery' || selectvalue == 'patroni-namespace-discovery') {
// 			alert('NB! "Host config" pre-filled with Etcd localhost values');
// 			grid.option('fields')[5].editControl.val('');
// 			grid.option('fields')[6].editControl.val('');
// 			grid.option('fields')[24].editControl.val('{"dcs_type": "etcd", "dcs_endpoints": ["http://127.0.0.1:2379/"], "namespace": "/service/", "scope": "batman", "username": "", "password": "", "ca_file": "", "cert_file": "", "key_file": ""}');
// 		} else if (selectvalue == 'pgpool') {
// 			grid.option('fields')[5].editControl.val('9999');
// 			$(this).val(JSON.stringify(item));
// 			alert('NB! Preset Config set to "pgpool", port to 9999');
// 		}
// 		e.stopPropagation();
// 	});
// 	return $select;
// }

// var textareaToJSONView = function(value, item){
// 	var $result = jsGrid.fields.textarea.prototype.editTemplate.apply(this, arguments);
// 	var grid = this._grid;

// 	$result.on("click", function(e) {
// 		copyDetailsDialog("Edit", $(this).val(), grid);
// 	});

// 	return $result;
// }

// var presetMetricsButton = function(value, item){
// 	var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);
// 	var $iconPencil = $("<i>").attr({class: "glyphicon glyphicon-pencil"});
// 	var $iconTrash = $("<i>").attr({class: "glyphicon glyphicon-trash"});

// 	var grid = this._grid;

// 	var arridx_val = this.idx == 1 ? 18 : (this.idx == 2 ? 21 : 0);
// 	var arridx_target = this.idx == 1 ? 20 : (this.idx == 2 ? 23 : 0);

// 	var $customEditButton = $("<button>")
// 		.attr({class: "btn btn-warning btn-xs"})
// 		.attr({role: "button"})
// 		.attr({headtitle: jsGrid.fields.control.prototype.editButtonTooltip})
// 		.click(function(e) {
// 			console.log("item.md_preset_config_name :: " + grid.option('fields')[arridx_val].editControl.val());
// 			//grid.option('fields')[arridx_target].editControl.val(JSON.stringify(preset_configs[grid.option('fields')[arridx_val].editControl.val()]));
// 			showDetailsDialog(grid.option('fields')[arridx_val].editControl.val(), JSON.stringify(preset_configs[grid.option('fields')[arridx_val].editControl.val()]));
// 			// document.location.href = item.id + "/edit";
// 			e.stopPropagation();
// 		})
// 		.append($iconPencil);
// 	var $customDeleteButton = $("<button>")
// 		.attr({class: "btn btn-danger btn-xs"})
// 		.attr({role: "button"})
// 		.attr({headtitle: jsGrid.fields.control.prototype.deleteButtonTooltip})
// 		.click(function(e) {
// 			// alert("ID: " + item.id);
// 			copyDetailsDialog("Edit", JSON.stringify(preset_configs[grid.option('fields')[arridx_val].editControl.val()]), grid, arridx_target);
// 			// document.location.href = item.id + "/delete";
// 			e.stopPropagation();
// 		})
// 		.append($iconTrash);

// 	return $result.add($customEditButton).add($customDeleteButton);
// }

// var selectUpstreamTemplate = function(data ,items){
// 	var textField = this.textField;
// 	var valueField = this.valueField;
// 	var seletedItemName = items.md_unique_name;
// 	var seletedItemUh = items.ms_upstream_hostname;
// 	var $result = $("<select>");

// 	$.each(this.items, function(_, item) {
// 		var text = item[textField];
// 		var value = item[valueField];
// 		var $opt = $("<option>").text(text).attr("value", value);

// 		if(seletedItemName != text) {
// 			$result.append($opt);

// 			$opt.prop("selected", (seletedItemUh === value));
// 		}
// 	});


// 	return $result;
// }

// var copyDetailsDialog = function(dialogType, client, grid, arridx_target) {
// 	if((client ?? '') != ''){
// 		var jsonData = $.parseJSON(client);
// 		var $targetTbody = $("#copy_metrics_dialog_form > table > tbody");

// 		$targetTbody.empty();

// 		$.each(jsonData, function(key, value){
// 			$targetTbody.append("<tr>" +
// 								"<th>" + key +"</th>" +
// 								"<td><input value='" + value + "'/></td>" +
// 								"</tr>");
// 		});

// 		formSubmitHandler = function() {
// 			saveClient(client, dialogType === "Add", grid, arridx_target);
// 		};

// 		$("#copy_metrics_dialog").dialog({
// 					title : dialogType + " Preset metrics",
// 					width : 400,
// 					maxHeight : 500,
// 					autoOpen : false
// 				}).dialog("open");
// 	}
// };

// var showDetailsDialog = function(metric_nm, client) {
// 	var jsonData = $.parseJSON(client);
// 	var $targetTbody = $("#show_metrics_dialog_form > table > tbody");

// 	$targetTbody.empty();

// 	$.each(jsonData, function(key, value){
// 		$targetTbody.append("<tr>" +
// 					"<th>" + key +"</th>" +
// 					"<td>" + value + "</td>" +
// 					"</tr>");
// 	});

// 	$("#show_metrics_dialog").dialog({
// 				title : "Preset metrics list( " + metric_nm +" )",
// 				width : 400,
// 				maxHeight : 500,
// 				autoOpen : false
// 			}).dialog("open");
// };

function openDbsModal(category, id) {
	dbsModalMode = category;

	$("#dbsModalForm")[0].reset();
	$("#dbsModalCategory").val(category);
	$("#dbsModalForm").removeClass("was-validated");

	$("#dbsModalAccordionFlush .accordion-item div").collapse('hide');
	$("#dbsModalUpstream option").show();

	if(category == "ADD"){
		$("#dbsModalTitle").text("DBs 등록");
		$("#dbsModalUname").prop("disabled", false);
		$("#dbsModalDbPassword").prop ('required',true);
		$("#dbsModal").modal('show');
	}
	else if(category == "EDIT"){
		$("#dbsModalTitle").text("DBs 수정");
		$("#dbsModalId").val(id);
		$("#dbsModalDbPassword").prop ('required',false);
		$("#dbsModalUname").prop("disabled", true);
		selectMonitoredDbDetail(id);
	}
}

function selectMonitoredDbDetail(id) {
	$.ajax({
		url : "/selectMonitoredDbDetail",
		data : "md_id=" + id,
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

			initModalDbsForm(result);
		}
	});
}

function initModalDbsForm(params) {
	$.each(params, function(i, data){
		var jsonData = data;
		
		$("#dbsModalUname").val(jsonData.md_unique_name);
		$("#dbsModalSts").val(jsonData.md_statement_timeout_seconds);
		$("#dbsModalHostName").val(jsonData.md_hostname);
		$("#dbsModalPort").val(jsonData.md_port);
		$("#dbsModalDbName").val(jsonData.md_dbname);
		$("#dbsModalDbUserName").val(jsonData.md_user);
		$("#dbsModalGroup").val(jsonData.md_group);
		// $("#dbsModalDbPassword").val(jsonData.);

		$("#dbsModalCustomTags").val(jsonData.md_custom_tags);
		$("#dbsModalHostConfig").val(jsonData.md_host_config);
		$("#dbsModalConfig").val(jsonData.md_config);
		$("#dbsModalConfig2").val(jsonData.md_config_standby);

		$("#dbsModalDBtype").val(jsonData.md_dbtype);
		$("#dbsModalDbPasswordType").val(jsonData.md_password_type);
		$("#dbsModalUpstream").val(jsonData.ms_upstream_hostname);
		$("#dbsModalUpstream option[value='" + jsonData.md_hostname + "']").hide();
		$("#dbsModalPresetConfig").val(jsonData.md_preset_config_name);
		$("#dbsModalPresetConfig2").val(jsonData.md_preset_config_name_standby);
		
		$("#dbsModalSslMode").val(jsonData.md_sslmode);
		$("#dbsModalRootCaPath").val(jsonData.md_root_ca_path);
		$("#dbsModalCcp").val(jsonData.md_client_cert_path);
		$("#dbsModalCkp").val(jsonData.md_client_key_path);

		var flagSslMode = jsonData.md_sslmode === "disable";

		$("#dbsModalAccordionFlush .accordion-body input[type=text]").prop("disabled", flagSslMode );
	});

	$("#dbsModal").modal('show');
}

function saveClient(client, isNew, grid, arridx_target) {
	//$("#jsGrid").jsGrid(isNew ? "insertItem" : "updateItem", JSON.parse(client));
	var targetTbl = $("#copy_metrics_dialog_form > table");
	var rowSize = targetTbl.find('tbody > tr').length;
	var colSize = targetTbl.find('tbody > tr:first').children().length;

	if(rowSize < 1)
	{
		 alert("테이블에 데이터가 없습니다!");
		 return;
	}

	var objArr = new Array();      // 하나의 JSON Object (행)을 저장할 배열 변수
	var tr, th, td;
	var obj = new Object();
	for(var i = 0; i < rowSize; i++)
	{
		tr = targetTbl.find('tbody').find('tr:eq(' + i + ')');

		for(var j = 0; j < colSize; j++)
		{
			if(tr.children().eq(j).prop("tagName") == 'TH')
				th = tr.children().eq(j).text();
			else if(tr.children().eq(j).prop("tagName") == 'TD')
				td = tr.children().eq(j).find('input').val()
		}

		obj[th] = td;
	}

	grid.option('fields')[arridx_target].editControl.val(JSON.stringify(obj));

	$("#copy_metrics_dialog").dialog("close");
};

function changeSnakeCase(params) {
	var changeArr = [];

	$.each(params, function(i, v) {
		var tempObject = {};
		var tempName = v.name;

		tempName = tempName.replace("dbsModal", "").replace(/([A-Z])/g, function(arg){
			            return "_"+arg.toLowerCase();
			    }).replace("_", "");

		tempObject['name'] = tempName;
		tempObject['value'] = v.value;
		changeArr.push(tempObject);
	});

	return changeArr;
}

// var selectUpstreamTemplate = function(value, item){
// 	var $select = jsGrid.fields.select.prototype.editTemplate.call(this);
// 	var grid = this._grid;
// 	var f_item = grid.option('fields')[29].items;

// 	f_item.filter(val => val.name !== item.md_dbname);

// 	return $select;
// }

function UpdateColPos(cols) {
	var left = $('.jsgrid-grid-body').scrollLeft() < $('.jsgrid-grid-body .jsgrid-table').width() - $('.jsgrid-grid-body').width() + 16
		? $('.jsgrid-grid-body').scrollLeft() : $('.jsgrid-grid-body .jsgrid-table').width() - $('.jsgrid-grid-body').width() + 16;
	$('.jsgrid-header-row th:nth-child(-n+' + cols + '), .jsgrid-filter-row td:nth-child(-n+' + cols + '), .jsgrid-insert-row td:nth-child(-n+' + cols + '), .jsgrid-grid-body tr td:nth-child(-n+' + cols + ')')
		.css({
			"position": "relative",
			"left": left
		});
}

function gridRefresh(){
	$("#" + grid_name).jsGrid("option", "inserting", false);
	$("#" + grid_name).jsGrid("loadData");
	$("#" + grid_name + " > .jsgrid-grid-body").scrollTop(0);
	$("#" + grid_name + " > .jsgrid-grid-body").scrollLeft(0);
}