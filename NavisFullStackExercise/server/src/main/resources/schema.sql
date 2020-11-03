DROP TABLE IF EXISTS featured_movies;
DROP TABLE IF EXISTS movie_to_actor;
DROP TABLE IF EXISTS movie_to_genre;
DROP TABLE IF EXISTS actors;
drop table if exists movies;
DROP TABLE IF EXISTS genres;


CREATE TABLE movies (
                        id INT PRIMARY KEY,
                        title VARCHAR(250) NOT NULL,
                        year char(4) DEFAULT NULL,
                        rating varchar(10) DEFAULT NULL,
                        plot varchar(512) DEFAULT NULL,
                        studio varchar(128) DEFAULT  NULL,
                        poster varchar(128) DEFAULT null
);

CREATE TABLE actors (
                        id INT PRIMARY KEY,
                        name VARCHAR(250) NOT NULL
);

CREATE TABLE genres (
                        id INT PRIMARY KEY,
                        description VARCHAR(250) NOT NULL
);

CREATE TABLE movie_to_actor (
                        movie_id INT NOT NULL,
                        actor_id INT NOT NULL,
                        sort INT NOT NULL
);

ALTER TABLE movie_to_actor
    ADD FOREIGN KEY (movie_id)
        REFERENCES MOVIES(id);

ALTER TABLE movie_to_actor
    ADD FOREIGN KEY (actor_id)
        REFERENCES actors(id);


CREATE TABLE movie_to_genre (
                                movie_id INT NOT NULL,
                                genre_id INT NOT NULL
);

ALTER TABLE movie_to_genre
    ADD FOREIGN KEY (movie_id)
        REFERENCES MOVIES(id);

ALTER TABLE movie_to_genre
    ADD FOREIGN KEY (genre_id)
        REFERENCES genres(id);



CREATE TABLE featured_movies (
    movie_id INT NOT NULL,
    sort INT NOT NULL
);

ALTER TABLE featured_movies
    ADD FOREIGN KEY (movie_id)
        REFERENCES MOVIES(id);
