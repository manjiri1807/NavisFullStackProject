package com.navis.movies.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.navis.movies.dto.MovieDetailsDTO;
import com.navis.movies.dto.MovieResultDTO;

/*
 * Dao class to handle JDBC operations
 */
@Repository
public class MoviesDAO {

	@Autowired
	JdbcTemplate jdbcTemplate;
	
	/*
	 * get distinct genres list from db
	 */
	public List<String> getGenres(){
		
		 final List<String> genres = jdbcTemplate.query(
	                "select distinct(description) description from genres order by description;",
	                (rs, rowNum) -> {
	                	String genre = rs.getString("description");
	                    return genre;
	                }
	        );
	        return genres;
	}

	/*
	 * get featured movies from db
	 */
	public List<MovieResultDTO> getFeaturedMovies(){
        final List<MovieResultDTO> movies = jdbcTemplate.query(
                "SELECT m.id, m.title, m.year, m.rating, m.poster, f.sort from movies m inner join featured_movies f on f.movie_id = m.id order by sort",
                (rs, rowNum) -> {
                    MovieResultDTO dto = new MovieResultDTO();
                    dto.setId(rs.getInt("id"));
                    dto.setTitle(rs.getString("title"));
                    dto.setYear(rs.getString("year"));
                    dto.setRating(rs.getString("rating"));
                    dto.setPoster(rs.getString("poster"));
                    dto.setSort(rs.getInt("sort"));
                    return dto;
                } 
        );
        return movies;
    }

	/*
	 * get movie details by ID
	 */
	public List<MovieDetailsDTO>  getMovieDetails(int id) {

		final List<MovieDetailsDTO> movies = jdbcTemplate.query(
				"Select distinct(m.ID), m.title, m.year, m.plot, m.poster, a.name, m.studio, g.description, m.rating from MOVIES m INNER JOIN  MOVIE_TO_ACTOR ma on m.ID = ma.MOVIE_ID  INNER JOIN ACTORS a on a.ID  = ma.ACTOR_ID "
				+ "INNER JOIN MOVIE_TO_GENRE  mg on mg.MOVIE_ID = m.ID INNER JOIN GENRES g on g.ID = mg.GENRE_ID WHERE m.id = "+id ,
				(rs, rowNum) -> {
					MovieDetailsDTO dto = new MovieDetailsDTO();
					dto.setId(rs.getInt("id"));
					dto.setTitle(rs.getString("title"));
					dto.setYear(rs.getString("year"));
					dto.setPlot(rs.getString("plot"));
					dto.setPoster(rs.getString("poster"));
					dto.setStudio(rs.getString("studio"));
					dto.setActor(rs.getString("name"));
					dto.setGenre(rs.getString("description"));
					dto.setRating(rs.getString("rating"));
					return dto;
				});

		return movies;

	}

	/*
	 * Search movies by filters
	 * and return pageable object
	 */
	public Page<MovieResultDTO> getMovieDetailsByFilter(Optional<String> actor, Optional<String> genre,
			Optional<String> title, Optional<Integer> offset) {

		Pageable pageable = PageRequest.of(offset.orElse(0), 6);
		final List<MovieResultDTO> movies = jdbcTemplate.query(
				"Select DISTINCT m.ID, m.* from MOVIES m INNER JOIN  MOVIE_TO_ACTOR ma on m.ID = ma.MOVIE_ID  INNER JOIN ACTORS a on a.ID  = ma.ACTOR_ID INNER JOIN MOVIE_TO_GENRE  mg on mg.MOVIE_ID = m.ID INNER JOIN GENRES g on g.ID = mg.GENRE_ID WHERE TITLE LIKE '%"
						+ title.orElse("_") + "%' AND g.DESCRIPTION  LIKE '%" + genre.orElse("_")
						+ "%' AND a.NAME Like '%" + actor.orElse("_") + "%' order by m.ID LIMIT "
						+ pageable.getPageSize() + " OFFSET " + pageable.getOffset(),
				(rs, rowNum) -> {
					MovieResultDTO dto = new MovieResultDTO();
					dto.setId(rs.getInt("id"));
					dto.setTitle(rs.getString("title"));
					dto.setYear(rs.getString("year"));
					dto.setRating(rs.getString("rating"));
					dto.setPoster(rs.getString("poster"));
					dto.setPlot(rs.getString("plot"));
					dto.setStudio(rs.getString("studio"));
					return dto;
				});

		//get count of total records
		String countQuery = "Select count(distinct m.id) from MOVIES m INNER JOIN  MOVIE_TO_ACTOR ma on m.ID = ma.MOVIE_ID  INNER JOIN ACTORS a on a.ID  = ma.ACTOR_ID INNER JOIN MOVIE_TO_GENRE  mg on "
				+ "mg.MOVIE_ID = m.ID INNER JOIN GENRES g on g.ID = mg.GENRE_ID " + "WHERE TITLE LIKE '%"
				+ title.orElse("_") + "%' " + "AND g.DESCRIPTION  LIKE '%" + genre.orElse("_") + "%' AND a.NAME Like '%"
				+ actor.orElse("_") + "%' ";

		int count = jdbcTemplate.queryForObject(countQuery, Integer.class);

		return new PageImpl<MovieResultDTO>(movies, pageable, count);
	}

}
