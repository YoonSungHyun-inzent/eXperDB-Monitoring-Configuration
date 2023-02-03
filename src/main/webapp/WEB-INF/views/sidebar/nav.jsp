<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%> 
<nav class="sb-topnav navbar navbar-expand navbar-white bg-dark">
    <!-- Navbar Brand-->
    <a class="navbar-brand ps-3" href="/"><img src="/resources/logo.png" alt="experDB logo"
            height="50px"></a>
    <!-- Sidebar Toggle-->
    <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i
            class="fas fa-bars"></i></button>
    <!-- Navbar Search-->
    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <%-- <div class="input-group">
            <input class="form-control" type="text" placeholder="Search for..."
                aria-label="Search for..." aria-describedby="btnNavbarSearch">
            <button class="btn btn-primary" id="btnNavbarSearch" name="btnNavbarSearch"
                type="button"><svg class="svg-inline--fa fa-magnifying-glass" aria-hidden="true"
                    focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                    <path fill="currentColor"
                        d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z">
                    </path>
                </svg><!-- <i class="fas fa-search"></i> Font Awesome fontawesome.com --></button>
            </div> --%>
    </form>
    <!-- Navbar-->
    <%-- <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button"
                data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#!">Settings</a></li>
                <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                <li>
                    <hr class="dropdown-divider" />
                </li>
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
                    <div class="sb-sidenav-menu-heading">experdb-Monitoring</div>
                    <a class="nav-link" href="http://43.201.115.245:3000/d/experdb-multi-cluster/multi-cluster?orgId=1">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                        Monitoring server
                    </a>

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
                    <div class="sb-sidenav-menu-heading">업무관리</div>
                    <a class="nav-link collapsed" href="/thresholds">
                        <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                        Server-Threshold
                    </a>
                </div>
            </div>
            <%-- <div class="sb-sidenav-footer">
                <div class="small">Logged in as:</div>
                eXperDB
    </div> --%>
    </nav>
</div>