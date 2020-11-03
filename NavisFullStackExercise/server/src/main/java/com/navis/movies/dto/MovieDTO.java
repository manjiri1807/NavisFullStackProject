package com.navis.movies.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
/*
 * DTO object for transferring movie details to UI
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class MovieDTO {
	 private int id;
	    private String title; 
	    private String year;
	    private String plot;
	    private String poster;
	    private String studio;
	    private String rating;
	    private Set<String> actor;
	    private Set<String> genre;
}
