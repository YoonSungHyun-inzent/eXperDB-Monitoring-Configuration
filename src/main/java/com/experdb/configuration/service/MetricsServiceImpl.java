package com.experdb.configuration.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.experdb.configuration.mapper.MatricsMapper;
import com.experdb.configuration.service.serviceInterface.MetricsService;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MetricsServiceImpl implements MetricsService{
    private MatricsMapper matricsMapper;
    
    @Override
    public List<Map<String, Object>> selectPresetConfigs() throws Exception {
        return matricsMapper.selectPresetConfigs();
    }

    @Override
    public List<Map<String, Object>> selectMetrics() throws Exception {
        return matricsMapper.selectMetrics();
    }

    @Override
    public int updatePresetConfigs(HashMap<String, Object> map) throws Exception {
        return matricsMapper.updatePresetConfigs(map);
    }

    @Override
    public int insertPresetConfigs(HashMap<String, Object> map) throws Exception {
        return matricsMapper.insertPresetConfigs(map);
    }

    @Override
    public int deletePresetConfigs(HashMap<String, Object> map) throws Exception {
        return matricsMapper.deletePresetConfigs(map);
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
    };
}
