package com.experdb.configuration.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.experdb.configuration.mapper.PresetsMapper;
import com.experdb.configuration.service.serviceInterface.PresetsService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PresetsServiceImpl implements PresetsService{
    private PresetsMapper presetsMapper;

    @Override
    public List<Map<String, Object>> selectPresetConfigs() throws Exception {
        return presetsMapper.selectPresetConfigs();
    }

    @Override
    public int updatePresetConfigs(HashMap<String, Object> map) throws Exception {
        return presetsMapper.updatePresetConfigs(map);
    }

    @Override
    public int insertPresetConfigs(HashMap<String, Object> map) throws Exception {
        return presetsMapper.insertPresetConfigs(map);
    }

    @Override
    public int deletePresetConfigs(HashMap<String, Object> map) throws Exception {
        return presetsMapper.deletePresetConfigs(map);
    }

    @Override
    public List<Map<String, Object>> selectPresetConfigsDetail(String name) throws Exception {
        return presetsMapper.selectPresetConfigsDetail(name);
    }
}
