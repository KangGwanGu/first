package com.first.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FirstController {
	
	@GetMapping("/hi")
	public String test(Model model) {
		
		model.addAttribute("username", "강관구님");
		return "geetings";
	}
}
