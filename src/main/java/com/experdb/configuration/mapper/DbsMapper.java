package com.experdb.configuration.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Component;

@Component
@MapperScan
public interface DbsMapper {
    public List<Map<String, Object>> selectColumsMonitoredDB() throws Exception;
    public List<Map<String, Object>> selectAllMonitoredDB() throws Exception;
    public List<Map<String, Object>> selectPresetConfig() throws Exception;
    public int insertMonitoredDb(HashMap<String,Object> map) throws Exception;
    public int updateMonitoredDb(HashMap<String,Object> map) throws Exception;
    public int deleteMonitoredDb(HashMap<String,Object> map) throws Exception;
}
