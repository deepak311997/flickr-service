import React from 'react';
import Proptypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
highchartsMore(Highcharts);
solidGauge(Highcharts);

const styles = () => ({
  highchartContainer: {
    minWidth: 310,
    height: 400,
    maxWidth: 600,
    margin: '100px auto',
  },
});

class AppHighchartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.getData();
  };

  componentDidMount = () => {
    const { containerId, title, isLikes } = this.props;

    this.getHighchart(containerId, title, isLikes);
  };

  getData = () => {
    const { allLikes, allComments, otherComments, otherLikes, top10Likes, top10Comments } = this.props.data;

    if (this.props.isLikes) {
      this.graphData = top10Likes.map(like => ({ name: like.name, y: like.members / allLikes }));
      this.graphData.push({ name: 'others', y: otherLikes / allLikes });
    } else {
      this.graphData = top10Comments.map(comment => ({ name: comment.name, y: comment.members / allComments }));
      this.graphData.push({ name: 'others', y: otherComments / allComments });
    }
  };

  getHighchart = (containerId, title, isLikes) =>
    Highcharts.chart(containerId, {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: title,
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: Highcharts.theme && Highcharts.theme.contrastTextColor || 'black',
            },
          },
        },
      },
      series: [{
        name: isLikes ? 'Likes' : 'Comments',
        colorByPoint: true,
        data: this.graphData,
      }],
    });

  render() {
    const { classes, containerId } = this.props;

    return <div id={containerId} className={classes.highchartContainer}/>;
  }
}
AppHighchartComponent.propTypes = {
  classes: Proptypes.object,
  containerId: Proptypes.string,
  data: Proptypes.object,
  title: Proptypes.string,
  isLikes: Proptypes.bool,
};

export default withStyles(styles)(AppHighchartComponent);
