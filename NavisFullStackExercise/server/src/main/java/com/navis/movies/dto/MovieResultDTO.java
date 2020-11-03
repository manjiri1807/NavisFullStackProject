package com.navis.movies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
/*
 * object to get movie details
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class MovieResultDTO {
    private int id;
    private String title; 
    private String year;
    private String rating;
    private int sort;
    private String poster;
    private String plot;
    private String studio;
}
