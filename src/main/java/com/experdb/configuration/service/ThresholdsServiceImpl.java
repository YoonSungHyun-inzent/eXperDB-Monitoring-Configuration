package com.experdb.configuration.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.experdb.configuration.mapper.ThresholdsMapper;
import com.experdb.configuration.service.serviceInterface.ThresholdsService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ThresholdsServiceImpl implements ThresholdsService {
    private ThresholdsMapper thresholdsMapper;
    @Override
    public List<Map<String, Object>> selectThresholds() throws Exception {
        return thresholdsMapper.selectThresholds();
    }
    @Override
    public int insertThresholds(HashMap<String, Object> map) throws Exception {
        return thresholdsMapper.insertThresholds(map);
    }
    @Override
    public int updateThresholds(HashMap<String, Object> map) throws Exception {
        return thresholdsMapper.updateThresholds(map);
    }
    @Override
    public int deleteThresholds(HashMap<String, Object> map) throws Exception {
        return thresholdsMapper.deleteThresholds(map);
    }
    
}
