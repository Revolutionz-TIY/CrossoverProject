package com.company;

import org.junit.Test;
import org.junit.Assert.*;
import spark.Spark;

import java.util.HashMap;

public class TestRoutes {

    public static HashMap<String, Integer> cart = new HashMap<>();

    @Test
    public void testing(){

        Spark.get(
                "/api/addItem",
                (((request, response) -> {
                    String itemId = request.queryParams("itemId");
                    if (itemId == null){
                        throw new Exception("don't talk back");
                    }

                    cart.put(itemId, 1);




                    return "";

                }))
        );





    }



    @Test
    public void testing2() {

        Spark.get(
                "/api/removeItem",
                (((request, response) -> {
                    String removeProduct = request.queryParams("itemTag");

                    if(removeProduct == null) {
                        throw new Exception();
                    }

                    int rp = Integer.parseInt(removeProduct);


                    cart.remove(rp);


                    return "";


                }))
        );

    }

}
