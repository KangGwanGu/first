package com.first.json;

import java.nio.file.Files;
import java.nio.file.Paths;

public class ResponseJson {

    public static void main(String[] args) {
        System.out.println(new ResponseJson().getPremiumJson());
    }

    public String getPremiumJson() {

        try {
            String jsonData = Files.readString(Paths.get("src/main/resources/json/premium.json"));
            return jsonData;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";
    }

    public String getSurrenderJson() {
        try {
            String jsonData = Files.readString(Paths.get("src/main/resources/json/surrender.json"));
            return jsonData;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";
    }

    public String getBenefitJson() {
        try {
            String jsonData = Files.readString(Paths.get("src/main/resources/json/benefit.json"));
            return jsonData;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";
    }

    public String getProductJson() {
        try {
            String jsonData = Files.readString(Paths.get("src/main/resources/json/data.json"));
            return jsonData;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";
    }

}
