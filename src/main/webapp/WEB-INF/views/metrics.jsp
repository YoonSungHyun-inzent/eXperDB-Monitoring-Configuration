<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page trimDirectiveWhitespaces="true" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>experDB :: Metrics and preset configs</title>
    <link rel="stylesheet" href="/resources/bootstrap-4.3.1-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resources/custom.css">
    <link rel="stylesheet" href="/resources/css/styles.css">

    <link type="text/css" rel="stylesheet" href="https://code.jquery.com/ui/1.11.2/themes/cupertino/jquery-ui.css">

    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" />

    <style>
        #jsGridMetricDefinitions .jsgrid-table {
            border-collapse: separate;
        }

        #jsGridMetricDefinitions .jsgrid-grid-body td, #jsGridMetricDefinitions .jsgrid-grid-header td, #jsGridMetricDefinitions .jsgrid-grid-header th {
            border-left: 0;
            border-top: 0;
        }

        .custom-row td {
            background: #ffefef;
        }

        .ui-widget *, .ui-widget input, .ui-widget select, .ui-widget button  {
            font-family: 'Helvetica Neue Light', 'Open Sans', Helvetica;
            font-size: 14px;
            font-weight: 300 !important;
        }

        .details-form-field input,
        .details-form-field select {
            float: right;
        }

        .details-form-field {
            margin: 5px 0;
        }

        .details-form-field:first-child {
            margin-top: 10px;
        }

        .details-form-field:last-child {
            margin-bottom: 10px;
        }

        .details-form-field button {
            display: block;
            width: 100px;
            margin: 0 auto;
        }

        input.error, select.error {
            border: 1px solid #ff9999;
            background: #ffeeee;
        }

        label.error {
            float: right;
            margin-left: 100px;
            font-size: .8em;
            color: #ff6666;
        }

        .sql {
            height: 100px;
            overflow: hidden;
        }
    </style>

    <script type="text/javascript" src="https://code.jquery.com/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
    <script type="text/javascript" src="/resources/bootstrap-4.3.1-dist/js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="/resources/grid/jsgrid.js?<%=System.currentTimeMillis()%>"></script>
    <script type="text/javascript" src="/resources/grid/grid.field.custom.js"></script>
    <script type="text/javascript" src="/resources/tab/jquery.tabslet.min.js"></script>
    <script type="text/javascript" src="/resources/metrics.js"></script>
</head>
<body>

<div class="container-fluid">
    <nav class="navbar navbar-expand-md navbar-light bg-light mb-2">
        <ul class="navbar-nav mr-auto">
            <!-- <li class="nav-item">
                <a class="nav-link" href="/"><h4>pgwatch2</h4></a>
            </li> -->
            <li class="nav-item">
                <a class="nav-link" href="http://inzent.com/"><img src="/resources/logo.png" alt="experDB logo" height="40px"></a>
            </li>
        </ul>

        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="/dbs">DBs</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="/metrics">Metric definitions</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/stats-summary" title="Hint - Grafana is the preferred metrics browser">Stats summary</a>
            </li>
            
            <li class="nav-item dropdown" title="Logs will open in a new window">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Logs</a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="/logs/pgwatch2/200" target="_blank">Pgwatch2 [last 200 lines]</a>
                    <a class="dropdown-item" href="/logs/influxdb/200" target="_blank">InfluxDB [last 200 lines]</a>
                    <a class="dropdown-item" href="/logs/grafana/200" target="_blank">Grafana [last 200 lines]</a>
                    <a class="dropdown-item" href="/logs/postgres/200" target="_blank">Postgres [last 200 lines]</a>
                    <a class="dropdown-item" href="/logs/webui/200" target="_blank">Web UI [last 200 lines]</a>
                    <a class="dropdown-item" href="/versions" target="_blank">Component versions</a>
                </div>
            </li>
            
            <li class="nav-item">
                <a class="nav-link" href="/logout">Logout</a>
            </li>
        </ul>
    </nav>
</div>

<div class="container-fluid">

    <div class="row" style="display:none;">
        <div class="col alert alert-warning alert-dismissible fade show" role="alert">
            ????????? ??????
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</div>

<div class='tabs'>
    <ul class='horizontal'>
        <li><a href="#tab-1"><h3>Preset configs</h3></a></li>
        <li><a href="#tab-2"><h3 title="Inactive at the bottom">Metric definitions</h3></a></li>
    </ul>
    <div id='tab-1' style="margin:5px">
        <div id="jsGridPreset"></div>
    </div>
    <div id='tab-2' style="margin:5px">
        <div id="jsGridMetricDefinitions"></div>
    </div>
</div>

<script>
    $( document ).ready(function() {
        $(".delete").click(function(e){
            var r = confirm("Delete?");
            if (r == false) {
                e.preventDefault();
            }
        });
        $("#new").click(function(e){
            if ($('#pc_name').val() == '') {
                alert('Preset config name is empty!');
                e.preventDefault();
            }
            pc_config = $('#pc_config').val()
            try {
                JSON.parse(pc_config);
            } catch (ex) {
                alert('Preset config is not valid JSON!');
                e.preventDefault();
            }
        });
        $(".metric_save").click(function(e){
            var master = $(this).parent().parent().find("[name='m_master_only']");
            var standby = $(this).parent().parent().find("[name='m_standby_only']");
            if (master.is(":checked") && standby.is(":checked")) {
                alert("A metric cannot be both 'Master only' and 'Standby only'!");
                e.preventDefault();
            }
        });
    });
</script>

</body>
</html>
