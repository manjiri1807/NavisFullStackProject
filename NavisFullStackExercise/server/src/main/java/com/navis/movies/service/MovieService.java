package com.navis.movies.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.navis.movies.dao.MoviesDAO;
import com.navis.movies.dto.MovieDTO;
import com.navis.movies.dto.MovieDetailsDTO;
import com.navis.movies.dto.MovieResultDTO;
import com.navis.movies.exception.RecordNotFoundException;
/*
 * service class to handle request from controller
 */
@Service
public class MovieService {

	@Autowired
	MoviesDAO moviesDAO;

	/*
	 * get genre list
	 */
	public List<String> getGenres() {
		return moviesDAO.getGenres();

	}
	
	/*
	 * get featured movies
	 */
	public List<MovieResultDTO> getFeaturedMovies(){
		return moviesDAO.getFeaturedMovies(); 
		
	}

	/*
	 * get movie details by id
	 */
	public MovieDTO getMovieDetails(int id) {
		List<MovieDetailsDTO> list = moviesDAO.getMovieDetails(id);
		Set<String> actor = new HashSet<String>();
		Set<String> genre = new HashSet<String>();

		list.stream().forEach((MovieDetailsDTO dto) -> {
			if (dto.getActor() != null) {
				actor.add(dto.getActor());
			}
			if (dto.getGenre() != null) {
				genre.add(dto.getGenre());
			}
		});
		MovieDTO movieDTO = new MovieDTO();
		
		MovieDetailsDTO MovieDetailsDTO = list.get(0);
		
		movieDTO.setId(MovieDetailsDTO.getId());
		movieDTO.setTitle(MovieDetailsDTO.getTitle());
		movieDTO.setYear(MovieDetailsDTO.getYear());
		movieDTO.setPlot(MovieDetailsDTO.getPlot());
		movieDTO.setPoster(MovieDetailsDTO.getPoster());
		movieDTO.setStudio(MovieDetailsDTO.getStudio());
		movieDTO.setRating(MovieDetailsDTO.getRating());
		movieDTO.setActor(actor);
		movieDTO.setGenre(genre);
		
		return movieDTO;
	}
	
	/*
	 * get movie by search
	 */
	public Page<MovieResultDTO> getMovieDetailsByFilter(Optional<String> actor, Optional<String> genre,
			Optional<String> title, Optional<Integer> offset) {
		
		Page<MovieResultDTO> movieResultDTO = moviesDAO.getMovieDetailsByFilter(actor, genre, title, offset);
		if(!movieResultDTO.isEmpty()) {
			return movieResultDTO;
		}else {
			throw new RecordNotFoundException("No record found") ;
		}
		
	}

}
