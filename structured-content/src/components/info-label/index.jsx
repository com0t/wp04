import React, {Component} from 'react';

import {icons} from '../../util/icons.jsx';

class InfoLabel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <a href={this.props.url} target="_blank" className="sc_info-label">
          {icons.info} Info
        </a>
    );
  }
}

export default InfoLabel;
