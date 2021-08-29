import React, {Component} from 'react';

import {icons} from '../../util/icons.jsx';

class OpenLabel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div style={{cursor: 'pointer'}}>
          {this.props.open ? icons.openSummary : icons.closedSummary}
        </div>
    );
  }
}

export default OpenLabel;