import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import LazyLoad from 'react-lazyload';

import { CircularProgress, GridList, GridListTile, GridListTileBar, ListSubheader, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import config from '../../config/config';
import SearchIcon from '@material-ui/icons/Search';

const { basePath } = config.path;

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    padding: '0px 150px',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  loadingIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
});

class AppGalleryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: {},
      loading: true,
    };
  }

  componentDidMount = () => {
    axios.get(
      `https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=${
        window.config.apiKey
      }&group_id=${this.props.match.params.groupId}&per_page=20&format=json&nojsoncallback=1`).then(
      (response) => {
        this.setState({ photos: response.data.photos, loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handlePhotoSelection = (photoId) => {
    const { params } = this.props.match;

    this.props.history.push({ pathname:`${basePath}/group/${params.groupId}/gallery/${photoId}/overview`,
    state: this.props.location.state });
  };

  setPhotosOntoGrid = () => {
    const { classes } = this.props;
    const { photos } = this.state;
    const perPagePhotos = [];

    photos.photo.forEach((photo) => {
      perPagePhotos.push(
        <GridListTile key={photo.id} className='photoGrid' onClick={this.handlePhotoSelection.bind(this, photo.id)}>
          <LazyLoad>
            <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} alt={photo.title} />
          </LazyLoad>
          <GridListTileBar
            title={photo.title}
            subtitle={<div style={{ display: 'Grid' }}><span>By: {photo.ownername}</span><span>Date Added: {photo.dateadded}</span></div>}
            actionIcon={
              <IconButton className={classes.icon}>
                <InfoIcon />
              </IconButton>
            }
          />
        </GridListTile>
      );
    });

    return perPagePhotos;
  };

  handleKeyDown =(event) => {if (event.keyCode === 13) { this.handleChangePage(); }};

  handleChangePage = () => {
    const page = JSON.parse(document.getElementById('pageNumber').value);

    if (page <= this.state.photos.pages) {
      axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=${
          window.config.apiKey
        }&group_id=${this.props.match.params.groupId}&page=${page}&per_page=20&format=json&nojsoncallback=1`)
        .then(
          (response) => {
            this.setState({ photos: response.data.photos, loading: false });
          })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.alert(`Please enter page numbers between 1 - ${this.state.photos.pages}`);
    }
  };

  render() {
    const { classes } = this.props;
    const { loading, photos } = this.state;

    return (
      <React.Fragment>
        {loading ? <CircularProgress className={classes.loadingIcon}/> :
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key='Header' cols={2} style={{ height: 'auto' }}>
              <ListSubheader component='div'>Photo Gallery</ListSubheader>
              <div style={{ display: 'flex', margin: '20px' }}>
                <Typography className='text-style' >Current Page: {photos.page}</Typography>
                <div className='search-bar'>
                  <input id='pageNumber' type='number' className='search-textfield'
                    placeholder='Enter Page Number' onKeyDown={this.handleKeyDown}
                  />
                  <span
                    className='search-img-base cursor-pointer'
                    onClick={this.handleChangePage}
                  >
                    <SearchIcon className={classes.searchIcon}/></span>
                </div>
              </div>
            </GridListTile>
            {this.setPhotosOntoGrid()}
          </GridList>
        }
      </React.Fragment>
    );
  }
}

AppGalleryComponent.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
};

export default withStyles(styles)(withRouter(AppGalleryComponent));
