package com.phd.admisssion.exceptions;

public class InstituteNotFoundException extends Exception{

    public InstituteNotFoundException(String institute){
        super(institute+" Institute not found");
    }

    
}
