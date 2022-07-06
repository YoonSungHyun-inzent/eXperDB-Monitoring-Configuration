package com.experdb.configuration.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.experdb.configuration.service.serviceInterface.DbsService;
import com.experdb.configuration.service.serviceInterface.MetricsService;
import com.experdb.configuration.util.ConvertJSON;

import lombok.AllArgsConstructor;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@AllArgsConstructor 
public class configController {
    private DbsService dbsService;
    private MetricsService metricsService;
    
    @RequestMapping(value = "/")
    public String index(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        // List<Map<String,Object>> dbsList = dbsService.selectAllMonitoredDB();
        List<Map<String,Object>> presetList = dbsService.selectPresetConfig();
        // List<Map<String,Object>> columList = dbsService.selectColumsMonitoredDB();
        // model.addAttribute("dbslist", dbsList);        
        model.addAttribute("presetlist", presetList);        
        // model.addAttribute("columList", columList);        
        
        return "index";
    }

    @RequestMapping(value = "/dbs")
    public String dbs(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        return "redirect:/";
    }

    @RequestMapping(value = "metrics")
    public String metric(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        return "metrics";
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
    @RequestMapping(value = "/selectPresetConfigs", method = RequestMethod.POST)
    public JSONArray selectPresetConfigs(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        List<Map<String,Object>> metricsList = metricsService.selectPresetConfigs();
        JSONArray metricsJsonArray = ConvertJSON.convertListToJson(metricsList);

        // System.out.println("dbsJsonArray :: " + dbsJsonArray.toJSONString());
        
        return metricsJsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/selectMetrics", method = RequestMethod.POST)
    public JSONArray selectMetrics(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        List<Map<String,Object>> metricsList = metricsService.selectMetrics();
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
        int preset = metricsService.insertPresetConfigs(paramMap);
        JSONObject result = new JSONObject();

        result.put("result", preset);

        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = "/updatePresetConfigs")
    public JSONObject updatePresetConfigs(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int preset = metricsService.updatePresetConfigs(paramMap);
        JSONObject result = new JSONObject();

        result.put("result", preset);

        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/deletePresetConfigs")
    public JSONObject deletePresetConfigs(HttpServletRequest request, HttpServletResponse response,@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        int preset = metricsService.deletePresetConfigs(paramMap);
        JSONObject result = new JSONObject();

        //인정
        result.put("result", preset);

        return result;
    }
}
