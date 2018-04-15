import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo" style={{}}>
        <Link to="/" className="logo-text">
          <img src={require('../../public/images/logoko.png')} alt="logo" height={60} width={200} />
        </Link>
      </div>
    );
  }
}
