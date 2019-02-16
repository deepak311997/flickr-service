import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import { Group, PermMedia, CommentRounded, Warning } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import config from '../../config/config';

const { basePath } = config.path;

const styles = theme => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  container: {
    padding: '0px 150px',
    margin: '20px 0px',
    width: '100%',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  iconBadge: {
    paddingLeft: 10,
  },
  enterText: {
    display: 'flex',
    justifyContent: 'center',
  },
  iconValues: {
    margin: 4,
  },
});

class AppGroupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: [],
      photosInfo: [],
      noSearchText: true,
      loading: true,
    };
    this.photosInfo = [];
  }

  componentDidMount = () => this.getGroupSearchData(this.props.searchTerm);

  componentWillReceiveProps = (nextProps) => {
    if (this.props.searchTerm !== nextProps.searchTerm) {
      this.getGroupSearchData(nextProps.searchTerm);
    }
  };

  getGroupSearchData = (searchText) => {
    axios.get(
      `${window.config.restURL}flickr.groups.search&api_key=${
        window.config.apiKey
      }&text=${searchText}&format=json&nojsoncallback=1`).then(
      (response) => {
        if (response.data.code === 1) {
          this.setState({ loading: false, searchData: [] });
        } else {
          this.setState({ searchData: response.data.groups.group, noSearchText: false, loading: false },
            () => this.getPopularPhotos(response.data.groups.group));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getPopularPhotos = (groups) => {
    this.popularWithLikes = this.quickSort(groups, true);
    this.popularWithComments = this.quickSort(groups, false);

    this.popularData = {
      likes: this.popularWithLikes,
      comments: this.popularWithComments,
    };
  };

  quickSort = (origArray, isLikes) => {
    if (origArray.length <= 1) {
      return origArray;
    }

    const left = [];
    const right = [];
    const newArray = [];
    const pivot = origArray.pop();
    const length = origArray.length;

    if (isLikes) {
      for (let i = 0; i < length; i++) {
        if (origArray[i].members > pivot.members) {
          left.push(origArray[i]);
        } else {
          right.push(origArray[i]);
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (origArray[i].pool_count > pivot.pool_count) {
          left.push(origArray[i]);
        } else {
          right.push(origArray[i]);
        }
      }
    }

    return newArray.concat(this.quickSort(left, isLikes), pivot, this.quickSort(right, isLikes));
  };

  handleGroupSelection = (id) => {
    this.props.history.push({
      pathname: `${basePath}/group/${id}/gallery`,
      state: this.popularData,
    });
  };

  processSearchResult = (response) => {
    const { classes } = this.props;
    const searchData = [];

    response.forEach((group) => {
      searchData.push(
        <Grid
          key={group.nsid}
          item={true}
          className='group-paper'
          onClick={this.handleGroupSelection.bind(this, group.nsid)}
        >
          <Grid container={true}>
            <Grid item={true} direction={'column'} className='align-center' sm={12} md={12} lg={12} xl={12}>
              <Avatar
                src={`https://www.flickr.com/buddyicons/${group.nsid}.jpg`}
                alt={group.name}
                className={classes.bigAvatar}
              />
              <Typography gutterBottom={true} variant='title'>
                {group.name}
              </Typography>
              <Typography color='textSecondary'>ID: {group.nsid}</Typography>
            </Grid>
          </Grid>
          <Grid container={true} className='justify-center group-data'>
            <Grid container={true} justify={'center'}><Typography>Gallery</Typography></Grid>
            <Grid container={true} justify={'center'}>
              <span className='align-inline'>
                <Group className={classes.iconBadge}/>
                <Typography classes={{ root: classes.iconValues }} color='textSecondary'>{group.members}
                </Typography>
              </span>
              <span className='align-inline'>
                <PermMedia className={classes.iconBadge}/>
                <Typography classes={{ root: classes.iconValues }} color='textSecondary'>{group.pool_count}
                </Typography>
              </span>
              <span className='align-inline'>
                <CommentRounded className={classes.iconBadge}/>
                <Typography classes={{ root: classes.iconValues }} color='textSecondary'>{group.topic_count}
                </Typography>
              </span>
            </Grid>
          </Grid>
        </Grid>
      );
    });
    return searchData;
  };

  render() {
    const { classes } = this.props;
    const { loading, searchData, noSearchText } = this.state;

    return (
      <Grid container={true} spacing={16} className={classes.container}>
        {loading && <Grid item={true} sm={12} md={12} lg={12} xl={12}><CircularProgress className={classes.progress} /></Grid>}
        {noSearchText &&
        <Grid className={classes.enterText} item={true} sm={12} md={12} lg={12} xl={12}>
          <Warning className={classes.iconBadge}/>
          <Warning className={classes.iconBadge}/>
          <Typography>  Please Insert Search Text !!</Typography>
          <Warning className={classes.iconBadge}/>
          <Warning className={classes.iconBadge}/>
        </Grid>}
        {!loading && !noSearchText && this.processSearchResult(searchData)}
      </Grid>
    );
  }
}

AppGroupComponent.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  searchTerm: PropTypes.string,
};

export default withStyles(styles)(withRouter(AppGroupComponent));
