package com.experdb.configuration.service.serviceInterface;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface DbsService {
    public List<Map<String, Object>> selectColumsMonitoredDB() throws Exception; 
    public List<Map<String, Object>> selectAllMonitoredDB() throws Exception; 
    public List<Map<String, Object>> selectPresetConfig() throws Exception; 
    public int insertMonitoredDb(HashMap<String,Object> map) throws Exception;
    public int updateMonitoredDb(HashMap<String,Object> map) throws Exception;
    public int deleteMonitoredDb(HashMap<String,Object> map) throws Exception;
}
