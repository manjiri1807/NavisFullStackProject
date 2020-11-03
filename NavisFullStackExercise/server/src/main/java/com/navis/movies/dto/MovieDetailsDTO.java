package com.navis.movies.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
/*
 * object for fetching movie details from multiple tables
 */
@Data
@NoArgsConstructor
@Setter
public class MovieDetailsDTO {
	 private int id;
	    private String title; 
	    private String year;
	    private String plot;
	    private String poster;
	    private String actor;
	    private String genre;
	    private String studio;
	    private String rating;
}
