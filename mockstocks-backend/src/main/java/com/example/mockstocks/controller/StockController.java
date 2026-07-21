package com.example.mockstocks.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class StockController {

    @GetMapping("/stocks")
    public List<Map<String, Object>> getStocks() {
        List<Map<String, Object>> stockList = new ArrayList<>();

        Map<String, Object> stock1 = new HashMap<>();
        stock1.put("code", "005930");
        stock1.put("name", "삼성전자");
        stock1.put("price", 71000);
        stockList.add(stock1);

        Map<String, Object> stock2 = new HashMap<>();
        stock2.put("code", "000660");
        stock2.put("name", "SK하이닉스");
        stock2.put("price", 195000);
        stockList.add(stock2);
        System.out.println("zzzzz");
        Map<String, Object> stock3 = new HashMap<>();
        stock3.put("code", "035720");
        stock3.put("name", "카카오");
        stock3.put("price", 42000);
        stockList.add(stock3);

        return stockList;
    }
}
