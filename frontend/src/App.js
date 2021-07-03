import React from 'react';

import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';

import * as actions from './store/actions/auth';

import Main from './containers/Main';

class App extends React.Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Main {...this.props}>
            <BaseRouter />
          </Main>
        </Router>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);