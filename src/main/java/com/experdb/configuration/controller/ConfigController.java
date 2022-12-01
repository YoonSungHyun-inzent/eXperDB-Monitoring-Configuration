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
import com.experdb.configuration.util.ConvertJSON;

import lombok.AllArgsConstructor;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestHeader;
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
    
    @RequestMapping(value = "/")
    // public String index(HttpServletRequest request, HttpServletResponse response,@RequestHeader("Cookie") String cookie, Model model) throws Exception {
    public String index(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        List<Map<String,Object>> presetList = dbsService.selectPresetConfig();
        model.addAttribute("presetlist", presetList);        
        
        return "index";
    }

    // @ExceptionHandler({MissingRequestHeaderException.class})
    // public Object missingRequestHeaderException(MissingRequestHeaderException exception) {
    //     return ResponseEntity.badRequest().body("<script>alert('잘못된 경로로 접근하셨습니다.'); history.go(-1);</script>");
    // }

    @RequestMapping(value = "/dbs")
    public String dbs(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        return "redirect:/";
    }

    @RequestMapping(value = "metrics")
    public String metric(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        return "metrics";
    }

    @RequestMapping(value = "presets")
    public String preset(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        return "presets";
    }

    @ResponseBody
    @RequestMapping(value = "/selectColumsMonitoredDB", method = RequestMethod.POST)
    public JSONArray selectColumsMonitoredDB(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        List<Map<String,Object>> dbsList = dbsService.selectColumsMonitoredDB();
        JSONArray dbsJsonArray = ConvertJSON.convertListToJson(dbsList);

        // System.out.println("dbsJsonArray :: " + dbsJsonArray.toJSONString());
        
        return dbsJsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/selectMonitoredDb", method = RequestMethod.POST)
    public JSONArray selectMonitoredDb(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        List<Map<String,Object>> dbsList = dbsService.selectAllMonitoredDB();
        JSONArray dbsJsonArray = ConvertJSON.convertListToJson(dbsList);

        // System.out.println("dbsJsonArray :: " + dbsJsonArray.toJSONString());
        
        return dbsJsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/selectMonitoredDbDetail", method = RequestMethod.GET)
    public JSONArray selectMonitoredDbDetail(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        String md_id = (String) paramMap.get("md_id");

        List<Map<String,Object>> dbsList = dbsService.selectMonitoredDbDetail(md_id);
        JSONArray dbsJsonArray = ConvertJSON.convertListToJson(dbsList);


        // System.out.println("dbsJsonArray :: " + paramMap.toString());
        
        return dbsJsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/selectPresetConfigs", method = RequestMethod.POST)
    public JSONArray selectPresetConfigs(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        List<Map<String,Object>> presetsList = presetsService.selectPresetConfigs();
        JSONArray presetsJsonArray = ConvertJSON.convertListToJson(presetsList);

        // System.out.println("dbsJsonArray :: " + dbsJsonArray.toJSONString());
        
        return presetsJsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/selectPresetConfigsDetail", method = RequestMethod.GET)
    public JSONArray selectPresetConfigsDetail(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        String pc_name = (String) paramMap.get("pc_name");
        
        List<Map<String,Object>> presetsList = presetsService.selectPresetConfigsDetail(pc_name);
        JSONArray presetsJsonArray = ConvertJSON.convertListToJson(presetsList);

        // System.out.println("dbsJsonArray :: " + dbsJsonArray.toJSONString());
        
        return presetsJsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/selectMetrics")
    public JSONArray selectMetrics(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        List<Map<String,Object>> metricsList = metricsService.selectMetrics(paramMap);
        JSONArray metricsJsonArray = ConvertJSON.convertListToJson(metricsList);

        // System.out.println("dbsJsonArray :: " + dbsJsonArray.toJSONString());
        
        return metricsJsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/selectMetricsDetail", method = RequestMethod.GET)
    public JSONArray selectMetricsDetail(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        String mId = (String) paramMap.get("m_id");
        List<Map<String,Object>> metricsList = metricsService.selectMetricsDetail(mId);
        JSONArray metricsJsonArray = ConvertJSON.convertListToJson(metricsList);

        // System.out.println("dbsJsonArray :: " + dbsJsonArray.toJSONString());
        
        return metricsJsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/insertMonitoredDb")
    public JSONObject insertMonitoredDb(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        System.out.println("dbsJsonArray :: " + paramMap.toString());
        int i = dbsService.insertMonitoredDb(paramMap);

        JSONObject result = new JSONObject();

        result.put("result", i);

        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = "/updateMonitoredDb")
    public JSONObject updateMonitoredDb(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int i = dbsService.updateMonitoredDb(paramMap);
        
        JSONObject result = new JSONObject();

        result.put("result", i);

        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/deleteMonitoredDb")
    public JSONObject deleteMonitoredDb(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int i = dbsService.deleteMonitoredDb(paramMap);
        
        JSONObject result = new JSONObject();

        result.put("result", i);

        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = "/insertMetric")
    public JSONObject insertMetric(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        System.out.println("dbsJsonArray :: " + paramMap.toString());
        int resultCount = metricsService.insertMetric(paramMap);
        JSONObject result = new JSONObject();

        result.put("result", resultCount);

        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = "/updateMetric")
    public JSONObject updateMetric(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int resultCount = metricsService.updateMetric(paramMap);
        JSONObject result = new JSONObject();

        result.put("result", resultCount);

        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/deleteMetric")
    public JSONObject deleteMetric(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int resultCount = metricsService.deleteMetric(paramMap);
        JSONObject result = new JSONObject();

        result.put("result", resultCount);

        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = "/insertPresetConfigs")
    public JSONObject insertPresetConfigs(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int preset = presetsService.insertPresetConfigs(paramMap);
        JSONObject result = new JSONObject();

        result.put("result", preset);

        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = "/updatePresetConfigs")
    public JSONObject updatePresetConfigs(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int preset = presetsService.updatePresetConfigs(paramMap);
        JSONObject result = new JSONObject();

        result.put("result", preset);

        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/deletePresetConfigs")
    public JSONObject deletePresetConfigs(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int preset = presetsService.deletePresetConfigs(paramMap);
        JSONObject result = new JSONObject();

        //인정
        result.put("result", preset);

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