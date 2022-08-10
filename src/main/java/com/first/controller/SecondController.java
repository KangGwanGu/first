package com.first.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SecondController {
	
	@GetMapping("/bye")
	public String bye(Model model) {
		model.addAttribute("username","강관구");
		return "bye";
	}
}
