import React, { Fragment } from "react";
// import logo from './logo.svg';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import PostItem from "./components/PostItem";
import CreatePost from "./components/CreatePost";
import UserProfile from "./components/UserProfile";
import Profile from "./components/Profile";

const httpLink = createHttpLink({
  uri: "https://malq-api.davaerde.now.sh/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Fragment>
        <Header />
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/posts/:id" component={PostItem} />
          <Route path="/create" component={CreatePost} />
          <Route path="/users/:id" component={UserProfile} />
          <Route path="/profile" component={Profile} />
        </main>
      </Fragment>
    </Router>
  </ApolloProvider>
);

export default App;
