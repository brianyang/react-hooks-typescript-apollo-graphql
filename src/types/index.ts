export type Props = {
  data: Data;
};
export type LicenseKey = {
  name: String;
};
export type SearchProps = {
  id?: String;
  s?: String;
};

export type Item = {
  repo: Object;
  full_name: String;
  stargazers_count: Number;
  description: String;
  html_url: string;
  fork: Boolean;
  forks_count: Number;
  license: {
    key: String;
    name: String;
  };
};

type Data = {
  repo: {
    items: Item[];
  };
  variables: {
    searchInput: String;
    searchStars?: String;
    searchLicense: String;
  };
};

export type Options = {
  searchText?: String;
  searchTextForm?: String;
  searchStarsStr?: String;
  searchLicenseStr?: String;
  searchStars?: String;
  searchLicense?: String;
  searchFork?: Boolean;
  form?: any;
};

export type SearchForm = {
  searchText: String;
  searchStars: String;
  searchLicense: String;
  searchFork?: Boolean;
};

export type SearchState = {
  searchTextVal: String;
  searchTextStr: String;
  searchStarsVal: String;
  searchStarsStr: String;
  searchLicenseVal: String;
  searchLicenseStr: String;
  searchForkVal?: Boolean;
  form: SearchForm;
};

export type SearchAction = {
  type: SearchActions;
  value?: String;
};

export type SearchActionArg = {
  type?: SearchActions;
  value?: String;
};

type SearchActions =
  | "searchTextVal"
  | "searchStarsVal"
  | "searchLicenseVal"
  | "searchForkVal"
  | "sendForm";
