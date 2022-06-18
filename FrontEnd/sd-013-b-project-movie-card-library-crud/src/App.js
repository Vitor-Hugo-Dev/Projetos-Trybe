import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MovieList, MovieDetails, NewMovie, EditMovie, NotFound } from './pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/movies/new"
          render={ () => <NewMovie /> }
        />
        <Route
          exact
          path="/movies/:id/edit"
          render={ (props) => <EditMovie { ...props } /> }
        />
        <Route
          exact
          path="/movies/:id"
          render={ (props) => <MovieDetails { ...props } /> }
        />
        <Route
          exact
          path="/"
          render={ () => <MovieList /> }
        />
        <Route
          path=""
          component={ NotFound }
        />
      </Switch>
    </BrowserRouter>
    // foi consultado o link: https://imasters.com.br/front-end/gerenciando-rotas-com-react-router, para inplementar a rota que renderiza o componente NotFound.
  );
}

export default App;
