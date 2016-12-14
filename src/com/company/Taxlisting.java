package com.company;

import java.util.ArrayList;

/**
 * Created by erikjakubowski on 12/14/16.
 */
public class Taxlisting {
    int status;
    ArrayList<Tax> salesTax = new ArrayList<>();

//    public TaxListing(){
//
//    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public ArrayList<Tax> getSalesTax() {
        return salesTax;
    }

    public void setSalesTax(ArrayList<Tax> salesTax) {
        this.salesTax = salesTax;
    }

    public Taxlisting(int status, ArrayList<Tax> salesTax) {

        this.status = status;
        this.salesTax = salesTax;
    }
}
