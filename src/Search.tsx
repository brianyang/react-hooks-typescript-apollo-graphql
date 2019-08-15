import React, { useReducer } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { ShowResults } from "./ShowResults";
import { SearchForm } from "./SearchForm";
import { searchReducer } from "./searchReducer";
import * as T from "./types";
import branding from "./branding";
import "./Search.css";

export const query = gql`
  query($searchText: String!) {
    repo(repo: $searchText) @rest(type: "Repository", path: "?q={args.repo}") {
      total_count
      items
    }
  }
`;

export const ShowsResultQuery = graphql(query, {
  options: ({
    searchText,
    searchTextForm,
    searchStarsStr,
    searchLicenseStr,
    form
  }: T.Options) => {
    return {
      variables: {
        searchText,
        searchTextForm,
        searchStarsStr,
        searchLicenseStr,
        form
      }
    };
  }
})(ShowResults);

export const initialState: T.SearchState = {
  searchTextVal: "",
  searchTextStr: "",
  searchStarsVal: "",
  searchStarsStr: "",
  searchLicenseVal: "",
  searchLicenseStr: "",
  searchForkVal: undefined,
  form: {
    searchText: "",
    searchStars: "",
    searchLicense: "",
    searchFork: undefined
  }
};

const Search = (props: T.SearchProps) => {
  const [state, dispatch] = useReducer<
    React.Reducer<T.SearchState, T.SearchAction>
  >(searchReducer, initialState);

  let searchTextStr, searchStarsStr, searchLicenseStr;

  const getUrlState = () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("r")) {
      searchTextStr = searchParams.get("r");
    }
    if (searchParams.get("s")) {
      searchStarsStr = searchParams.get("s");
    }
    if (searchParams.get("l")) {
      searchLicenseStr = searchParams.get("l");
    }
  };

  getUrlState();

  let searchTextLoad
  if (searchTextStr !== undefined) {
    searchTextLoad = searchTextStr
  }
  else {
    searchTextLoad = state.form.searchText
  }

  return (
    <React.Fragment>
      <SearchForm
        dispatch={dispatch}
        searchTextStr={searchTextStr}
        searchStarsVal={state.searchStarsVal}
        searchStarsStr={searchStarsStr}
        searchLicenseStr={searchLicenseStr}
      />
      {searchTextLoad === "" && (
        <div className="copy">{branding.initSearchCopy}</div>
      )}

      {searchTextLoad !== "" &&  (
        <>
        <div style={{textAlign: 'center', margin: '2rem 0'}}>SEARCH results</div>
        <ShowsResultQuery
          searchText={searchTextLoad}
          searchTextForm={state.form.searchText}
          searchStarsStr={searchStarsStr}
          searchLicenseStr={searchLicenseStr}
          form={state.form}
        />
        </>
      )}

    </React.Fragment>
  );
};

export default Search;
