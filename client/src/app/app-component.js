import React from 'react';
import PropTypes from 'prop-types';

import AppHeaderComponent from './header/app-header-component';
import AppGroupComponent from './group/app-group-component';
import AppGalleryComponent from './gallery/app-gallery-component';
import AppOverviewComponent from './overview/app-overview-component';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      isGroup: false,
      isGallery: false,
      isOverview: false,
    };
  }

  componentWillMount = () => {
    this.setRoute(this.props.match.params);
  };

  componentWillReceiveProps = (nextProps) => {
    if (this.props.match.params !== nextProps.match.params) {
      this.setRoute(nextProps.match.params);
    }
  };

  setRoute = (params) => {
    if (params.groupId && params.photoId) {
      this.setState({ isGallery: false, isGroup: false, isOverview: true });
    } else if (params.groupId) {
      this.setState({ isGallery: true, isGroup: false, isOverview: false });
    } else {
      this.setState({ isGallery: false, isGroup: true, isOverview: false });
    }
  };

  handleSearch = (term) => {
    this.setState({ searchTerm: term });
  };

  render() {
    const { isGroup, isGallery, isOverview } = this.state;

    return (
      <React.Fragment>
        <AppHeaderComponent isGroup={isGroup} handleSearch={this.handleSearch}/>
        {isGroup && <AppGroupComponent searchTerm={this.state.searchTerm}/>}
        {isGallery && <AppGalleryComponent/>}
        {isOverview && <AppOverviewComponent/>}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default App;
