package com.experdb.configuration.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.experdb.configuration.service.serviceInterface.DbsService;
import com.experdb.configuration.service.serviceInterface.MetricsService;
import com.experdb.configuration.service.serviceInterface.PresetsService;
import com.experdb.configuration.service.serviceInterface.ThresholdsService;
import com.experdb.configuration.util.ConvertJSON;
import com.experdb.configuration.util.GrafanaAPIUtil;
import com.experdb.configuration.util.SupervisorAPIUtil;

import lombok.AllArgsConstructor;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@AllArgsConstructor 
public class ConfigController {
    private DbsService dbsService;
    private MetricsService metricsService;
    private PresetsService presetsService;
    private ThresholdsService thresholdsService;
    
    @RequestMapping(value = "/")
    // public String index(HttpServletRequest request, HttpServletResponse response,@RequestHeader("Cookie") String cookie, Model model) throws Exception {
    public String index(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        return "dbs";
    }

    // @ExceptionHandler({MissingRequestHeaderException.class})
    // public Object missingRequestHeaderException(MissingRequestHeaderException exception) {
    //     return ResponseEntity.badRequest().body("<script>alert('잘못된 경로로 접근하셨습니다.'); history.go(-1);</script>");
    // }

    @RequestMapping(value = "/dbs")
    public String dbs(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        return "redirect:/";
    }

    @RequestMapping(value = "/metrics")
    public String metric(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        return "metrics";
    }

    @RequestMapping(value = "/presets")
    public String preset(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        return "presets";
    }

    @RequestMapping(value = "/thresholds")
    public String thresholds(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        return "thresholds";
    }

    /* 
     * Monitored
     */

    @ResponseBody
    @RequestMapping(value = "/monitored-db/colums", method = RequestMethod.GET)
    // @RequestMapping(value = "/selectColumsMonitoredDB", method = RequestMethod.POST)
    public JSONArray selectColumsMonitoredDB(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        List<Map<String,Object>> dbsList = dbsService.selectColumsMonitoredDB();
        JSONArray dbsJsonArray = ConvertJSON.convertListToJson(dbsList);
        // System.out.println("dbsJsonArray :: " + dbsJsonArray.toJSONString());
        return dbsJsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/monitored-db", method = RequestMethod.GET)
    // @RequestMapping(value = "/selectMonitoredDb", method = RequestMethod.POST)
    public JSONArray selectMonitoredDb(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        List<Map<String,Object>> dbsList = dbsService.selectAllMonitoredDB();
        JSONArray dbsJsonArray = ConvertJSON.convertListToJson(dbsList);
        // System.out.println("dbsJsonArray :: " + dbsJsonArray.toJSONString());
        return dbsJsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/monitored-db/{md_id}", method = RequestMethod.GET)
    // @RequestMapping(value = "/selectMonitoredDbDetail", method = RequestMethod.GET)
    public JSONArray selectMonitoredDbDetail(HttpServletRequest request, HttpServletResponse response,@PathVariable("md_id") String md_id, Model model) throws Exception {
        // String md_id = (String) paramMap.get("md_id");

        System.out.println("md_id :: " + md_id);

        List<Map<String,Object>> dbsList = dbsService.selectMonitoredDbDetail(md_id);
        JSONArray dbsJsonArray = ConvertJSON.convertListToJson(dbsList);
        // System.out.println("dbsJsonArray :: " + paramMap.toString());
        
        return dbsJsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/monitored-db", method = RequestMethod.POST)
    // @RequestMapping(value = "/insertMonitoredDb")
    public JSONObject insertMonitoredDb(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        System.out.println("dbsJsonArray :: " + paramMap.toString());
        int i = dbsService.insertMonitoredDb(paramMap);

        JSONObject result = new JSONObject();

        result.put("result", i);

        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = "/monitored-db", method = RequestMethod.PUT)
    // @RequestMapping(value = "/updateMonitoredDb")
    public JSONObject updateMonitoredDb(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int i = dbsService.updateMonitoredDb(paramMap);
        
        JSONObject result = new JSONObject();

        result.put("result", i);

        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/monitored-db", method = RequestMethod.DELETE)
    // @RequestMapping(value = "/deleteMonitoredDb")
    public JSONObject deleteMonitoredDb(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int i = dbsService.deleteMonitoredDb(paramMap);
        
        JSONObject result = new JSONObject();

        result.put("result", i);

        return result;
    }

    /* 
     * Metrics
     */

    @ResponseBody
    @RequestMapping(value = "/metric", method = RequestMethod.GET)
    // @RequestMapping(value = "/selectMetrics")
    public JSONArray selectMetrics(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        List<Map<String,Object>> metricsList = metricsService.selectMetrics(paramMap);
        JSONArray metricsJsonArray = ConvertJSON.convertListToJson(metricsList);

        // System.out.println("dbsJsonArray :: " + dbsJsonArray.toJSONString());
        
        return metricsJsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/metric/{m_id}", method = RequestMethod.GET)
    // @RequestMapping(value = "/selectMetricsDetail", method = RequestMethod.GET)
    public JSONArray selectMetricsDetail(HttpServletRequest request, HttpServletResponse response,@PathVariable("m_id") String m_id, Model model) throws Exception {
        // String mId = (String) paramMap.get("m_id");
        List<Map<String,Object>> metricsList = metricsService.selectMetricsDetail(m_id);
        JSONArray metricsJsonArray = ConvertJSON.convertListToJson(metricsList);

        // System.out.println("dbsJsonArray :: " + dbsJsonArray.toJSONString());
        
        return metricsJsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/metric", method = RequestMethod.POST)
    // @RequestMapping(value = "/insertMetric")
    public JSONObject insertMetric(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        System.out.println("dbsJsonArray :: " + paramMap.toString());
        int resultCount = metricsService.insertMetric(paramMap);
        JSONObject result = new JSONObject();

        result.put("result", resultCount);

        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = "/metric", method = RequestMethod.PUT)
    // @RequestMapping(value = "/updateMetric")
    public JSONObject updateMetric(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int resultCount = metricsService.updateMetric(paramMap);
        JSONObject result = new JSONObject();

        result.put("result", resultCount);

        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/metric", method = RequestMethod.DELETE)
    // @RequestMapping(value = "/deleteMetric")
    public JSONObject deleteMetric(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int resultCount = metricsService.deleteMetric(paramMap);
        JSONObject result = new JSONObject();

        result.put("result", resultCount);

        return result;
    }

    /* 
     * PresetConfigs
     */

     @ResponseBody
     @RequestMapping(value = "/preset-configs", method = RequestMethod.GET)
     // @RequestMapping(value = "/selectPresetConfigs", method = RequestMethod.GET)
     public JSONArray selectPresetConfigs(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
         List<Map<String,Object>> presetsList = presetsService.selectPresetConfigs();
         JSONArray presetsJsonArray = ConvertJSON.convertListToJson(presetsList);
 
         // System.out.println("dbsJsonArray :: " + dbsJsonArray.toJSONString());
         
         return presetsJsonArray;
     }
 
     @ResponseBody
     @RequestMapping(value = "/preset-configs/{pc_name}", method = RequestMethod.GET)
     // @RequestMapping(value = "/selectPresetConfigsDetail", method = RequestMethod.GET)
     public JSONArray selectPresetConfigsDetail(HttpServletRequest request, HttpServletResponse response,@PathVariable("pc_name") String pc_name , Model model) throws Exception {
         // String pc_name = (String) paramMap.get("pc_name");
         
         List<Map<String,Object>> presetsList = presetsService.selectPresetConfigsDetail(pc_name);
         JSONArray presetsJsonArray = ConvertJSON.convertListToJson(presetsList);
 
         // System.out.println("dbsJsonArray :: " + dbsJsonArray.toJSONString());
         
         return presetsJsonArray;
     }
    
    @ResponseBody
    @RequestMapping(value = "/preset-configs", method = RequestMethod.POST)
    // @RequestMapping(value = "/insertPresetConfigs")
    public JSONObject insertPresetConfigs(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int preset = presetsService.insertPresetConfigs(paramMap);
        JSONObject result = new JSONObject();

        result.put("result", preset);

        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = "/preset-configs", method = RequestMethod.PUT)
    // @RequestMapping(value = "/updatePresetConfigs")
    public JSONObject updatePresetConfigs(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int preset = presetsService.updatePresetConfigs(paramMap);
        JSONObject result = new JSONObject();

        result.put("result", preset);

        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/preset-configs", method = RequestMethod.DELETE)
    // @RequestMapping(value = "/deletePresetConfigs")
    public JSONObject deletePresetConfigs(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int preset = presetsService.deletePresetConfigs(paramMap);
        JSONObject result = new JSONObject();

        result.put("result", preset);

        return result;
    }

    /*
     * Thresholds
     */

    @ResponseBody
    @RequestMapping(value = "/thresholds", method = RequestMethod.GET)
    public JSONArray selectThresholds(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        List<Map<String, Object>> thresholdList = thresholdsService.selectThresholds();
        JSONArray thresholdJsonArray = ConvertJSON.convertListToJson(thresholdList);
        return thresholdJsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/thresholds", method = RequestMethod.POST)
    // @RequestMapping(value = "/insertThresholds")
    public JSONObject insertThresholds(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int thresholds = thresholdsService.insertThresholds(paramMap);
        JSONObject result = new JSONObject();
        result.put("result", thresholds);
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/thresholds", method = RequestMethod.PUT)
    // @RequestMapping(value = "/updateThresholds")
    public JSONObject updateThresholds(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        System.out.println("paramMap" + paramMap.get("number").getClass());
        int thresholds = thresholdsService.updateThresholds(paramMap);
        JSONObject result = new JSONObject();
        System.out.println(paramMap + " ::: " + response);
        result.put("result", thresholds);
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/thresholds", method = RequestMethod.DELETE)
    // @RequestMapping(value = "/deleteThresholds")
    public JSONObject deleteThresholds(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int thresholds = thresholdsService.deleteThresholds(paramMap);
        JSONObject result = new JSONObject();
        System.out.println(paramMap + " ::: " + response);
        result.put("result", thresholds);
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/alert",  method = RequestMethod.GET)
    public JSONObject getAlert(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        String url = "http://192.168.99.49:3000/api/v1/provisioning/alert-rules";
        String alert = GrafanaAPIUtil.sendApi(url, HttpMethod.GET);
        
        System.out.println(request.getRequestURL());

        JSONObject result = new JSONObject();
        result.put("result", alert);
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = "/process",  method = RequestMethod.GET)
    public JSONObject getSupervisorStatus(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        SupervisorAPIUtil control = new SupervisorAPIUtil();
        List<Map<String, Object>> a = control.getAllProcessInfo();

        for (Map<String, Object> processInfo : a) {
            System.out.println("Process Name: " + processInfo.get("name"));
            System.out.println("Process State: " + processInfo.get("state"));
        }
        
        JSONObject result = new JSONObject();
        result.put("result", a);
        return result;
    }

    @RequestMapping(value = "/favicon.ico", method = RequestMethod.GET)
        public void favicon( HttpServletRequest request, HttpServletResponse reponse ) {
        try {
            reponse.sendRedirect("/resources/favicon.ico");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // @ResponseBody
    // @GetMapping(value = "/wal")
    // public List<InfluxWAL> wal(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
    //     return influxService.selectTestDB();
    // }
}