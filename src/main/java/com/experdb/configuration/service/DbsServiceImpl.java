package com.experdb.configuration.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.experdb.configuration.mapper.DbsMapper;
import com.experdb.configuration.service.serviceInterface.DbsService;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@AllArgsConstructor
public class DbsServiceImpl implements DbsService {
    private DbsMapper dbsMapper;

    @Override
    public List<Map<String, Object>> selectAllMonitoredDB() throws Exception {
        return dbsMapper.selectAllMonitoredDB();
    }

    @Override
    public List<Map<String, Object>> selectPresetConfig() throws Exception {
        return dbsMapper.selectPresetConfig();
    }

    @Override
    public int insertMonitoredDb(HashMap<String, Object> map) throws Exception {
        String[] ChkJsonParam = new String[] {"md_config", "md_config_standby", "md_host_config", "md_custom_tags"} ;
        HashMap<String, Object> tempMap = new HashMap<>();

        Arrays.sort(ChkJsonParam);

        map.forEach( (key, value) -> {
            if(Arrays.binarySearch(ChkJsonParam, key) > -1){
                if(StringUtils.isEmpty(value)){
                    tempMap.put(key, null);
                }else{
                    tempMap.put(key, value);
                }
            }else{
                tempMap.put(key, value);
            }
        }
        );

        System.out.println("tempMap :: " + tempMap.toString());

        return dbsMapper.insertMonitoredDb(tempMap);
    }

    @Override
    public int updateMonitoredDb(HashMap<String, Object> map) throws Exception {
        return dbsMapper.updateMonitoredDb(map);
    }

    @Override
    public List<Map<String, Object>> selectColumsMonitoredDB() throws Exception {
        return dbsMapper.selectColumsMonitoredDB();
    }

    @Override
    public int deleteMonitoredDb(HashMap<String, Object> map) throws Exception {
        return dbsMapper.deleteMonitoredDb(map);
    }
    
}
