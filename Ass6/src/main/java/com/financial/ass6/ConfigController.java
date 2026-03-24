package com.financial.ass6;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ConfigController {

    @Value("${spring.datasource.url:unknown}")
    private String dbUrl;

    @Value("${external.service.url:unknown}")
    private String externalUrl;

    @GetMapping("/config")
    public Map<String, String> getConfig() {
        Map<String, String> config = new HashMap<>();
        config.put("dbUrl", dbUrl);
        config.put("externalUrl", externalUrl);
        return config;
    }
}
