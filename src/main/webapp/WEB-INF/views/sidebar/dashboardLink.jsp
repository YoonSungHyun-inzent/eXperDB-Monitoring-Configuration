<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%> 
<span class="dashboard-select">
    <select onchange="if(this.value) location.href=(this.value);" class="form-select" aria-label="Default select example" >
        <option selected>Dashboard link</option>
        <option value="/presets">preset</option>
        <option value="/metrics">metric</option>f
        <option value="/thresholds">Server-Threshold</option>
    </select>
</span>
