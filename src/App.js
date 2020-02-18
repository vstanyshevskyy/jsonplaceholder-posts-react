import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Nav from './components/navigation'
import Posts from './components/posts-table'
import Post from './components/post'
import './App.css';

function App() {
  return (
    <Router>
      <Nav />
      <div className='content-wrapper'>
        <Switch>
          <Route path='/post/:id'>
            <Post />
          </Route>
          <Route path='/'>
            <Posts />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
