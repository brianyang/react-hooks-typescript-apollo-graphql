import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RestLink } from "apollo-link-rest";
import { Layout } from "antd";
import dotenv from "dotenv";
import branding from "./branding";
import Search from "./Search";
import "./App.css";
import "antd/dist/antd.css";

dotenv.config();

const { Header, Footer, Content } = Layout;

const searchRepositoriesApi = "https://api.github.com/search/repositories";

const restLink = new RestLink({ uri: searchRepositoriesApi });
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
});

const App = () => (
  <>
    <Layout style={{ background: branding.bodyBg }}>
      <Header style={{ background: branding.primary }}>
        <a href="/">
          <img src={branding.logo} alt={branding.title} height="20px" />
        </a>
      </Header>
      <Content style={{ padding: "1rem" }}>
        <h1 style={{ color: branding.fontColor }} className="title">
          <span>{branding.title}</span> 
          <span>Github Repository Search</span>
        </h1>
        <div className="container">
          <div className="app">
            <div className="separator" />
            <Search />
          </div>
        </div>
      </Content>
      <Footer
        style={{
          background: branding.primary,
          color: branding.fontColorSecondary
        }}
        dangerouslySetInnerHTML={{ __html: branding.footerCopy }}
      />
    </Layout>
  </>
);

const ApolloApp = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default ApolloApp;
