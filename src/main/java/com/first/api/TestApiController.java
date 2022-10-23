package com.first.api;

import com.first.common.DataSourceProperties;
import com.first.json.ResponseJson;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class TestApiController {

	DataSourceProperties dataSourceProperties;

	public TestApiController(DataSourceProperties dataSourceProperties) {
		this.dataSourceProperties = dataSourceProperties;
	}

	@PostMapping("/v1/tenants/KOREA/product/products/{productCode}")
	@CrossOrigin
	public String product(@PathVariable String productCode) throws IOException {
		System.out.println("productCode : " + productCode);
		if(!"prod".equals(dataSourceProperties.getCrossoriginTarget())) {
			System.out.println("UNAUTHORIZED..");
			return null;
		}

		return new ResponseJson().getProductJson();
	}

	@PostMapping("/v1/tenants/KOREA/product/products/premiums")
	@CrossOrigin
	public String premiums() throws IOException {
		if(!"prod".equals(dataSourceProperties.getCrossoriginTarget())) {
			System.out.println("UNAUTHORIZED..");
			return null;
		}

		return new ResponseJson().getPremiumJson();
	}

	@PostMapping("/v1/tenants/KOREA/product/products/surrenders")
	@CrossOrigin
	public String surrenders() {
		if(!"prod".equals(dataSourceProperties.getCrossoriginTarget())) {
			System.out.println("UNAUTHORIZED..");
			return null;
		}

		return new ResponseJson().getSurrenderJson();
	}

	@PostMapping("/v1/tenants/KOREA/product/products/benefits")
	@CrossOrigin
	public String benefits() {
		if(!"prod".equals(dataSourceProperties.getCrossoriginTarget())) {
			System.out.println("UNAUTHORIZED..");
			return null;
		}

		return new ResponseJson().getBenefitJson();
	}

}
