<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <%@ page trimDirectiveWhitespaces="true" %>

            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <title>experDB :: Metrics and preset configs</title>
                <link rel="stylesheet" href="/resources/custom.css">
                <link rel="stylesheet" href="/resources/css/styles.css">

                <link type="text/css" rel="stylesheet"
                    href="https://code.jquery.com/ui/1.11.2/themes/cupertino/jquery-ui.css">

                <link type="text/css" rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />
                <link type="text/css" rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" />

                <style>
                    .jsgrid-row,
                    .jsgrid-alt-row {
                        height: 60px;
                    }

                    #jsGridMetricDefinitions .jsgrid-table {
                        border-collapse: separate;
                    }

                    #jsGridMetricDefinitions .jsgrid-grid-body td,
                    #jsGridMetricDefinitions .jsgrid-grid-header td,
                    #jsGridMetricDefinitions .jsgrid-grid-header th {
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
                <script type="text/javascript" src="/resources/metrics.js"></script>
            </head>

            <body class="sb-nav-fixed">
                <%@ include file="./sidebar/nav.jsp"%>
                <div id="layoutSidenav_content">
                    <main>
                        <%@ include file="./sidebar/dashboardLink.jsp"%>
                        <div class="container-fluid px-4">
                            <h1 class="mt-4">Metrics</h1>
                            <ol class="breadcrumb mb-4">
                                <!-- <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li> -->
                                <li class="breadcrumb-item active">Metric definitions</li>
                            </ol>
                            
                            <%-- <div class="card mb-4">
                                <div class="card-body">
                                    수집 대상 데이터 베이스 관리 화면 입니다.
                                    <a target="_blank" href="https://datatables.net/">official DataTables
                                        documentation</a>
                                    .
                                </div>
                        </div> --%>
                        <div id="jsGridMetricDefinitions"></div>
                        <%-- <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                Databases
                            </div>
                            <div class="card-body">
                                <!-- grid 예정 -->
                            </div>
                </div> --%>
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
                </div>
                <div class="modal fade" id="msModal" tabindex="-1" aria-labelledby="msModalTitle" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="msModalTitle">Preset 등록</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <form id="msModalForm">
                                    <input type="hidden" id="msModalCategory">
                                    <input type="hidden" id="msModalMId" name="msModalMId">
                                    <!-- 2 column grid layout with text inputs for the first and last names -->

                                    <div class="row mb-4">
                                        <div class="col">
                                            <div class="form-floating">
                                                <input type="text" id="msModalMName" name="msModalMName"
                                                    class="form-control">
                                                <label class="form-label" for="msModalMName"
                                                    style="margin-left: 0px;">Metric Name</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-floating">
                                                <input type="text" id="msModalPgVersion" name="msModalMPgVersionFrom"
                                                    class="form-control">
                                                <label class="form-label" for="msModalPgVersion"
                                                    style="margin-left: 0px;">Pg Version</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-floating mb-4">
                                        <textarea class="form-control" id="msModalMSql" name="msModalMSql"
                                            rows="4"></textarea>
                                        <label class="form-label" for="msModalMSql" style="margin-left: 0px;">Metric
                                            SQL</label>
                                    </div>

                                    <div class="form-floating mb-4">
                                        <textarea class="form-control" id="msModalMSqlSu" name="msModalMSqlSu"
                                            rows="4"></textarea>
                                        <label class="form-label" for="msModalMSqlSu" style="margin-left: 0px;">Metric
                                            Privileged SQL</label>
                                    </div>

                                    <div class="form-floating mb-4">
                                        <textarea class="form-control" id="msModalMComment" name="msModalMComment"
                                            rows="4"></textarea>
                                        <label class="form-label" for="msModalMComment"
                                            style="margin-left: 0px;">Comment</label>
                                    </div>

                                    <div class="form-floating mb-4">
                                        <textarea class="form-control" id="msModalMColumnAttrs"
                                            name="msModalMColumnAttrs" rows="4"></textarea>
                                        <label class="form-label" for="msModalMColumnAttrs"
                                            style="margin-left: 0px;">Metric Column Attributes</label>
                                    </div>

                                    <div class="form-floating mb-4">
                                        <textarea class="form-control" id="msModalMaMetricAttrs"
                                            name="msModalMaMetricAttrs" rows="4"></textarea>
                                        <label class="form-label" for="msModalMaMetricAttrs"
                                            style="margin-left: 0px;">Metric Attributes</label>
                                    </div>

                                    <div class="row mb-4">
                                        <div class="col">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="msModalMIsActive">
                                                <label class="form-check-label" for="msModalMIsActive">Active
                                                    Mode</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="msModalMIsHelper">
                                                <label class="form-check-label" for="msModalMIsHelper">Helper
                                                    Mode</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="msModalMMasterOnly">
                                                <label class="form-check-label" for="msModalMMasterOnly">Master Only
                                                    Mode</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox"
                                                    id="msModalMStandbyOnly">
                                                <label class="form-check-label" for="msModalMStandbyOnly">Standby Only
                                                    Mode</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary btn-block"
                                    id="msModalFormSubmit">Save</button>
                                <button type="button" class="btn btn-secondary btn-block"
                                    data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>

            </html>