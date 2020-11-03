// libs
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import { Typography, withStyles,Chip } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import MovieCard from '@app/components/MovieCard';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
 

// modules
import { FETCH_FEATURED_MOVIES } from '@app/modules/actions';
import { selectFeaturedMovies } from '@app/modules/selectors';


// util
import buildAction from '@app/util/buildAction';
import { selectMovieDetails } from '../modules/selectors';
import { FETCH_MOVIE_DETAILS } from '../modules/actions';


function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

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

     //  top: '3rem',
       //left: '5rem',
      float: 'left',
      width: '25%',
      padding: '20px',
      marginTop: '5%',
      paddingRight: '5%',

  },
  posterImg:{
    width: '80%',
    height: '90%',
    /* left: 20%; */
    marginLeft: '20%',
    marginTop: '5%',
    /* padding-right: 15%; */
  },
  movieYear:{
      float: 'left',
      fontWeight: 'normal',
      width:'100%',
      paddingBottom: '30px'
  },
  movieTitle: {
      float: 'left',
      fontWeight: 'bold',
      width:'100%',
      marginTop: '40px',
      fontSize : '15px'
  },
  movieStudio: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    color:'white',
    marginBottom:'1.2rem',
    fontSize:'10px'
},
  moviePlot: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      color:'white',
      marginBottom:'1.2rem',
      fontSize:'13px'
  },
  movieStarring: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    color:'white',
    fontSize:'15px'
},
  movieActor: {
      fontStyle: 'sans-serif',
      color:'white',
      textDecoration: 'underline',
      fontSize:'15px'
    
  },
  movieGenre: {
    fontStretch: 'ultra-expanded',
    color:'#F3CA45',
    backgroundColor : '#1E2129',
    //marginLeft: '0.5rem',
    marginTop : '0.5rem',
    fontSize:'15px',
},
genre:{
  color : '#1E2129',
},

btn:{
  float: 'right',
  marginRight : '1rem',
  backgroundColor : 'none',
  marginTop : '0.5rem'

},
  errormsg: {

  }
}));


const styles = theme => ({
  root: {
    
  },
  error:{
    color:'#ffffff'
  }

});

const FeaturedMovies = props => {
  const { classes ,large=false } = props;

  const dispatch = useDispatch();
  const [modalStyle] = React.useState(getModalStyle);
  const modalClasses = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);
  
  
  const movieStyle = useStyles();
  
  const width = large ? 267 : 200;
  const height = large ? 396 : 295;

  const handleOpen = (value) => {
    setOpen(value);
  };

  const getId = (value) =>{
    dispatch(buildAction(FETCH_MOVIE_DETAILS,value));
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  const details = useSelector(selectMovieDetails);

  const movies = useSelector(selectFeaturedMovies);

  const {movieDetails} = details;

  useEffect(() => {
    dispatch(buildAction(FETCH_FEATURED_MOVIES));
  }, []);

  const body = (
    <div style={modalStyle} className={movieStyle.paper}>
        <div className={movieStyle.headPaper}>
           
          
        </div>
        <div className={classes.clickable}>
        <a onClick={handleClose} className={modalClasses.btn}> <CancelIcon/></a>
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
                <Typography className = {movieStyle.movieStarring}>Starring</Typography>
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

  

  return (
    <div className={classes.root}>
      {movies.map((movie, index) => (
        <MovieCard modalOpen = {handleOpen} fetchId = {getId} large data={movie} key={index} />
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
    </div>
    
  );
};

export default withStyles(styles)(FeaturedMovies);
