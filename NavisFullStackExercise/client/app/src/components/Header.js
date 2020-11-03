// libs
import React, { useState } from 'react';

// components
import { withStyles } from '@material-ui/core';
import Logo from '@app/components/Logo';
import SearchInput from '@app/components/SearchInput';
import SearchRecords from '@app/components/SearchRecords';
import FeaturedMovies from '@app/components/FeaturedMovies';


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.app.darkGray,
    // TODO
  },
  left: {
    float: 'left',
    padding: '20px 0px 10px 0px',
  },
  right: {
    float: 'right',
    padding: '25px 57px 20px 0px',
  },
  wrapper: {
    margin: '0 auto',
    width: '960px',
    borderRadius: '4px 4px 0 0',
    padding: '0 20px',
    mozBoxShadow: "0 0 4px #000",
    boxShadow: "0 0 4px #000",
    marginLeft : '-20px',
    backgroundColor: theme.palette.app.darkGray,
    webkitBoxShadow: "0 0 4px #000",
    
  },
  clear: {
    clear: 'both',
  },
});

const Header = props => {
  const [currentPage, setPagination] = useState(1);
  const [isClickToSearch, setSearch] = useState(false);
  const [title, setTitle] = useState("");
  const [actor, setActor] = useState("");
  const [genre, setGenre] = useState("");
  const handlePageChange = (value) => {
    setPagination(value);
  }
  const handleSearch = (status) => {
    debugger;
    setSearch(status);
    if (!status) {
      setTitle("");
      setActor("");
      setGenre("");
    }
  }



  const { classes } = props;
  return (
    <div >
      <div className={classes.wrapper}>
        <div className={classes.left}><Logo onClickToSearch={handleSearch} /></div>
        <div className={classes.right}><SearchInput title={title} actor={actor} genre={genre} setTitle={setTitle} setActor={setActor} setGenre={setGenre} onClickToSearch={handleSearch} onPageChange={handlePageChange} /></div>
        <div className={classes.clear}></div>
      </div>
      <div>
        {!isClickToSearch && <FeaturedMovies />}
        {isClickToSearch && <SearchRecords title={title} actor={actor} genre={genre} currentPage={currentPage} onPageChange={handlePageChange} />}
      </div>
    </div>
  );
};

export default withStyles(styles)(Header);
