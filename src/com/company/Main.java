package com.company;

import spark.Spark;

public class Main {



    public static void main(String[] args) {

        Spark.staticFileLocation("/public");

        Spark.init();

        Spark.get(
                "/api/hello",
                (((request, response) -> {


                    return "hello world";
                }))
        );

    }
}