package com.phd.admisssion.service;

import java.io.FileNotFoundException;
import java.io.IOException;

import javax.mail.MessagingException;

import com.itextpdf.text.DocumentException;
import com.phd.admisssion.exceptions.AdmittedAlreadyException;
import com.phd.admisssion.model.Admissions;

public interface AdmissionService {
    
    public Admissions saveAdmission(Admissions adts) throws AdmittedAlreadyException;

    public void draftPDF(Admissions adresp) throws FileNotFoundException, DocumentException, IOException;

    public void sendEmailWithReport(Admissions adresp) throws MessagingException;

    public void sendEmail(Admissions adresp) throws MessagingException;
    
}
