package com.experdb.configuration.util;

import java.util.HashMap;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class GrafanaAPIUtil {
    private final static String GRAFANA_API_KEY = "Bearer glsa_5Xw6GE4oVyZCqNhUgtLOTBvMppiUMMTQ_3803680b";

    public static String sendApi(String url, HttpMethod method) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        String jsonInString = "";
       
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory ();
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(factory);

        HttpHeaders header = new HttpHeaders();
        header.add("Authorization", GRAFANA_API_KEY);
        HttpEntity<?> entity = new HttpEntity<>(header);
        
        UriComponents uri = UriComponentsBuilder.fromHttpUrl(url).build();

        System.out.println("uri = " + uri.toString());
        
        ResponseEntity<?> resultMap = restTemplate.exchange(uri.toString(), method, entity, Object.class);
        
        System.out.println("uri = " + uri.toUriString());
        result.put("statusCode", resultMap.getStatusCodeValue());
        result.put("header", resultMap.getHeaders());
        result.put("body", resultMap.getBody());

        ObjectMapper mapper = new ObjectMapper();
        try {
            jsonInString = mapper.writeValueAsString(resultMap.getBody());
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return jsonInString;
    }

    public String createProvisionedAlertRuleJsonString(String ruleName, String ruleCondition, String dashboardId, String orgId, String folderId) {
        JsonObject postData = new JsonObject();
        postData.addProperty("name", ruleName);
        postData.addProperty("dashboardId", dashboardId);
        postData.addProperty("orgId", orgId);
        postData.addProperty("folderId", folderId);
    
        JsonArray conditions = new JsonArray();
        JsonObject condition = new JsonObject();
        condition.addProperty("query", ruleCondition);
        JsonObject evaluator = new JsonObject();
        evaluator.addProperty("type", "gt");
        evaluator.add("params", new JsonArray());
        condition.add("evaluator", evaluator);
        JsonObject reducer = new JsonObject();
        reducer.addProperty("type", "avg");
        reducer.add("params", new JsonArray());
        condition.add("reducer", reducer);
        JsonObject operator = new JsonObject();
        operator.addProperty("type", "and");
        condition.add("operator", operator);
        conditions.add(condition);
    
        postData.add("conditions", conditions);
        postData.add("notifications", new JsonArray());

        Gson gson = new Gson();
        return gson.toJson(postData);
    }
}
