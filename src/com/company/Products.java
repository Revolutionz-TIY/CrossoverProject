package com.company;

/**
 * Created by erikjakubowski on 12/12/16.
 */
public class Products {
    int id;
    String name;
    String description;
    double price;
    String image;
    String type;

    public int getId() {
        return id;
    }

    public Products() {
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Products(int id, String name, String description, double price, String image, String type) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.type = type;
    }
}

