package com.experdb.configuration.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Component;

@Component
@MapperScan
public interface ThresholdsMapper {
    public List<Map<String, Object>> selectThresholds() throws Exception;
    public int insertThresholds(HashMap<String,Object> map) throws Exception;
    public int updateThresholds(HashMap<String,Object> map) throws Exception;
    public int deleteThresholds(HashMap<String,Object> map) throws Exception;
}
