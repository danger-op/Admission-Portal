package com.phd.admisssion.exceptions;

public class InvalidLogin extends Exception {
    public InvalidLogin(){
        super("Invalid mail id");
    }
}
