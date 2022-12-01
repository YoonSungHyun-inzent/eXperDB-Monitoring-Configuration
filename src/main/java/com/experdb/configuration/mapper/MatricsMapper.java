package com.experdb.configuration.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Component;

@Component
@MapperScan
public interface MatricsMapper {	
	public List<Map<String, Object>> selectMetrics(HashMap<String,Object> map) throws Exception;
	public List<Map<String, Object>> selectMetricsDetail(String id) throws Exception;
	public int insertMetric(HashMap<String,Object> map) throws Exception;
	public int updateMetric(HashMap<String,Object> map) throws Exception;
	public int deleteMetric(HashMap<String,Object> map) throws Exception;
}