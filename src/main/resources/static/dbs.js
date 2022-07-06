var grid_name = "jsGrid";

$(document).ready(function(){
	$(".delete").click(function(event){
		return confirm('Remove DB "' + $(this).parent().parent().find("[name='md_unique_name']").val() + '" from monitoring? NB! This does not remove gathered metrics data from InfluxDB, see bottom of page for that')
	});

	$("#delete_all").click(function(event){
		return confirm('Are you sure you want to delete all gathered metrics data for non-active DB-s defined in the Config DB? Note that any metrics from YAML based definitions (if used) will be also deleted')
	});

	$("#delete_single").click(function(event){
		if ($("#single_unique_name").val().trim() == '') {
			alert("Unique name empty!");
			return false;
		}
		return confirm('Are you sure you want to delete all gathered metrics for DB: "' + $("#single_unique_name").val() + '" ?')
	});

	$("#disable_all").click(function(event){
		return confirm('Are you sure you want to disable all DBs and stop metrics gathering?')
	});

	$("#set_bulk_password").click(function(event){
		return confirm('Are you sure you want to change all passwords?')
	});

	$(".delete").click(function(event){
	});
	$(".save").add('.new').click(function(event){
		var unique_name = $(this).parent().parent().find("[name='md_unique_name']").val();
		var dbtype = $(this).parent().parent().find("[name='md_dbtype']").val();
		var hostname = $(this).parent().parent().find("[name='md_hostname']").val();
		var port = $(this).parent().parent().find("[name='md_port']").val();
		var dbname = $(this).parent().parent().find("[name='md_dbname']").val();
		var tag = this.name;
		var form_idx = $(this).attr("data");
		var form = $(this).parent().parent().parent().find("[name='dbsForm']").eq(form_idx);
		var form_new = $(this).parent().parent().parent().find("[name='dbsForm_new']").eq(0);

		if (unique_name == null || !(unique_name.trim() > '')) {
			alert("'Unique name' cannot be empty");
			return false;
		}
		if (hostname == null || !(hostname.trim() > '') && !(dbtype == "patroni" || dbtype == "patroni-continuous-discovery" || dbtype == "patroni-namespace-discovery")) {
			alert("'DB host' cannot be empty");
			return false;
		}
		if (dbname == null || !(dbname.trim() > '') && dbtype == "patroni") {
			alert("'DB name' cannot be empty for 'patroni'. Use 'patroni-continuous-discovery' (with patterns) if multiple DBs needed");
			return false;
		}
		if (dbname.trim() > '' && dbtype == "patroni-continuous-discovery") {
			alert("'DB name' cannot be filled for 'patroni-continuous-discovery'. Use regex patterns for limiting DB-s to be monitored");
			return false;
		}
		if (port == null || !(port.trim() > '') && !(dbtype == "patroni"  || dbtype == "patroni-continuous-discovery" || dbtype == "patroni-namespace-discovery")) {
			alert("'DB port' cannot be empty");
			return false;
		}
		if ($(this).parent().parent().find("[name='md_user']").val() == null || !($(this).parent().parent().find("[name='md_user']").val().trim() > '')) {
			alert("'DB user' cannot be empty");
			return false;
		}

		var custom_config = $(this).parent().parent().find("[name='md_config']").val();
		var preset_config = $(this).parent().parent().find("[name='md_preset_config_name']").val();
		if (custom_config.trim() == '' && preset_config == '') {
			alert('Preset OR custom config needs to be specified, i.e. only one of these fields must be filled!');
			return false;
		}
		var custom_config_standby = $(this).parent().parent().find("[name='md_config_standby']").val();
		var preset_config_standby = $(this).parent().parent().find("[name='md_preset_config_name_standby']").val();
		if (custom_config_standby.trim() > '' && preset_config_standby > '') {
			alert('Standby preset and custom config cannot be both specified!');
			return false;
		}

		// check influx identifier policies - only ascii, digits (not as 1st char) and underscores
		var db_unique = $(this).parent().parent().find("[name='md_unique_name']").val()
		if (db_unique[0].match(/\d/)) {
			alert("'Unique name' can only start with a letter or underscore");
			return false;
		}
		if (db_unique.match(/[^\d\w_@]/)) {
			alert("'Unique name' can only contain letters, digits and underscores");
			return false;
		}

		var is_superuer = $(this).parent().parent().find("[name='md_is_superuser_chk']").is(":checked");
		var is_only_if_master = $(this).parent().parent().find("[name='md_only_if_master_chk']").is(":checked");
		var is_enabled = $(this).parent().parent().find("[name='md_is_enabled_chk']").is(":checked");

		$(this).parent().parent().find("[name='md_is_superuser']").val(is_superuer ? true : false);
		$(this).parent().parent().find("[name='md_only_if_master']").val(is_only_if_master ? true : false);
		$(this).parent().parent().find("[name='md_is_enabled']").val(is_enabled ? true : false);

		event.preventDefault();

		if (tag == "new") {
			$.ajax({
				url : "/insertMonitoredDb",
				data : form_new.serialize(),
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
						alert("등록 실패");
					}else{
						alert("등록 완료");
					}
				}
			});

		} else {
			$.ajax({
				url : "/updateMonitoredDb",
				data : form.serialize(),
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
						alert("수정 실패");
					}else{
						alert("수정 완료");
					}
				}
			});

		}



	});

	$("#md_dbtype").change(function(event){
		if ($(this).val() == 'pgbouncer') {
			$("#md_preset_config_name").val('pgbouncer');
			alert('NB! Preset Config set to "pgbouncer"');
		} else if ($(this).val() == 'postgres' || $(this).val() == 'postgres-continuous-discovery') {
			$("#md_preset_config_name").val('');
		} else if ($(this).val() == 'patroni' || $(this).val() == 'patroni-continuous-discovery' || $(this).val() == 'patroni-namespace-discovery') {
			alert('NB! "Host config" pre-filled with Etcd localhost values');
			$("#md_port").val('');
			$("#md_hostname").val('');
			$("#md_host_config").val('{"dcs_type": "etcd", "dcs_endpoints": ["http://127.0.0.1:2379/"], "namespace": "/service/", "scope": "batman", "username": "", "password": "", "ca_file": "", "cert_file": "", "key_file": ""}');
		} else if ($(this).val() == 'pgpool') {
			$("#md_preset_config_name").val('pgpool');
			$("#md_port").val('9999');
			alert('NB! Preset Config set to "pgpool", port to 9999');
		}
	});

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
	]

	var ssl_mode_arr = [
		{name: "disable", value: "disable"},
		{name: "require", value: "require"},
		{name: "verify-ca", value: "verify-ca"},
		{name: "verify-full", value: "verify-full"}
	]


	$("#jsGrid").jsGrid({
		width: "100%",
		height: "600px",

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
			insertItem: function (params) {
				return $.ajax({
					url : "/insertMonitoredDb",
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
							alert("등록 실패");
						}else{
							alert("등록 완료");

							gridRefresh();
						}
					}
				});
			},
			updateItem: function (params) {
				return $.ajax({
					url : "/updateMonitoredDb",
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
							alert("수정 실패");
						}else{
							alert("수정 완료");

							gridRefresh();
						}
					}
				});
			},
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
			{ type: "control" },
			{ name: "md_id", headtitle: "ID", width: 80 },
			{ name: "md_unique_name", headtitle: "Unique name", type: "text", width: 200 },
			{ name: "md_dbtype", headtitle: "DB type", type: "select", items: db_type_arr, valueField: "value", textField: "name", width: 100,
					editTemplate: dbTypeEditTemplate
			},
			{ name: "md_hostname", headtitle: "DB host", type: "text", width: 140 },
			{ name: "md_port", headtitle: "DB port", type: "text", width: 80 },
			{ name: "md_dbname", headtitle: "DB dbname", type: "text", width: 200 },
			{ name: "md_include_pattern", headtitle: "DB name inclusion pattern", type: "text", width: 100 },
			{ name: "md_exclude_pattern", headtitle: "DB name exclusion pattern", type: "text", width: 100 },
			{ name: "md_user", headtitle: "DB user", type: "text", width: 120 },
			{ name: "md_password", headtitle: "DB password", type: "password", width: 80, validate: passwordValidate },
			{ name: "md_password_type", headtitle: "Password encryption", type: "select", items: enc_type_arr, valueField: "value", textField: "name", width: 100 },
			{ name: "md_is_superuser", headtitle: "Auto-create helpers?", type: "checkbox", width: 80, visible: false },
			{ name: "md_sslmode", headtitle: "SSL Mode", type: "select", items: ssl_mode_arr, valueField: "value", textField: "name", width: 130},
			{ name: "md_root_ca_path", headtitle: "Root CA", type: "text", width: 100 },
			{ name: "md_client_cert_path", headtitle: "Client cert", type: "text", width: 100 },
			{ name: "md_client_key_path", headtitle: "Client key", type: "text", width: 100 },
			{ name: "md_group", headtitle: "Group", type: "text", width: 80 },
			{ name: "md_preset_config_name", headtitle: "Preset metrics config", type: "select", items: preset_configs_names, valueField: "value", textField: "name", width: 200},
			{ name: "md_preset_config_button", headtitle:"Preset metrics show/copy",width: 100 ,align: "center", type: "contorl", idx: "1",
					ieditButton: false, deleteButton: false,
					insertTemplate: presetMetricsButton,
					editTemplate: presetMetricsButton
			},
			{ name: "md_config", headtitle: "Custom metrics config", type: "textarea", width: 150 },
			{ name: "md_preset_config_name_standby", headtitle: "Standby preset config", type: "select", items: preset_configs_names, valueField: "value", textField: "name", width: 200 },
			{ name: "md_preset_config_standby_button", headtitle:"Standby Preset metrics show/copy",width: 100 ,align: "center", type: "contorl", idx: "2",
					ieditButton: false, deleteButton: false,
					insertTemplate: presetMetricsButton,
					editTemplate: presetMetricsButton
			},
			{ name: "md_config_standby", headtitle: "Custom metrics config", type: "textarea", width: 150 },
			{ name: "md_host_config", headtitle: "Host config", type: "textarea", width: 150, editTemplate: textareaToJSONView },
			{ name: "md_custom_tags", headtitle: "Custom tags", type: "textarea", width: 150, editTemplate: textareaToJSONView},
			{ name: "md_statement_timeout_seconds", headtitle: "Statement timeout [seconds]", type: "text", width: 100 },
			{ name: "md_only_if_master", type: "checkbox", headtitle: "Master mode only?", width: 100 },
			{ name: "md_is_enabled", type: "checkbox", headtitle: "Enabled?	", width: 100 },
			{ name: "md_last_modified_on", type: "text", width: 200, visible: false }
		]
	});


	/**
	 * jsgrid scroll
	 */
	$('.jsgrid-grid-body').scroll(function () {
		UpdateColPos(3);
	});

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

	$('.tabs').tabslet();

	$('.tabs').on("_after", function() {
		// do stuff here
		$("#" + $(this).find("div:visible > div").attr("id")).jsGrid("refresh");
	});
});

var passwordValidate = {
	validator : "required",
	message : "패스워드는 필수 입니다."
}

var copyDetailsDialog = function(dialogType, client, grid, arridx_target) {
	if((client ?? '') != ''){
		var jsonData = $.parseJSON(client);
		var $targetTbody = $("#copy_metrics_dialog_form > table > tbody");

		$targetTbody.empty();

		$.each(jsonData, function(key, value){
			$targetTbody.append("<tr>" +
								"<th>" + key +"</th>" +
								"<td><input value='" + value + "'/></td>" +
								"</tr>");
		});

		formSubmitHandler = function() {
			saveClient(client, dialogType === "Add", grid, arridx_target);
		};

		$("#copy_metrics_dialog").dialog({
					title : dialogType + " Preset metrics",
					width : 400,
					maxHeight : 500,
					autoOpen : false
				}).dialog("open");
	}
};

var showDetailsDialog = function(metric_nm, client) {
	var jsonData = $.parseJSON(client);
	var $targetTbody = $("#show_metrics_dialog_form > table > tbody");

	$targetTbody.empty();

	$.each(jsonData, function(key, value){
		$targetTbody.append("<tr>" +
					"<th>" + key +"</th>" +
					"<td>" + value + "</td>" +
					"</tr>");
	});

	$("#show_metrics_dialog").dialog({
				title : "Preset metrics list( " + metric_nm +" )",
				width : 400,
				maxHeight : 500,
				autoOpen : false
			}).dialog("open");
};

var dbTypeEditTemplate = function (value, item) {
	var $select = jsGrid.fields.select.prototype.editTemplate.apply(this, arguments);
	// var $select = jsGrid.fields.select.prototype.editTemplate.call(this);
	var grid = this._grid;

	$select.on("change", function(e) {
		var selectvalue = $(this).val();
		// your handler here
		console.log(JSON.stringify(item));
		if (selectvalue == 'pgbouncer') {
			grid.option('fields')[18].editControl.val(selectvalue);
			alert('NB! Preset Config set to "pgbouncer"');
		} else if (selectvalue == 'postgres' || selectvalue == 'postgres-continuous-discovery') {
			grid.option('fields')[18].editControl.val('');
		} else if (selectvalue == 'patroni' || selectvalue == 'patroni-continuous-discovery' || selectvalue == 'patroni-namespace-discovery') {
			alert('NB! "Host config" pre-filled with Etcd localhost values');
			grid.option('fields')[5].editControl.val('');
			grid.option('fields')[6].editControl.val('');
			grid.option('fields')[24].editControl.val('{"dcs_type": "etcd", "dcs_endpoints": ["http://127.0.0.1:2379/"], "namespace": "/service/", "scope": "batman", "username": "", "password": "", "ca_file": "", "cert_file": "", "key_file": ""}');
		} else if (selectvalue == 'pgpool') {
			grid.option('fields')[5].editControl.val('9999');
			grid.option('fields')[18].editControl.val(JSON.stringify(item));
			alert('NB! Preset Config set to "pgpool", port to 9999');
		}
		e.stopPropagation();
	});
	return $select;
}

var textareaToJSONView = function(value, item){
	var $result = jsGrid.fields.textarea.prototype.editTemplate.apply(this, arguments);
	var grid = this._grid;

	$result.on("click", function(e) {
		copyDetailsDialog("Edit", $(this).val(), grid);
	});

	return $result;
}

var presetMetricsButton = function(value, item){
	var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);
	var $iconPencil = $("<i>").attr({class: "glyphicon glyphicon-pencil"});
	var $iconTrash = $("<i>").attr({class: "glyphicon glyphicon-trash"});

	var grid = this._grid;

	var arridx_val = this.idx == 1 ? 18 : (this.idx == 2 ? 21 : 0);
	var arridx_target = this.idx == 1 ? 20 : (this.idx == 2 ? 23 : 0);

	var $customEditButton = $("<button>")
		.attr({class: "btn btn-warning btn-xs"})
		.attr({role: "button"})
		.attr({headtitle: jsGrid.fields.control.prototype.editButtonTooltip})
		.click(function(e) {
			console.log("item.md_preset_config_name :: " + grid.option('fields')[arridx_val].editControl.val());
			//grid.option('fields')[arridx_target].editControl.val(JSON.stringify(preset_configs[grid.option('fields')[arridx_val].editControl.val()]));
			showDetailsDialog(grid.option('fields')[arridx_val].editControl.val(), JSON.stringify(preset_configs[grid.option('fields')[arridx_val].editControl.val()]));
			// document.location.href = item.id + "/edit";
			e.stopPropagation();
		})
		.append($iconPencil);
	var $customDeleteButton = $("<button>")
		.attr({class: "btn btn-danger btn-xs"})
		.attr({role: "button"})
		.attr({headtitle: jsGrid.fields.control.prototype.deleteButtonTooltip})
		.click(function(e) {
			// alert("ID: " + item.id);
			copyDetailsDialog("Edit", JSON.stringify(preset_configs[grid.option('fields')[arridx_val].editControl.val()]), grid, arridx_target);
			// document.location.href = item.id + "/delete";
			e.stopPropagation();
		})
		.append($iconTrash);

	return $result.add($customEditButton).add($customDeleteButton);
}

sslCustomEditTemplate = function(val){
	var textField = this.textField;
		var $result = $("<select>");

		$.each(this.items, function(_, item) {
			var value = item[textField];
			var $opt = $("<option>").text(value);

			if($.inArray(value, val) > -1) {
				$opt.attr("selected", "selected");
			}

			$opt.click(function(e){
				$('#jsGrid').jsGrid('fieldOption', 'md_root_ca_path', 'visible', (val != "disable" ? 'true' : 'false'));
				$('#jsGrid').jsGrid('fieldOption', 'md_client_cert_path', 'visible', (val != "disable" ? 'true' : 'false'));
				$('#jsGrid').jsGrid('fieldOption', 'md_client_key_path', 'visible', (val != "disable" ? 'true' : 'false'));

				e.stopPropagation();
			});

			$result.append($opt);
		});


		return $result;
}

var saveClient = function(client, isNew, grid, arridx_target) {
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

var selectComplteTemplate = function(value, item){
	var $select = jsGrid.fields.select.prototype.editTemplate.call(this);
	var grid = this._grid;

	$select.on("change", function() {
		// your handler here
		console.log(JSON.stringify(item));
		grid.option('fields')[18].editControl.val(JSON.stringify(item));
	});
	return $select;
}

var selectMonitoredDbs = function(params) {
	$.ajax({
		url : "/selectMonitoredDb",
		// data : form.serialize(),
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
			console.log(result);
			// if(result.length==0){
			//     alert("수정 실패");
			// }else{
			//     alert("수정 완료");
			// }
		}
	});
}

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