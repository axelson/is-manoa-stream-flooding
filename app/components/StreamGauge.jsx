let React = require('react');
let mui = require('material-ui');

let LiquidFillGauge = require('./LiquidFillGauge');

let StreamGauge = React.createClass({
  render() {
    return (
      <div>
        <div>
          Stream gauge: {this.props.streamHeight}
        </div>
        <div>
          Note: if the height hits 11 feet the water is hitting the bridge.
        </div>
        <div>
          <LiquidFillGauge streamHeight={this.props.streamHeight} />
        </div>
      </div>
    );
  },
});

module.exports = StreamGauge;
