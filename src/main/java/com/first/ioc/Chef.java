package com.first.ioc;

public class Chef {
	
	public String cook(String menu) {
		Pork pork = new Pork("한돈 등심");
		
		return pork.getName() + "으로 만든 " + menu;
	}
	
	
	public static void main(String[] args) {
		Chef c = new Chef();
		String msg = c.cook("돈까스");
		System.out.println(msg);
	}
}
