import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();

    this.state = ({
      url: '',
    });

    this.gravatar = this.gravatar.bind(this);
  }

  componentDidMount() {
    this.gravatar();
  }

  gravatar() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      url,
    });
  }

  render() {
    const { name } = this.props;
    const { url } = this.state;
    return (
      <header>
        <img src={ url } alt="nossa cara" data-testid="header-profile-picture" />
        <h1 data-testid="header-player-name">{name}</h1>
        <h1
          data-testid="header-score"
        >
          0
        </h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  email: state.loginReducer.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
//
