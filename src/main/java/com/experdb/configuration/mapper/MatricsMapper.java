package com.experdb.configuration.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Component;

@Component
@MapperScan
public interface MatricsMapper {	
	public List<Map<String, Object>> selectPresetConfigs() throws Exception;
	public List<Map<String, Object>> selectMetrics() throws Exception;
	public int insertPresetConfigs(HashMap<String,Object> map) throws Exception;
	public int updatePresetConfigs(HashMap<String,Object> map) throws Exception;
	public int deletePresetConfigs(HashMap<String,Object> map) throws Exception;
	public int insertMetric(HashMap<String,Object> map) throws Exception;
	public int updateMetric(HashMap<String,Object> map) throws Exception;
	public int deleteMetric(HashMap<String,Object> map) throws Exception;
}