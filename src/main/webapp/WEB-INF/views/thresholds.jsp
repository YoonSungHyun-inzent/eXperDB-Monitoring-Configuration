<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <%@ page trimDirectiveWhitespaces="true" %>
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <title>experDB :: Server Event Thresholds</title>
                <link rel="stylesheet" href="/resources/custom.css">
                <link rel="stylesheet" href="/resources/css/styles.css">

                <link type="text/css" rel="stylesheet"
                    href="https://code.jquery.com/ui/1.11.2/themes/cupertino/jquery-ui.css">

                <link type="text/css" rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" />
                <link type="text/css" rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />
                <style>
                    .jsgrid-row,
                    .jsgrid-alt-row {
                        height: 60px;
                    }

                    #jsGrid .jsgrid-table {
                        border-collapse: separate;
                    }

                    #jsGrid .jsgrid-grid-body td,
                    #jsGrid .jsgrid-grid-header td,
                    #jsGrid .jsgrid-grid-header th {
                        border-left: 0;
                        border-top: 0;
                    }

                    .custom-row td {
                        background: #ffefef;
                    }

                    .ui-widget *,
                    .ui-widget input,
                    .ui-widget select,
                    .ui-widget button {
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

                    input.error,
                    select.error {
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
                    .dashboard-select {
                        float: right; 
                        margin-top: 3%; 
                        margin-right: 2%; 
                        width: 250px;
                    }
                </style>

                <script type="text/javascript" src="https://code.jquery.com/jquery-1.10.2.js"></script>
                <script type="text/javascript" src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>
                <script type="text/javascript"
                    src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>
                <script type="text/javascript"
                    src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
                <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                    crossorigin="anonymous"></script>
                <script type="text/javascript" src="/resources/grid/jsgrid.js?<%=System.currentTimeMillis()%>"></script>
                <script type="text/javascript" src="/resources/grid/grid.field.custom.js"></script>
                <script type="text/javascript" src="/resources/common/common_script.js"></script>
                <script type="text/javascript" src="/resources/thresholds.js"></script>
            </head>

            <body class="sb-nav-fixed">
                <%@ include file="./sidebar/nav.jsp"%>
                <div id="layoutSidenav_content">
                    <main>
                        <%@ include file="./sidebar/dashboardLink.jsp"%>
                        <div class="container-fluid px-4">
                            <h1 class="mt-4">Server Event Threshold</h1>
                            <ol class="breadcrumb mb-4">
                                <!-- <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li> -->
                                <li class="breadcrumb-item active">Server Event Threshold definitions</li>
                            </ol>
                            <%-- <div class="card mb-4">
                                <div class="card-body">
                                    수집 대상 데이터 베이스 관리 화면 입니다.
                                    <a target="_blank" href="https://datatables.net/">official DataTables documentation</a>
                                </div>
                        </div> --%>
                        <div id="jsGridThreshold"></div>
                        <%-- <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                Databases
                            </div>
                            <div class="card-body">
                                <!-- grid 예정 -->
                            </div>
                </div> --%>
                <div id="jsGridThreshold"></div>
                </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; eXperDB 2022</div>
                            <!-- <div>
                        <a href="#">Privacy Policy</a>
                        &middot;
                        <a href="#">Terms &amp; Conditions</a>
                    </div> -->
                        </div>
                    </div>
                </footer>
                </div>
            </body>

            </html>