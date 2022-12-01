<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page trimDirectiveWhitespaces="true" %>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>experDB :: Metrics and preset configs</title>
        <link rel="stylesheet" href="/resources/custom.css">
        <link rel="stylesheet" href="/resources/css/styles.css">

        <link type="text/css" rel="stylesheet" href="https://code.jquery.com/ui/1.11.2/themes/cupertino/jquery-ui.css">

        <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" />
        <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />
        
        <style>
            .jsgrid-row, .jsgrid-alt-row{
                height: 60px;
            }
            #jsGridPresetConfig .jsgrid-row, .jsgrid-alt-row{
                height: 40px;
            }
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
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
        <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script type="text/javascript" src="/resources/grid/jsgrid.js?<%=System.currentTimeMillis()%>"></script>
        <script type="text/javascript" src="/resources/grid/grid.field.custom.js"></script>
        <script type="text/javascript" src="/resources/common/common_script.js"></script>
        <script type="text/javascript" src="/resources/presets.js"></script>
    </head>
    <body class="sb-nav-fixed">
        <nav class="sb-topnav navbar navbar-expand navbar-white bg-dark">
            <!-- Navbar Brand-->
            <a class="navbar-brand ps-3" href="/"><img src="/resources/logo.png" alt="experDB logo" height="50px"></a>
            <!-- Sidebar Toggle-->
            <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
            <!-- Navbar Search-->
            <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <%-- <div class="input-group">
                    <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch">
                    <button class="btn btn-primary" id="btnNavbarSearch" name="btnNavbarSearch" type="button"><svg class="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"></path></svg><!-- <i class="fas fa-search"></i> Font Awesome fontawesome.com --></button>
                </div> --%>
            </form>
            <!-- Navbar-->
            <%-- <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#!">Settings</a></li>
                        <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="#!">Logout</a></li>
                    </ul>
                </li>
            </ul> --%>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">DBs</div>
                            <a class="nav-link" href="/dbs">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Database 관리
                            </a>
                            <div class="sb-sidenav-menu-heading">Metrics</div>
                            <a class="nav-link collapsed" href="/presets">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Preset 관리
                            </a>
                            <a class="nav-link collapsed" href="/metrics">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Metric 관리
                            </a>
                        </div>
                    </div>
                    <%-- <div class="sb-sidenav-footer">
                        <div class="small">Logged in as:</div>
                        eXperDB
                    </div> --%>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Presets</h1>
                        <ol class="breadcrumb mb-4">
                            <!-- <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li> -->
                            <li class="breadcrumb-item active">Preset Configs</li>
                        </ol>
                        <%-- <div class="card mb-4">
                            <div class="card-body">
                                수집 대상 데이터 베이스 관리 화면 입니다.
                                <a target="_blank" href="https://datatables.net/">official DataTables documentation</a>
                                .
                            </div>
                        </div> --%>
                        <div id="jsGridPreset"></div>
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
        <div class="modal fade" id="psModal" tabindex="-1" aria-labelledby="psModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="psModalTitle">Preset 등록</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <form id="psModalForm">
                        <input type="hidden" id="psModalCategory">
                        <!-- 2 column grid layout with text inputs for the first and last names -->
                        <div class="form-floating mb-4">
                            <input type="text" id="psModalName" name="psModalPcName" class="form-control" readonly>
                            <label class="form-label" for="psModalUname" style="margin-left: 0px;">Preset Name</label>
                        </div>

                        <div class="form-floating mb-4">
                            <textarea class="form-control" id="psModalPcDescription" name="psModalPcDescription" rows="5"></textarea>
                            <label for="floatingInput">Description</label>
                        </div>

                        <div id="jsGridPresetConfig"></div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-block" id="psModalFormSubmit">Save</button>
                    <button type="button" class="btn btn-secondary btn-block" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
        </div>
    </body>
</html>
