// libs
import React from 'react';

// components
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    height: 64,
    backgroundColor: theme.palette.app.darkGray,
    margin: '0 auto',
    width: '960px',
    padding: '0 20px',
    borderRadius: '0 0 4px 4px',
    webkitBoxShadow: "0 0 4px #000",
    mozBoxShadow: "0 0 4px #000",
    boxShadow: "0 0 4px #000"

  },
});

const Footer = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
    </div>
  );
};

export default withStyles(styles)(Footer);
