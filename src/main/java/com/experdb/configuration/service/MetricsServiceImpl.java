package com.experdb.configuration.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.experdb.configuration.mapper.MatricsMapper;
import com.experdb.configuration.service.serviceInterface.MetricsService;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Service
@AllArgsConstructor
public class MetricsServiceImpl implements MetricsService{
    private MatricsMapper matricsMapper;

    @Override
    public List<Map<String, Object>> selectMetrics(HashMap<String,Object> map) throws Exception {
        HashMap<String, Object> tempHashMap = new HashMap<>();
        tempHashMap = map;

        TempSize tempSize = new TempSize();
       
        tempHashMap.forEach( (key, value) -> {
            if(!StringUtils.isEmpty(value)){
                tempSize.incrementSize();
            }
        });
        
        tempHashMap.put("size", tempSize.size);
        
        // System.out.println(tempHashMap.toString());

        return matricsMapper.selectMetrics(tempHashMap);
    }

    @Override
    public int insertMetric(HashMap<String, Object> map) throws Exception {
        return matricsMapper.insertMetric(map);
    }

    @Override
    public int updateMetric(HashMap<String, Object> map) throws Exception {
        return matricsMapper.updateMetric(map);
    }

    @Override
    public int deleteMetric(HashMap<String, Object> map) throws Exception {
        return matricsMapper.deleteMetric(map);
    }

    @Override
    public List<Map<String, Object>> selectMetricsDetail(String id) throws Exception {
        return matricsMapper.selectMetricsDetail(id);
    };
}

@Getter
@Setter
class TempSize{    
    int size = 0;

    public void incrementSize(){
        size++;
    }
}