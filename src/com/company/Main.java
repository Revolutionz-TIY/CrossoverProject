package com.company;

import jodd.json.JsonParser;
import jodd.json.JsonSerializer;
import spark.Spark;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

public class Main {

    public static ArrayList<Products> product = new ArrayList<>();



    public static void main(String[] args) throws FileNotFoundException {

        File file = new File("products.csv");
        Scanner scanner = new Scanner(file);
        while(scanner.hasNext()){
            String individual = scanner.nextLine();
            String[] a = individual.split("\\,");
            Products products = new Products(a[0], a[1], a[2], a[3], a[4], a[5]);
            product.add(products);
        }



        Spark.staticFileLocation("/public");

        Spark.init();

        Spark.get(
                "/api/hello",
                (((request, response) -> {




                    return "hello world";
                }))
        );

        Spark.get(
                "/api/products",
                (((request, response) -> {

                    //create object
                    //Array
                    //EVERYTTHING

                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.include("*").serialize(product);
                    return json;
                }))

        );

//        Spark.get(
//                "/api/cart",
//                (((request, response) -> {
//                    //craete object
//                    //rquest perams"kdfsdf"
//
//
//
//
//                    //data struct what and how mmuch
//
//
//                    //return cart info
//                }))
//        );

        Spark.get(
                "/api/user",
                (((request, response) -> {
                    //create object
                    //request params
                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.include("*").serialize(product);
                    return json;
                }))
        );
//
//        Spark.get(
//                "/taxinfo",
//                (((request, response) -> {
//
//                    int postalCode = 55434;
//
//                    URL taxRateUrl = new URL("https://taxrates.api.avalara.com:443/postal?country=usa&postal=" + postalCode + "&apikey=ixNU16Howv1weFWaIX7oypxQGrzo0Ftrns0brEJLBnDePfeQxcmwpS6ufTi3Xqvg1+bAudfTetCOJmvInYZ/Aw==");
//
//                    URLConnection uc = taxRateUrl.openConnection(); //first step in connectin gto api FOR ALLLL API!!!!!
//                    BufferedReader in = new BufferedReader(new InputStreamReader(uc.getInputStream())); // making so you can read in URL u get back
//                    String inputLine = in.readLine(); //read in data from connection...line of json
//
//                    System.out.println(inputLine);
//
//                    JsonParser parser = new JsonParser();
//                    Products product = parser.parse(inputLine, Products.class);
//
//                    HashMap m =new HashMap();
//                    m.put("postal", postalCode);
//
//                   m.put("taxRate", product.get)
//
//                    return "product";
//
//                })),
//       );


//        Spark.post (
//                "",
//
//
//
//                add item to cart
//        )
//        Spark.post (
//
//                remove item from cart
//        )
//        Spark.post  (
//
//                change product quantity
//        )



    }
}