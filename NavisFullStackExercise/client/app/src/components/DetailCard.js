// libs
import React from 'react';

// components
import { withStyles, Typography } from '@material-ui/core';

// modules
import { SET_SELECTED_MOVIE_ID } from '@app/modules/actions';

// util
import buildAction from '@app/util/buildAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FETCH_MOVIE_DETAILS } from '../modules/actions';

import { selectMovieDetails} from '../modules/selectors';
import useQuery from '../modules/hooks';

const styles = theme => ({
  root: {
    padding: '0 20px 50px',
    '& .MuiTypography-root': {
      color: theme.palette.app.white,
    },
  },
  clickable: {
    cursor: 'pointer',    
  },
  poster: {
    // TODO
  },
  title: {
    // TODO
  },
});

const DetailCard = props => {
  const {  data, large = false, classes } = props;

  const width = large ? 267 : 200;
  const height = large ? 396 : 295;
   
  const dispatch = useDispatch();



  const query = useQuery();

  const searchQuery = {
      id : query.get("id")
  }

  

  useEffect(() => {
    dispatch(buildAction(FETCH_MOVIE_DETAILS,searchQuery));
  }, []);

  const details = useSelector(selectMovieDetails);

  return (
    <div className={classes.root} style={{ width }}>
      <div className={classes.clickable}>
        <img
          src={`/images/${   details.poster}`}
          alt={`${   details.title} Poster`}
          className={classes.poster}
          style={{ width, height }}
        />
        <Typography className={classes.title}>
          {   details.title}
        </Typography>
        <Typography>
          {   details.year} ({   details.rating})
        </Typography>
        <Typography>
          { details.studio}
        </Typography>
        <Typography>
          { details.plot}
        </Typography>
        <Typography>
        Starring
        {details.actor}
        </Typography>
        <Typography>
          {details.genre}
        </Typography>
      </div>
    </div>
  );
};

export default withStyles(styles)(DetailCard);
