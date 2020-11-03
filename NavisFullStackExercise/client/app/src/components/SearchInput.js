// libs
import React, { useState, useEffect } from 'react';

// components
import {
  withStyles,
  TextField,
  Select,
  Button,
  MenuItem,
} from '@material-ui/core';
import { FETCH_MOVIE_GENRES, FETCH_SEARCH_RECORDS, SET_SEARCH_ERROR } from '../modules/actions';
import buildAction from '@app/util/buildAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectGenreSearch } from '../modules/selectors';

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  input: {
    borderRadius: '4px',
    padding: '2px 0 0 9px',
    backgroundColor: theme.palette.app.white,
    marginRight: 8,
    width: '150px',
  },

  searchButton: {
    backgroundColor: theme.palette.app.yellow,
    fontWeight: '600',
    borderRadius: '5px',
    width: '5rem',
    padding : '5px',
    //paddingTop: '0.5rem',
    //paddingLeft: '2rem',
    textDecoration: 'none',
    color: theme.palette.app.darkGray
  },
  inputLabel: {
    color: '#ABABAB',
  },
});

const SearchInput = props => {
  const { classes } = props;
  // const [title, setTitle] = useState("");
  // const [actor, setActor] = useState("");
  // const [genre, setGenre] = useState("");


  const dispatch = useDispatch();
  const handleSearchState = () => {
    debugger
    const { title, actor, genre } = props;
    props.onClickToSearch(true);
    dispatch(buildAction(SET_SEARCH_ERROR, null));
    dispatch(buildAction(FETCH_SEARCH_RECORDS, { title: title, actor: actor, genre: genre, pagenumber: 0 }));
    props.onPageChange(1);
    // props.setTitle("");
    // props.setActor("");
    // props.setGenre("");
  }



  useEffect(() => {
    dispatch(buildAction(FETCH_MOVIE_GENRES));
  }, []);

  const { movieGenres } = useSelector(state => state.genres)

  return (
    <div className={classes.root}>
      <TextField
        placeholder='Title'
        className={classes.input}
        InputProps={{ disableUnderline: true }}
        value={props.title}
        onChange={(e) => props.setTitle(e.target.value)}
      />

      <TextField
        placeholder='Actor'
        className={classes.input}
        InputProps={{ disableUnderline: true }}
        value={props.actor}
        onChange={(e) => props.setActor(e.target.value)}
      />

      <Select className={classes.input} value={props.genre}
        onChange={(e) => props.setGenre(e.target.value)}>
          <MenuItem value = "">
            <span className={classes.inputLabel}>Select Genre</span>
          </MenuItem>
        {movieGenres.map((genre, index) => (
          <MenuItem value={genre} key={index}>
            <span className={classes.inputLabel}>{genre}</span>
          </MenuItem>
        ))}

      </Select>

      {/* <Link to={"/search?title=" + title + "&actor=" + actor + "&genre=" + genre} onClick={handleSearchState} className={classes.searchButton}>
        Search
      </Link> */}
      <Button variant="contained" className={classes.searchButton} onClick={handleSearchState} >
        Search
      </Button>
    </div>
  );
};

export default withStyles(styles)(SearchInput);
