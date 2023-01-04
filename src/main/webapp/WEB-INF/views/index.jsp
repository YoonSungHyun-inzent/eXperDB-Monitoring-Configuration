<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <%@ page trimDirectiveWhitespaces="true" %>

            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="utf-8" />
                <title>experDB :: DBs to monitor</title>
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
                <script type="text/javascript" src="/resources/dbs.js?<%=System.currentTimeMillis()%>"></script>
            </head>

            <body class="sb-nav-fixed">
                <%@ include file="./sidebar/nav.jsp"%>
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid px-4">
                            <span style="float: left;">
                            <h1 class="mt-4">DBs</h1>
                            <ol class="breadcrumb mb-4">
                                <!-- <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li> -->
                                <li class="breadcrumb-item active">Databases under monitoring</li>
                            </ol>
                            </span>
                            <span style="float: right;">
                            <select class="form-select" aria-label="Default select example" style="width: 100%; float: right;">
                                <option selected>Dashboard link</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </span>
                            
                            <%-- <div class="card mb-4">
                                <div class="card-body">
                                    수집 대상 데이터 베이스 관리 화면 입니다.
                                    <a target="_blank" href="https://datatables.net/">official DataTables
                                        documentation</a>
                                    .
                                </div>
                        </div> --%>
                        <!-- <div id="jsGrid"></div> -->
                        <%-- <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                Databases
                            </div>
                            <div class="card-body">
                                <!-- grid 예정 -->
                            </div>
                </div> --%>
                <div id="jsGrid"></div>
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

                <div id="show_metrics_dialog" style="display:none">
                    <form id="show_metrics_dialog_form">
                        <table>
                            <colgroup>
                                <col width="35%" />
                                <col />
                            </colgroup>
                            <tbody></tbody>
                        </table>
                    </form>
                </div>

                <div id="copy_metrics_dialog" style="display:none">
                    <form id="copy_metrics_dialog_form">
                        <table>
                            <colgroup>
                                <col width="35%" />
                                <col />
                            </colgroup>
                            <tbody></tbody>
                        </table>
                        <div class="details-form-field">
                            <button type="submit" id="save">Save</button>
                        </div>
                    </form>
                </div>

                <div class="modal fade" id="dbsModal" tabindex="-1" aria-labelledby="dbsModalTitle" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="dbsModalTitle">DBs 등록</h5>
                                <div class="form-check form-switch" style="margin-left: 3%;">
                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                                    <label class="form-check-label" for="flexSwitchCheckDefault">Enabled</label>
                                </div>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <form id="dbsModalForm" class="needs-validation">
                                    <input type="hidden" id="dbsModalCategory">
                                    <input type="hidden" id="dbsModalId" name="dbsModalMdId">
                                    <!-- 2 column grid layout with text inputs for the first and last names -->
                                    <div class="row mb-4">
                                        <div class="col">
                                            <div class="form-floating">
                                                <input type="text" id="dbsModalUname" name="dbsModalMdUniqueName"
                                                    class="form-control" required>
                                                <label class="form-label" for="dbsModalUname"
                                                    style="margin-left: 0px;">Unique name</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-floating">
                                                <select id="dbsModalDBtype" name="dbsModalMdDbtype" class="form-select">
                                                    <option value="postgres">postgres</option>
                                                    <option value="postgres-continuous-discovery">
                                                        postgres-continuous-discovery</option>
                                                    <option value="pgbouncer">pgbouncer</option>
                                                    <option value="pgpool">pgpool</option>
                                                    <option value="patroni">patroni</option>
                                                    <option value="patroni-continuous-discovery">
                                                        patroni-continuous-discovery</option>
                                                    <option value="patroni-namespace-discovery">
                                                        patroni-namespace-discovery</option>
                                                </select>
                                                <label class="form-label" for="dbsModalDBtype"
                                                    style="margin-left: 0px;">DB type</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-4">
                                        <div class="col">
                                            <div class="form-floating">
                                                <input type="text" id="dbsModalHostName" name="dbsModalMdHostname"
                                                    class="form-control">
                                                <label class="form-label" for="dbsModalHostName"
                                                    style="margin-left: 0px;">DB host</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-floating">
                                                <input type="text" id="dbsModalPort" name="dbsModalMdPort"
                                                    class="form-control">
                                                <label class="form-label" for="dbsModalPort"
                                                    style="margin-left: 0px;">DB port</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-4">
                                        <div class="col">
                                            <div class="form-floating">
                                                <input type="text" id="dbsModalDbName" name="dbsModalMdDbname"
                                                    class="form-control">
                                                <label class="form-label" for="dbsModalDbName"
                                                    style="margin-left: 0px;">DB name</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-floating">
                                                <input type="text" id="dbsModalDbUserName" name="dbsModalMdUser"
                                                    class="form-control">
                                                <label class="form-label" for="dbsModalDbUserName"
                                                    style="margin-left: 0px;">DB User</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-4">
                                        <div class="col">
                                            <div class="form-floating">
                                                <input type="password" id="dbsModalDbPassword" name="dbsModalMdPassword"
                                                    class="form-control" required>
                                                <label class="form-label" for="dbsModalDbPassword"
                                                    style="margin-left: 0px;">DB password</label>
                                                <div class="invalid-feedback">
                                                    Please fill out this field.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-floating">
                                                <select id="dbsModalDbPasswordType" name="dbsModalMdPasswordType"
                                                    class="form-select">
                                                    <option value="plain-text">plain-text</option>
                                                    <option value="aes-gcm-256">aes-gcm-256</option>
                                                </select>
                                                <label class="form-label" for="dbsModalDbPasswordType"
                                                    style="margin-left: 0px;">Password Encryption</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-4">
                                        <div class="col">
                                            <div class="form-floating">
                                                <select id="dbsModalUpstream" name="dbsModalMsUpstreamHostname"
                                                    class="form-select"></select>
                                                <label class="form-label" for="dbsModalUpstream"
                                                    style="margin-left: 0px;">Upstream</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-floating">
                                                <input type="text" id="dbsModalSts"
                                                    name="dbsModalMdStatementTimeoutSeconds" class="form-control"
                                                    value="5" required>
                                                <label class="form-label" for="dbsModalSts"
                                                    style="margin-left: 0px;">Statement timeout[seconds]</label>
                                                <div class="invalid-feedback">
                                                    Please fill out this field.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-4">
                                        <div class="col">
                                            <div class="form-floating">
                                                <select id="dbsModalPresetConfig" name="dbsModalMdPresetConfigName"
                                                    class="form-select">
                                                    <option value=""></option>
                                                    <c:forEach items="${presetlist}" var="pc" varStatus="status">
                                                        <option value="${pc.pc_name}">${pc.pc_name}</option>
                                                    </c:forEach>
                                                </select>
                                                <label class="form-label" for="dbsModalPresetConfig"
                                                    style="margin-left: 0px;">Preset Metrics Config</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-floating">
                                                <select id="dbsModalPresetConfig2"
                                                    name="dbsModalMdPresetConfigNameStandby" class="form-select">
                                                    <option value=""></option>
                                                    <c:forEach items="${presetlist}" var="pc" varStatus="status">
                                                        <option value="${pc.pc_name}">${pc.pc_name}</option>
                                                    </c:forEach>
                                                </select>
                                                <label class="form-label" for="dbsModalPresetConfig2"
                                                    style="margin-left: 0px;">Standby Preset Metrics Config</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-4">
                                        <div class="col">
                                            <div class="form-floating">
                                                <input type="text" id="dbsModalGroup" name="dbsModalMdGroup"
                                                    class="form-control" required>
                                                <label class="form-label" for="dbsModalGroup"
                                                    style="margin-left: 0px;">Group</label>
                                                <div class="invalid-feedback">
                                                    Please fill out this field.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                        </div>
                                    </div>

                                    <div class="accordion accordion-flush" id="dbsModalAccordionFlush">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="dbsModalHeadingOne">
                                                <button class="accordion-button collapsed" type="button"
                                                    data-bs-toggle="collapse" data-bs-target="#dbsModalCollapseOne"
                                                    aria-expanded="false" aria-controls="dbsModalCollapseOne">
                                                    SSL Option #1
                                                </button>
                                            </h2>
                                            <div id="dbsModalCollapseOne" class="accordion-collapse collapse"
                                                aria-labelledby="dbsModalHeadingOne">
                                                <div class="accordion-body">
                                                    <div class="form-floating mb-4">
                                                        <select id="dbsModalSslMode" name="dbsModalMdSslmode"
                                                            class="form-select">
                                                            <option value="disable">disable</option>
                                                            <option value="require">require</option>
                                                            <option value="verify-ca">verify-ca</option>
                                                            <option value="verify-full">verify-full</option>
                                                        </select>
                                                        <label class="form-label" for="dbsModalSslMode"
                                                            style="margin-left: 0px;">SSL mode</label>
                                                    </div>
                                                    <div class="form-floating mb-4">
                                                        <input type="text" class="form-control" id="dbsModalRootCaPath"
                                                            name="dbsModalMdRootCaPath">
                                                        <label for="floatingInput">Root CA</label>
                                                    </div>
                                                    <div class="form-floating mb-4">
                                                        <input type="text" class="form-control" id="dbsModalCcp"
                                                            name="dbsModalMdClientCertPath">
                                                        <label for="floatingInput">Client cert</label>
                                                    </div>
                                                    <div class="form-floating mb-4">
                                                        <input type="text" class="form-control" id="dbsModalCkp"
                                                            name="dbsModalMdClientKeyPath">
                                                        <label for="floatingInput">Client key</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="dbsModalHeadingOne2">
                                                <button class="accordion-button collapsed" type="button"
                                                    data-bs-toggle="collapse" data-bs-target="#dbsModalCollapseOne2"
                                                    aria-expanded="false" aria-controls="dbsModalCollapseOne2">
                                                    Custom Option #1
                                                </button>
                                            </h2>
                                            <div id="dbsModalCollapseOne2" class="accordion-collapse collapse"
                                                aria-labelledby="dbsModalHeadingOne2">
                                                <div class="accordion-body">
                                                    <div class="form-floating mb-4">
                                                        <textarea class="form-control" id="dbsModalCustomTags"
                                                            name="dbsModalMdCustomTags" rows="4"></textarea>
                                                        <label class="form-label" for="dbsModalCustomTags"
                                                            style="margin-left: 0px;">Custom Tags</label>
                                                    </div>
                                                    <div class="form-floating mb-4">
                                                        <textarea class="form-control" id="dbsModalHostConfig"
                                                            name="dbsModalMdHostConfig" rows="4"></textarea>
                                                        <label class="form-label" for="dbsModalHostConfig"
                                                            style="margin-left: 0px;">Host Config</label>
                                                    </div>
                                                    <div class="form-floating mb-4">
                                                        <textarea class="form-control" id="dbsModalConfig"
                                                            name="dbsModalMdConfig" rows="4"></textarea>
                                                        <label class="form-label" for="dbsModalConfig"
                                                            style="margin-left: 0px;">Custom Metrics Config</label>
                                                    </div>
                                                    <div class="form-floating mb-4">
                                                        <textarea class="form-control" id="dbsModalConfig2"
                                                            name="dbsModalMdConfigStandby" rows="4"></textarea>
                                                        <label class="form-label" for="dbsModalConfig2"
                                                            style="margin-left: 0px;">Custom Metrics Standby
                                                            Config</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary btn-block"
                                    id="dbsModalFormSubmit">Save</button>
                                <button type="button" class="btn btn-secondary btn-block"
                                    data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <script>
                    var preset_configs = { "" : "",
                    <c:forEach items="${presetlist}" var="pc" varStatus="status">"${pc.pc_name}" : ${pc.pc_config} <c:choose><c:when test="${!status.last}">,</c:when> </c:choose></c:forEach>
                    };
                    var preset_configs_names = [ {name: "", value: ""},
                    <c:forEach items="${presetlist}" var="pc" varStatus="status"> {name: "${pc.pc_name}", value: "${pc.pc_name}"}  <c:choose><c:when test="${!status.last}">,</c:when> </c:choose></c:forEach>
                    ];
        
                </script>
            </body>

            </html>