import React, { Component } from 'react';
import Patients from './pages/patients';
import Practitioner from './components/Practitioner';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ErrorBoundary from './components/Errorboundary';
import Questionnaire from './components/Questionnaire';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Patients />
          </Route>
          <Route path="/practitioner">
            <ErrorBoundary>
              <Practitioner />
            </ErrorBoundary>
          </Route>
          <Route path="/questionnaire">
            <Questionnaire />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
