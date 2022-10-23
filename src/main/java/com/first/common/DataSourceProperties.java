package com.first.common;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class DataSourceProperties {

    @Value("${spring.datasource.crossorigin-target}")
    private String crossoriginTarget;

}
