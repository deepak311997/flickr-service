import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import AppHighchartComponent from './app-highchart-component';

class AppOverviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoInfo: {},
      loading: true,
    };
  }

  componentWillMount = () => {
    this.simulatePopularityData(this.props.location.state);
  };

  getLikesGraphData = () => ({ top10Likes: this.top10Likes, otherLikes: this.otherLikes, allLikes: this.allLikes });

  getCommentsGraphData = () => ({ top10Comments: this.top10Comments, otherComments: this.otherComments, allComments: this.allComments });

  simulatePopularityData = (data) => {
    const likesData = data.likes;
    const commentsData = data.comments;

    this.otherLikes = 0;
    this.allLikes = 0;
    this.allComments = 0;
    this.otherComments = 0;
    this.top10Likes = likesData.slice(0, 10);
    this.top10Comments = commentsData.slice(0, 10);

    likesData.map((like) => {
      this.allLikes = this.allLikes + JSON.parse(like.members);
    });

    commentsData.map((comment) => {
      this.allComments = this.allComments + JSON.parse(comment.pool_count);
    });

    likesData.slice(11).map((group) => {
      this.otherLikes = this.otherLikes + JSON.parse(group.members);
    });

    commentsData.slice(11).map((group) => {
      this.otherComments = this.otherComments + JSON.parse(group.pool_count);
    });
  };

  render() {
    return (
      <div style={{ margin: '35px' }}>
        <AppHighchartComponent
          title='Overview of Likes'
          data={this.getLikesGraphData()}
          containerId='pieChart1'
          isLikes={true}
        />
        <AppHighchartComponent
          title='Overview of Comments'
          data={this.getCommentsGraphData()}
          containerId='pieChart2'
          isLikes={false}
        />
      </div>
    );
  }
}

AppOverviewComponent.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(AppOverviewComponent);
