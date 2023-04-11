package com.experdb.configuration.util;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.xmlrpc.XmlRpcException;
import org.apache.xmlrpc.client.XmlRpcClient;
import org.apache.xmlrpc.client.XmlRpcClientConfigImpl;

public class SupervisorAPIUtil {
    public String checkSupervisorStatus() {

        XmlRpcClientConfigImpl config = new XmlRpcClientConfigImpl();
        try {
            config.setServerURL(new URL("http://192.168.99.49:9001/RPC2"));
            config.setBasicUserName("user");
            config.setBasicPassword("1234");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        XmlRpcClient client = new XmlRpcClient();
        client.setConfig(config);

        String state = "";

        try {
            Map<String, Object> result = (Map<String, Object>) client.execute("supervisor.getState", new Object[]{});
            System.out.println(result);

            state = (String) result.get("state");
        } catch (XmlRpcException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return state;

        // do something with the state
    }
    public List<Map<String, Object>> getAllProcessInfo() {

        XmlRpcClientConfigImpl config = new XmlRpcClientConfigImpl();
        try {
            config.setServerURL(new URL("http://192.168.99.49:9001/RPC2"));
            config.setBasicUserName("user");
            config.setBasicPassword("1234");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        XmlRpcClient client = new XmlRpcClient();
        client.setConfig(config);

        List<Map<String, Object>> processInfoList = new ArrayList<>();

        try {
            Object[] processInfoArray = (Object[]) client.execute("supervisor.getAllProcessInfo", new Object[]{});
            for (Object processInfoObj : processInfoArray) {
                Map<String, Object> processInfoMap = (HashMap<String, Object>) processInfoObj;
                processInfoList.add(processInfoMap);
            }
        } catch (XmlRpcException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return processInfoList;

        // do something with the state
    }
}
