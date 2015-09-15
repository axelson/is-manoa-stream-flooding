let React = require('react');

let {
  liquidFillGaugeDefaultSettings,
  loadLiquidFillGauge,
} = require('./gaugeFunctions');

let LiquidFillGauges = React.createClass({
  getInitialState: function() {
    return {
      gauge: undefined,
    };
  },

  componentDidMount() {
    var config1 = liquidFillGaugeDefaultSettings();
    //config1.circleColor = "#FF7777";
    //config1.textColor = "#FF4444";
    //config1.waveTextColor = "#FFAAAA";
    //config1.waveColor = "#FFDDDD";
    config1.circleThickness = 0.1;
    config1.textVertPosition = 0.8;
    config1.waveAnimateTime = 1000;

    var streamHeightPct = this._streamHeightPct();
    var gauge = loadLiquidFillGauge("fillgauge2", streamHeightPct, config1);
    this.setState({
      gauge,
    });
  },

  render() {
    if (this.state.gauge) {
      var streamHeightPct = this._streamHeightPct();
      this.state.gauge.update(streamHeightPct);
    }

    return (
      <svg id="fillgauge2" width="19%" height="200"></svg>
    );
  },

  _streamHeightPct() {
    return this.props.streamHeight / 11 * 100;
  },

});

module.exports = LiquidFillGauges;
