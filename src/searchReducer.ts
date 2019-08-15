import * as T from "./types";

export const searchReducer: React.Reducer<T.SearchState, T.SearchAction> = (
  state: T.SearchState,
  action: any 
) => {
  switch (action.type) {
    case "searchTextVal":
      return { ...state, searchTextVal: action.value };
    case "searchStarsVal":
      return { ...state, searchStarsVal: action.value };
    case "searchLicenseVal":
      return { ...state, searchLicenseVal: action.value };
    case "searchForkVal":
      return { ...state, searchForkVal: action.value };
    case "sendForm":
      return {
        ...state,
        form: {
          searchText: state.searchTextStr,
          searchStars: state.searchStarsStr,
          searchLicense: state.searchLicenseStr,
          searchFork: state.searchForkVal
        }
      };
    default:
      return {...state};
  }
};
