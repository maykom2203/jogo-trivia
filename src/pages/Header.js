import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    localStorage.setItem('url', url);
  }

  render() {
    const { name, score } = this.props;
    const { url } = this.state;
    return (
      <header className="head">
        <img clasName="imageHead" src={ url } alt="nossa cara" data-testid="header-profile-picture" />
        <h1 data-testid="header-player-name">{name}</h1>
        <h1>Sua pontuação:</h1>
        <h1
          data-testid="header-score"
        >
          {score}
        </h1>
        <div className="nameScore" />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
