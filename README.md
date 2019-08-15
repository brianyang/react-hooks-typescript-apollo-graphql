# Using React Hooks, TypeScript, and GraphQL with a Github API REST endpoint

## Implementation Details

Github implements their v4 API entirely in GraphQL. This challenge requires using v3, so this app implements `apollo-link-rest`. For license types I have added `any` to search for repositories of any license. This is logical because by default the user will search for repos of any type. Forcing them to reload the app to search for repos of any license type seems less than ideal.

# Summary

This demo application shows how to build an application from create-react-app, to an application that allows the user to search for github repositories, and filter the results. This demonstrates how to allow the developer to use GraphQL queries in their React components, without a need for a GraphQL server.

## Using Rest with Apollo

Apollo is a great tool for full-stack JavaScript applictions but it can also be used for client-side JavaScript applications, as seen here in this app. We create an instance of our Apollo Client and define an instance of the `RestLink` constructor, while passing it our endpoint url. Now we can use GraphQL queries in our React components. This example demonstrates how to use a function instead of a class, so we can avoid the overhead of instantiating our class. We wrap our component with `ApolloProvider`, our higher-ordered component (HOC).

## Search Container

Our Search Container Component uses React `useReducer` hook, to manage the state of our application, and the state of the queries sent to our API endpoints. Our GraphQL query takes the arguments passed to the endpoint. We create a HOC and pass our `ShowResults` component to the named export from `react-apollo`, graphql. We pass properties from our container component to our HOC, which returns these as props in our `ShowResults` component.

## Showing Search Results

Our component that handles showing search results, defines public methods for handling the filtering logic, so we can write unit-tests for these functions. This takes the data returned from our query component, filters the data, and shows it in the list.

## Theming

The look and feel is a theme built on top of Ant Design. In some instances CSS-in-JS may be used. Styled Components and Emotion are great solutions to handle styling, but CSS Modules is less effort with minimal styles.



# Demo Application

- Apollo
- GraphQL
- React Hooks
- TypeScript
- Jest

Using `apollo-link-rest` is one way to be able to use GraphQL queries in React, while staying completely in the client side working with REST endpoints.

This means theoretically we can upgrade to their v4 API by just configuring our Apollo Client.

Configuring the Apollo Client makes it easy to switch back and forth from using endpoints and GraphQL servers.

This implementation is built as a real-time app, by default. We have explicitly told it not to be. For example,we have two states for each field, the `searchTextVal` and the `searchText`. If we want this to be real-time we can set `searchText` instead of `searchTextVal` and everytime the user types, a new search will be invoked. The Apollo Client handles this for us, so we don't have to do it manually.

In other words, we need to store two states for each field. One to represent the controlled form state, and another to specify the state that is synced with the server. Without this, then this would update the search results as we type, which would mean we wouldn't need a button to submit the search. This is not necessarily better or worse, but the interaction is different.

*sorting only happens in the UI, and when the user checks 'forked' then we should keep making API requests to get more results

---


# Github Repository Search

Build a Github repository search UI, using the following endpoint from the Github API: https://developer.github.com/v3/search/#search-repositories.

The UI should consist of two elements:
- a form for specifying search parameters
- results from the latest search

There are visual mocks for desktop and mobile versions of the UI in `assets.zip`. The UI should be responsive, and should match these mocks as closely as possible. The mocks reference an image which can also be found in `assets.zip`.

You can use any library or framework with the exception of Github SDKs or API clients (i.e., your code should construct HTTP requests directly). Your application should not include a server component.

Treat this as if you were releasing a product to users, aim for code you would want to be in production. Ex: follow good scalability and maintenance practices, test responsively on multiple browsers, catch and handle errors, ensure all requirements are functional etc.

## Details

### Form

The form should include the following fields:

- **Text** - a text box for full-text search queries, maps to the `q` query parameter
- **Stars** - a text box that maps to the `stars` qualifier and supports the syntax specified [here](https://help.github.com/articles/searching-repositories/#search-based-on-the-number-of-stars-a-repository-has). If the syntax of the text is invalid upon blur, an inline error message should be displayed.
- **License** - a dropdown that maps to the `license` qualifier, and includes the MIT, ISC, Apache and GPL license types (using details listed [here](https://help.github.com/articles/licensing-a-repository/#searching-github-by-license-type))
- **Include Forked** - a checkbox that sets the `fork` qualifier to "true"

Fields should be validated in a user friendly manner.
A search should only be initiated when the user submits the form with valid field entries.

### Results

Each result should include the following data:

- Repo name
- Repo owner's name
- URL to the repo
- Description
- Number of stars
- License
- Whether or not the repo is forked

While results are loading from the API, all buttons and links in the UI should be disabled and a loading indicator should be displayed. If a search returns no results, that should be explicitly indicated in the results section.

Please be prepared to describe other functionality and how you would address it.

### Query Parameters

The UI should support setting form fields and the current page via query parameters. Also, whenever the user searches or clicks, the URL should be updated with the appropriate query parameters.

### Testing

Please demonstrate your knowledge of unit testing by covering any significant logic or services.
