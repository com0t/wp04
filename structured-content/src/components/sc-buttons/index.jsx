import React, {Component} from 'react';
import {icons} from '../../util/icons.jsx';

class SC_Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <button type="button" className={`sc_button ${this.props.className ?
            this.props.className :
            ''}`} onClick={this.props.action}
                style={this.props.style && this.props.style}>
          {this.props.icon &&
          <span className="icon-span">{this.props.differentIcon ?
              this.props.differentIcon :
              icons.plus}</span>}
          {this.props.children}
        </button>
    );
  }
}

export default SC_Button;