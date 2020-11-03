package com.navis.movies.test;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.BeforeClass;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.navis.movies.dao.MoviesDAO;
import com.navis.movies.dto.MovieDTO;
import com.navis.movies.dto.MovieResultDTO;
import com.navis.movies.service.MovieService;

import io.restassured.RestAssured;

public class MovieServiceTest {
	
	
	
	@BeforeClass
	public static void init() {
		RestAssured.baseURI = "http://localhost";
		RestAssured.port = 8080;
	}

	@Test
	public void testGetGenres() throws Exception {

		MoviesDAO movieDao = mock(MoviesDAO.class);
		
		List<String> outputList = new ArrayList<>(Arrays.asList("Action", "Adventure", "Animation", "Comedy", 
				"Crime", "Drama", "Family", "Fantasy", "Horror", "Music","Musical", "Mystery", 
				"Romance","Sci-Fi","Short","Sport", "Thriller", "War", "Western"));
		
		when(movieDao.getGenres()).thenReturn((List<String>) outputList);
		
		
		assertEquals(outputList, movieDao.getGenres());
		assertNotNull(movieDao.getGenres());
		 
	}
	
	@Test
	void testGetFeaturedMovies() {
		MoviesDAO movieDao = mock(MoviesDAO.class);
		List<MovieResultDTO> list = new ArrayList<MovieResultDTO>(); 
		list.add(new MovieResultDTO(1,"Harry Potter and the Order" , "2007", "PG-13", 3, "harrypotterandtheorderofthephoenix.jpg", "Jason Boyd", "Action"));
		list.add(new MovieResultDTO(2,"Harry Potter and the Order" , "2007", "PG-13", 3, "harrypotterandtheorderofthephoenix.jpg", "Jason Boyd", "Action"));
		when(movieDao.getFeaturedMovies()).thenReturn(list);
		assertNotNull(movieDao.getFeaturedMovies());
	}
	
	@Test
	void testFilter() {

        Pageable page = PageRequest.of(0, 5);
        
        MoviesDAO movieDao = mock(MoviesDAO.class);
        
		Optional<String> actor = Optional.of("Amy") ;
		actor.orElse("_");
		
		Optional<String> genre = Optional.of("Action") ;
		actor.orElse("_");
		
		Optional<String> title = Optional.of("Harry Potter and the Order") ;
		actor.orElse("_");
		
		
		Optional<Integer> offset = Optional.of(1) ;
		offset.orElse(0);
		
		ArrayList<MovieResultDTO> list = new ArrayList<MovieResultDTO>(); 
		list.add(new MovieResultDTO(1,"Harry Potter and the Order" , "2007", "PG-13", 3, "harrypotterandtheorderofthephoenix.jpg", "Jason Boyd", "Action"));
		list.add(new MovieResultDTO(2,"Harry Potter and the Order" , "2007", "PG-13", 3, "harrypotterandtheorderofthephoenix.jpg", "Jason Boyd", "Action"));
		
		when(movieDao.getMovieDetailsByFilter(actor, genre, title, offset)).thenReturn(new PageImpl<MovieResultDTO>(list,page,1));
		assertNotNull(movieDao.getMovieDetailsByFilter(actor, genre, title, offset));
		
	}
	
	
	@Test
	void testGetMovieById() {
		
		 MovieService movieService = mock(MovieService.class);
		 Set<String> actor = new HashSet<String>();
			actor.add("aaaa");
			actor.add("bbbb");
			
			Set<String> genere = new HashSet<String>();
			genere.add("zzzzz");
			genere.add("xxxxx");
		MovieDTO movie = new MovieDTO(1,"Harry Potter and the Order" , "2007", "PG-13", "ABc", "harrypotterandtheorderofthephoenix.jpg","xyz", actor,genere); 
		   
		when(movieService.getMovieDetails(5)).thenReturn(movie);	
		assertNotNull(movieService.getMovieDetails(5));
	}


		
}
