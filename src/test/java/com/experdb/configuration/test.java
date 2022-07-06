package com.experdb.configuration;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.experdb.configuration.service.serviceInterface.DbsService;
import com.experdb.configuration.service.serviceInterface.MetricsService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import net.minidev.json.JSONObject;


@SpringBootTest
public class test {
    @Autowired
    private MetricsService metricService;
    
    @Autowired
    private DbsService dbsService;

    @Test
    public void mapper() throws Exception {
        // Select all users;
        //List<MetricDTO> testList = metricService.selectAllMectirs();
        List<Map<String, Object>> testMap =  dbsService.selectAllMonitoredDB();
        // HashMap<String, Object> temp = new HashMap<>();
        // String d = "md_id=36, md_unique_name=experdb_new_standby, md_dbtype=postgres, md_hostname=192.168.99.31, md_port=5432, md_dbname=experdb, md_include_pattern=, md_exclude_pattern=, md_user=pgwatch2, md_password=***, md_password_type=plain-text, md_sslmode=disable, md_root_ca_path=, md_client_cert_path=, md_client_key_path=, md_group=2, md_preset_config_name=full, md_config=  , md_preset_config_name_standby=exhaustive, md_config_standby=  , md_host_config=  , md_custom_tags=  , md_statement_timeout_seconds=5, save=Save";

        // Map<String, String> map = Pattern.compile("/") .splitAsStream(d.trim()) .map(i -> i.split("=", 2)) .collect(Collectors.toMap(a -> a[0], a -> a[1]));

        // temp.putAll(map);

        // System.out.println("testList :: " + temp);
        // System.out.println(temp.keySet());
        // temp.replace("md_config", new JSONObject());

        System.out.println("testMap :: " + testMap);
        
        // for (Map<String, Object> serMap : testMap) {
        //     for (Entry<String, Object> map : serMap.entrySet() ) {
        //         System.out.println(map.getKey());
        //     }
        // }
		// for (MetricDTO userVO : testList) {
		// 	System.out.println(userVO.getM_name());
		// }
    }
}
