package com.navis.movies.exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

/*
 * exception class to handle custom exception for no record found 
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class RecordNotFoundException extends RuntimeException
{
    private static final long serialVersionUID = 1L;
 
    public RecordNotFoundException(String exception) {
        super(exception); 
    }
}