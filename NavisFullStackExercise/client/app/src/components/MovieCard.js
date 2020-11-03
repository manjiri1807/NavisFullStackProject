// libs
import React from 'react';

// components
import { withStyles, Typography } from '@material-ui/core';

// modules
import { SET_SELECTED_MOVIE_ID } from '@app/modules/actions';

// util
import buildAction from '@app/util/buildAction';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    padding: '30px 20px 0px',
    float:'left',
    '& .MuiTypography-root': {
      color: theme.palette.app.white,
    },
  },
  clickable: {
    cursor: 'pointer',
  },
  title: {
    fontWeight: '600',
    fontSize: '0.85rem'
  },
  poster: {
    webkitBoxShadow: "0 0 3px #000",
    mozBoxShadow: "0 0 3px #000",
    boxShadow: "0 0 3px #000",
    borderRadius: '4px',
  },
  
});


const MovieCard = props => {
  const { data, large = false, classes } = props;

  const width = large ? 267 : 200;
  const height = large ? 396 : 295;

  const handleOpen = () => {
    props.modalOpen(true)
    getId();
  }

  const getId =() =>{
    props.fetchId(data.id)
  }

  return (
    <div className={classes.root} style={{ width }}>
      <div className={classes.clickable}>
      <a onClick = {handleOpen} ><img
          src={`/images/${data.poster}`}
          alt={`${data.title} Poster`}
          className={classes.poster}
          style={{ width, height }}
        />
        <Typography className={classes.title}>
          {data.title}
        </Typography>
        <Typography>
          {data.year} ({data.rating})
        </Typography>
        </a>
      </div>
    </div>
  );
};

export default withStyles(styles)(MovieCard);
