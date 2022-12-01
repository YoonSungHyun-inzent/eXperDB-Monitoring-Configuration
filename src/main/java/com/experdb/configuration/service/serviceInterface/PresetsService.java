package com.experdb.configuration.service.serviceInterface;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface PresetsService {
    public List<Map<String, Object>> selectPresetConfigs() throws Exception;
    public List<Map<String, Object>> selectPresetConfigsDetail(String name) throws Exception;
    public int insertPresetConfigs(HashMap<String,Object> map) throws Exception;
    public int updatePresetConfigs(HashMap<String,Object> map) throws Exception;
    public int deletePresetConfigs(HashMap<String,Object> map) throws Exception;
}
