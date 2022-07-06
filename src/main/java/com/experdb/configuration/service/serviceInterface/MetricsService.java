package com.experdb.configuration.service.serviceInterface;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface MetricsService {
    public List<Map<String, Object>> selectPresetConfigs() throws Exception;
    public List<Map<String, Object>> selectMetrics() throws Exception;
    public int insertPresetConfigs(HashMap<String,Object> map) throws Exception;
    public int updatePresetConfigs(HashMap<String,Object> map) throws Exception;
    public int deletePresetConfigs(HashMap<String,Object> map) throws Exception;
    public int insertMetric(HashMap<String,Object> map) throws Exception;
	public int updateMetric(HashMap<String,Object> map) throws Exception;
	public int deleteMetric(HashMap<String,Object> map) throws Exception;
}
