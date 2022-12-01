package com.experdb.configuration.service.serviceInterface;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface MetricsService {
    public List<Map<String, Object>> selectMetrics(HashMap<String,Object> map) throws Exception;
    public List<Map<String, Object>> selectMetricsDetail(String id) throws Exception;
    public int insertMetric(HashMap<String,Object> map) throws Exception;
	public int updateMetric(HashMap<String,Object> map) throws Exception;
	public int deleteMetric(HashMap<String,Object> map) throws Exception;
}
