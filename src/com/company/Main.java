package com.company;

import jodd.json.JsonParser;
import jodd.json.JsonSerializer;
import spark.Spark;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

public class Main {

    public static ArrayList<Products> product = new ArrayList<>();

    public static HashMap<String, Integer> cart = new HashMap<>();


    public static void main(String[] args) throws FileNotFoundException{

        File file = new File("product.csv");
        Scanner scanner = new Scanner(file);
        while (scanner.hasNext()) {
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

                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.include("*").serialize(product);
                    return json;
                }))

        );

        Spark.post(
                "/api/addItem",
                (((request, response) -> {
                    int itemIdInt;
                    String itemId = request.queryParams("itemId");
                    if (itemId == null){
                        throw new Exception("don't talk back");
                    }
                    itemIdInt = Integer.parseInt(itemId);




//                    product = new Products(id,name, description, price, image, type);

                    cart.put(itemId, 1);


                    return "";
                }))
        );


        Spark.get(
                "/api/cart",
                (((request, response) -> {

                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.include("*").serialize(cart);
                    return json;

                }))
        );

//        Spark.get(
//                "/api/user",
//                (((request, response) -> {
//                    //create object
//                    //request params
//                    JsonSerializer serializer = new JsonSerializer();
//                    String json = serializer.include("*").serialize(product);
//                    return json;
//                }))
//        );



        Spark.post(
                "/api/removeItem",
                ((request, response) -> {
                    String removeProduct = request.queryParams("itemTag");

                    if(removeProduct == null) {
                        throw new Exception();
                    }

                    int rp = Integer.parseInt(removeProduct);


                    cart.remove(rp);


                    return "";
                })
        );

        Spark.post(
                "/changeQuant",
                (((request, response) -> {

                    String id = request.queryParams("tagName");

                    if(id == null){
                        throw new Exception();
                    }

                    int a = Integer.parseInt(id);



                    String newQuant = request.queryParams("quant");
                    int quant = Integer.parseInt(newQuant);

//                    cart.add(a);
//                    cart.add(quant);



                    return "";
                }))

        );

        Spark.get(
                "/api/tax",
                (((request, response) -> {

                    String zip = request.queryParams("zipCode");
                    String id = request.queryParams("tagName");

                    //parse zip



                    URL taxRateUrl = new URL("https://taxrates.api.avalara.com:443/postal?country=usa&postal=" + zip + "&apikey=ixNU16Howv1weFWaIX7oypxQGrzo0Ftrns0brEJLBnDePfeQxcmwpS6ufTi3Xqvg1+bAudfTetCOJmvInYZ/Aw==");

                    URLConnection uc = taxRateUrl.openConnection(); //first step in connectin gto api FOR ALLLL API!!!!!
                    BufferedReader in = new BufferedReader(new InputStreamReader(uc.getInputStream())); // making so you can read in URL u get back
                    String inputLine = in.readLine(); //read in data from connection...line of json

                    System.out.println(inputLine);

                    JsonParser parser = new JsonParser();
                    Products product = parser.parse(inputLine, Products.class);

                    HashMap m = new HashMap();
//                    m.put("postal", postalCode);
//
//                    m.put("taxRate", Tax.get);

                    return product;



                }))
        );

    }
}