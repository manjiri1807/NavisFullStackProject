package com.navis.movies.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
/*
 * model class for error
 */
@Data
@AllArgsConstructor
@Getter @Setter
public class ErrorResponse {
	private String message;
    private List<String> details; 
}
