package com.company;

import java.util.ArrayList;

/**
 * Created by erikjakubowski on 12/14/16.
 */
public class Taxlisting {
    double total;
    double totalRate;

    public double getTotalRate() {
        return totalRate;
    }

    public void setTotalRate(double totalRate) {
        this.totalRate = totalRate;
    }

    public ArrayList<Tax> getRates() {
        return rates;
    }

    public void setRates(ArrayList<Tax> rates) {
        this.rates = rates;
    }

    public Taxlisting(int setTotal) {
        this.total = setTotal;
    }

    ArrayList<Tax> rates = new ArrayList<>();

    public Taxlisting(){

    }


    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }


}
