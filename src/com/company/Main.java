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
import java.util.Map;
import java.util.Scanner;

public class Main {

    public static ArrayList<Products> product = new ArrayList<>();

    public static HashMap<Integer, Integer> cart = new HashMap<>();


    public static void main(String[] args) throws FileNotFoundException {

        File file = new File("product.csv");
        Scanner scanner = new Scanner(file);
        while (scanner.hasNext()) {
            String individual = scanner.nextLine();
            String[] a = individual.split("\\,");
            Products products = new Products(Integer.parseInt(a[0]), a[1], a[2], Double.parseDouble(a[3]), a[4], a[5]);
            product.add(products);
        }


        Spark.staticFileLocation("/public");

        Spark.init();

//        Spark.get(
//                "/api/item",
//                (((request, response) -> {
//                    Products x = new Products();
//                    for (Products temp : product) {
//                        if (temp.id == id) {
//                            x = temp;
//                        }
//
//                    }
//                    JsonSerializer serializer = new JsonSerializer();
//                    String json = serializer.include("*").serialize(product);
//                    return json;
//
//
//                }))
//        );

        Spark.get(
                "/api/products",
                (((request, response) -> {

                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.include("*").serialize(product);
                    return json;
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

        Spark.post(
                "/api/addItem",
                (((request, response) -> {
                    String itemId = request.queryParams("itemId");
                    if (itemId == null) {
                        throw new Exception("don't talk back");
                    }
                    int a = Integer.parseInt(itemId);


                    cart.put(a, 1);


                    return "";
                }))
        );


        Spark.post(
                "/api/removeItem",
                ((request, response) -> {
                    String removeProduct = request.queryParams("itemId");

                    if (removeProduct == null) {
                        throw new Exception();
                    }

                    int rp = Integer.parseInt(removeProduct);


                    cart.remove(rp);


                    return "";
                })
        );

        Spark.post(
                "/api/changeQuant",
                (((request, response) -> {

                    String id = request.queryParams("itemId");

                    String amount = request.queryParams("itemAmount");

                    if (amount == null || id == null) {
                        throw new Exception();
                    }

                    int a = Integer.parseInt(amount);
                    int b = Integer.parseInt(id);

                    cart.put(b, a);

                    return "";
                }))

        );
    }
}

//
//        Spark.get(
//                "/api/tax",
//                (((request,response)-> {
//        String zip = request.queryParams("zipCode");
//
//
//        double total = 0;
//
//        for (Map.Entry<Integer, Integer> entry : cart.entrySet()) {
//            Integer productId = entry.getKey();
//            Integer productQuantity = entry.getValue();
//
//            Products x = new Products(); //Integer.parseInt(id), "name", "description", Double.parseDouble("price"), "imageName");
//            for (Products temp : product) {
//                if (temp.id == productId) {
//                    x = temp;
//                }
//
//            }
//            total += x.getPrice() * productQuantity;
//            URL taxUrl = new URL("https://taxrates.api.avalara.com/postal?postal=" + zip + "&country=US&apikey=ODeb/KozEMOsBvpNX3L40Tekut5ozlAY8uYnAUklC4Kg6A0IQIY5Lx6lYUCez3WAEHvNy91SUBzaooq6mf5/Mg==");
//
//            URLConnection uc = taxUrl.openConnection();
//            BufferedReader in = new BufferedReader(new InputStreamReader(uc.getInputStream()));
//            StringBuilder sb = new StringBuilder();
//            while (in.ready()) {
//                sb.append(in.readLine());
//            }
//            String inputLine = in.readLine(); //the url object that we created
//
//
//            JsonParser parser = new JsonParser();
//            Taxlisting listing = parser.parse(sb.toString(), Taxlisting.class);
//            listing.setTotal(total);
//
//            JsonSerializer serializer = new JsonSerializer();
//            String json = serializer.include("*").serialize(listing); /* is now a vehicle for what is in it*/
//            return json;
//        );
//    }
//}
//}