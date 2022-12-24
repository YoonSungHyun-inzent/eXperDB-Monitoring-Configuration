package com.experdb.configuration.service.serviceInterface;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface ThresholdsService {
    public List<Map<String, Object>> selectThresholds() throws Exception;
    public int insertThresholds(HashMap<String,Object> map) throws Exception;
    public int updateThresholds(HashMap<String,Object> map) throws Exception;
    public int deleteThresholds(HashMap<String,Object> map) throws Exception;
}
