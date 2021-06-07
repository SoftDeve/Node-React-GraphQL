import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from, ApolloLink } from "@apollo/client"
import { onError, ErrorResponse, } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'

const apolloErrorLink: ApolloLink = onError((errorResponse: ErrorResponse) => {
  if (errorResponse.graphQLErrors) {
    errorResponse.graphQLErrors.map((graphQLError: GraphQLError) => {
      alert(`Graphql error ${graphQLError.message}`)
    })
  }
})

const apolloLink: ApolloLink = from([
  apolloErrorLink,
  new HttpLink({ uri: "http://localhost:5000/graphql" }),
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: apolloLink
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
reportWebVitals();
