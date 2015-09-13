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
    let promise = true ? this._getRealData() : this._getMockData();
    promise.then(this._handleData);
  },

  _getMockData() {
    let mockData = 8;
    return new Promise(function(resolve, reject) {
      resolve(mockData);
    });
  },

  _getRealData() {
    // parameters:
    // * period: how long (P1D is one day). If not included returns the instantaneous result
    // * parameterCd: what parameter (stream height, flow)
    // * sites: the site/sensor to get the data from
    let url = 'http://waterservices.usgs.gov/nwis/iv/?format=rdb&sites=16241600&parameterCd=00065';
    return new Promise(function(resolve, reject) {
      $.get(url).success(function(data) {
        let lines = data.split("\n").filter( (d) => !d.startsWith('#') );
        // Remove precision data (what makes this RDS)
        lines.splice(1, 1);
        var result = d3.tsv.parse(lines.join("\n"));
        // 02_00065 has the actual data
        resolve(result[0]['02_00065']);
      });
    });
  },

  _handleData(currentStreamHeight) {
    if (this.isMounted()) {
      this.setState({
        currentStreamHeight,
      });
    }
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
