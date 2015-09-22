let React = require('react');
require('./liquidFillGauge');

let LiquidFillGauges = React.createClass({
  getInitialState: function() {
    return {
      gauge: null,
    };
  },

  componentDidMount() {
    var config = {
      waveAnimateTime: 1000,
      textVertPosition: 0.8,
    };

    var element = this.getDOMNode();
    // Work around d3.liquidfillgauge bug where an initial value of 0 will
    // cause there to be no wave at all
    // https://github.com/ugomeda/d3-liquid-fill-gauge/issues/1
    var gauge = d3.select(element).call(d3.liquidfillgauge, 20, config);
    gauge.on("valueChanged")(this.props.value);
    this.setState({
      gauge,
    });
  },

  componentWillUnmount() {
    if (this.state.gauge) {
      this.state.gauge.on("destroy");
    }
  },

  render() {
    if (this.state.gauge) {
      window.updateHeight = true;
      this.state.gauge.on("valueChanged")(this.props.value);
    }

    return (
      <svg id="fillgauge2" width="19%" height="200"></svg>
    );
  },
});

module.exports = LiquidFillGauges;
