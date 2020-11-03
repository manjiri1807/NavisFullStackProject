// libs
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import { withStyles, Typography, Chip } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import MovieCard from '@app/components/MovieCard';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Pagination from '@material-ui/lab/Pagination';
import Header from '@app/components/Header';

// modules
import { FETCH_FEATURED_MOVIES } from '@app/modules/actions';
import { selectFeaturedMovies } from '@app/modules/selectors';

// util
import buildAction from '@app/util/buildAction';
import useQuery from '../modules/hooks';
import { selectMovieDetails, selectMovieSearch, selectSearchError, selectTotalPagesCount, selectMovieSearchCurrentPage } from '../modules/selectors';
import { FETCH_MOVIE_DETAILS, FETCH_SEARCH_RECORDS } from '../modules/actions';




function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '950px',
    backgroundColor: '#1E2129',
    border: '2px solid #000',
    top: '50% !important',
    left: '43% !important',
    transform: 'translate(-40%, -43%) !important',
  },
  headPaper: {
    width: '100%',
    height: '35%',
    backgroundColor: '#F3CA45',
    position: 'fixed',
    zIndex: -1,

  },
  side_content: {
    float: 'left',
    width: '60%',
   marginTop: '3rem',

  },
  poster: {
    // top: '2rem',
    // left: '5rem',
    float: 'left',
    width: '25%',
    padding: '20px',
    marginTop: '5%',
    paddingRight: '5%',

  },
  posterImg: {
    width: '80%',
    height: '90%',
    /* left: 20%; */
    marginLeft: '20%',
    marginTop: '5%',
    /* padding-right: 15%; */
  },
  movieYear: {
    float: 'left',
    fontWeight: 'normal',
    width: '100%',
    paddingBottom: '30px'
  },
  movieStarring: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: 'white',
    fontSize: '15px'
  },
  movieTitle: {
    float: 'left',
    fontWeight: 'bold',
    width: '100%',
    marginTop: '40px',
    fontSize: '15px'
  },
  movieStudio: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: 'white',
    marginBottom: '1.2rem',
    fontSize: '10px'
  },
  moviePlot: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: 'white',
    fontSize: '13px',
    marginBottom: '1.2rem',
  },
  movieActor: {
    fontStyle: 'sans-serif',
    color: 'white',
    fontSize: '15px',
    textDecoration: 'underline',
  },
  movieGenre: {
    fontStretch: 'ultra-expanded',
    color: '#1E2129',
    //backgroundColor : '#F3CA45',
    // marginLeft: '0.5rem',
    marginTop: '0.5rem',
    fontSize: '15px'
  },
  pageStyle: {
    float: 'left',
    width: '100%',
    textAlign: 'center',
  },
  btn: {
    float: 'right',
    marginRight: '1rem',
    backgroundColor: 'none',
    marginTop: '0.5rem'

  },
  pagination: {
    // marginLeft : '30%'
    margin: '0 auto',
    display: 'table',
  },
  genre:{
    color : '#1E2129',
  },
  errormsg: {

  }
}));

const styles = theme => ({
  root: {
    clear: {
      clear: 'both',
    },
  },
  error: {
    color: '#ffffff'
  }
});

const SearchRecords = props => {
  const { classes, large = false } = props;
  const dispatch = useDispatch();
  const modalClasses = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [page, setPages] = React.useState(1);
  const movieStyle = useStyles();

  const handleOpen = (value) => {
    setOpen(value);
  };

  const getId = (value) => {
    dispatch(buildAction(FETCH_MOVIE_DETAILS, value));
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, value) => {
    debugger
    // setPages(value);
    const { title, actor, genre } = props;

    props.onPageChange(value);
    dispatch(buildAction(FETCH_SEARCH_RECORDS, { title: title, actor: actor, genre: genre, pagenumber: value }));
  };

  const query = useQuery();

  const totalPages = useSelector(selectTotalPagesCount)

  // const searchQuery = {
  //   title: query.get("title"),
  //   actor: query.get("actor"),
  //   genre: query.get("genre"),
  //   pagenumber: 0
  // }
  const searchQuery = {
    title: props.title,
    actor: props.actor,
    genre: props.genre,
    pagenumber: 0
  }
  const movies = useSelector(selectMovieSearch);
  const currentPage = useSelector(selectMovieSearchCurrentPage);
  const details = useSelector(selectMovieDetails);
  const { movieDetails } = details;

  // useEffect(() => {
  //   debugger
  //   setPages(1);
  //   dispatch(buildAction(FETCH_SEARCH_RECORDS, searchQuery));
  // }, []);

  const body = (
    <div style={modalStyle} className={movieStyle.paper}>
      <div className={movieStyle.headPaper}>
      </div>

      <div className={classes.clickable}>
        <a onClick={handleClose} className={modalClasses.btn}> <CancelIcon /></a>
        <div className={movieStyle.poster}> <img
          src={`/images/${details.poster}`}
          className={modalClasses.posterImg} alt={`${details.title} Poster`}
        />
        </div>
        <div className={movieStyle.side_content}>
          <Typography className={movieStyle.movieTitle}>
            {details.title}
          </Typography>
          <Typography className={movieStyle.movieYear}>
            {details.year} ({details.rating})
                    </Typography>
          <Typography className={movieStyle.movieStudio}>
            {details.studio}
          </Typography>
          <Typography className={movieStyle.moviePlot}>
            {details.plot}
          </Typography>
          <Typography className={movieStyle.movieStarring}>Starring</Typography>
          <div className={movieStyle.movieActor}></div>
          <Typography className={movieStyle.movieActor}>
            {details.actor.toString()}
          </Typography>
          <Typography className={movieStyle.movieGenre}>
            {details.genre.map((genre, i) => (<Chip className={modalClasses.genre}  key = {i} style={{backgroundColor:'#F3CA45'}} label={genre} key={i} />))}
          </Typography>
        </div>
      </div>
    </div>
  );


  const error = useSelector(selectSearchError);
  return (
    // <div>  <Header />
    <div className={classes.root}>
      {error ? <h1 className={classes.error}>{error}</h1>
        : movies.map((movie, index) => (
          <MovieCard modalOpen={handleOpen} fetchId={getId} large data={movie} key={index} />
        ))}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
      {error ? <h1></h1> : <div className={modalClasses.pageStyle}>
        <Typography>Page: {props.currentPage} of {totalPages}</Typography>
        <Pagination className={modalClasses.pagination} count={totalPages} shape="rounded" page={props.currentPage} onChange={handleChange} />
      </div>}
    </div>
    // </div>
  );
};

export default withStyles(styles)(SearchRecords);
