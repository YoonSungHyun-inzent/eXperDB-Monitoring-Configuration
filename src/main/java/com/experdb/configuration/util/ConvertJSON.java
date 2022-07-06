package com.experdb.configuration.util;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class ConvertJSON {

    @SuppressWarnings({ "unchecked" })
    public static JSONArray convertListToJson(List<Map<String, Object>> listMap) {

        JSONArray jsonArray = new JSONArray();
        for (Map<String, Object> map : listMap) {
            jsonArray.add(convertMapToJson(map));
        }
        return jsonArray;

    }

    @SuppressWarnings({ "unchecked" })
    public static JSONObject convertMapToJson(Map<String, Object> map) {

        JSONObject json = new JSONObject();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            json.put(key, value);

        }
        return json;
    }
}
