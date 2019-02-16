import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  header: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0px 150px',
    height: 60,
  },
  title: {
    display: 'none',
    position: 'absolute',
    alignSelf: 'flex-start',
    fontFamily: 'Osl',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  searchIcon: {
    fill: 'black',
    fontSize: 20,
  },
});

class AppHeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    if (this.props.isGroup) {
      const searchField = document.getElementById('searchField');
      let timeout = null;

      searchField.onkeyup = (event) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => this.props.handleSearch(event.target.value), 500);
      };
    }
  };

  render() {
    const { classes, isGroup } = this.props;

    return (
      <AppBar position='static' className={classes.header}>
        <Typography className={classes.title} variant='display1' color='inherit' noWrap={true}>
          Flickr Service
        </Typography>
        { isGroup &&
        <div className='search-bar'>
          <input id='searchField' type='text' className='search-textfield'
            placeholder='Search By Group Name'
          />
          <span className='search-img-base'><SearchIcon className={classes.searchIcon}/></span>
        </div>}
      </AppBar>
    );
  }
}

AppHeaderComponent.propTypes = {
  classes: PropTypes.object,
  isGroup: PropTypes.bool,
  handleSearch: PropTypes.func,
};

export default withStyles(styles)(AppHeaderComponent);
