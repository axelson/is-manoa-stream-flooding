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
          <LiquidFillGauge value={this._streamHeightPct()} />
        </div>
      </div>
    );
  },

  _streamHeightPct() {
    if (this.props.streamHeight) {
      return this.props.streamHeight / 11 * 100;
    } else {
      return 0;
    }
  },
});

module.exports = StreamGauge;
