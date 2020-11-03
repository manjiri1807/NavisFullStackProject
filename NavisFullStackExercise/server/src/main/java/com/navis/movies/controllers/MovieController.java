package com.navis.movies.controllers;

import static com.navis.movies.Application.MOVIE_URL;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.navis.movies.dto.MovieDTO;
import com.navis.movies.dto.MovieResultDTO;
import com.navis.movies.service.MovieService;

import io.swagger.v3.oas.annotations.Operation;
/*
 * Rest controller for handling movie search requests
 */
@RestController
@RequestMapping(MOVIE_URL)
public class MovieController {
	@Autowired
	MovieService movieService;

	@Operation(description = "Get Movie genres")
	@GetMapping("/genre")
	public List<String> getGenre() {
		return movieService.getGenres(); 
	}

	@Operation(description = "Get featured Movies")
	@GetMapping("/featured")
	public List<MovieResultDTO> getFeaturedMovies() {
		return movieService.getFeaturedMovies();
	}

	@Operation(description = "Get Movie Details")
	@GetMapping("/details")
	public MovieDTO getMovieDetails(@RequestParam("id") int id) {
		return movieService.getMovieDetails(id);
	}

	@Operation(description = "Get Movie Details by filter")
	@GetMapping("/search")
	public Page<MovieResultDTO> getMovieDetailsByFilter(@RequestParam("actor") Optional<String> actor,
			@RequestParam("genre") Optional<String> genre, @RequestParam("title") Optional<String> title,
			@RequestParam("offset") Optional<Integer> offset) {

		return movieService.getMovieDetailsByFilter(actor, genre, title, offset);

	}

}
