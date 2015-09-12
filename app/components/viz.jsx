let React = require('react');
let mui = require('material-ui');
var $ = require('jquery');

let StreamGauge = require('./StreamGauge');

// This will render the visualization based on input received via the props
let Viz = React.createClass({
  getInitialState: function() {
    return {
      currentStreamHeight: 0,
    };
  },

  componentDidMount() {
    let url = 'http://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=16241600&period=P1D&parameterCd=00065';
    $.get(url, (result) => {
      let values = result.value.timeSeries[0].values[0].value;
      let currentStreamHeight = values.splice(-1)[0].value;
      if (this.isMounted()) {
        this.setState({
          currentStreamHeight,
        });
      }
    });
  },

  render() {
    return (
      <div>
        I will be the viz!
        <div>
          <StreamGauge streamHeight={this.state.currentStreamHeight} />
        </div>
      </div>
    );
  },
});

module.exports = Viz;
