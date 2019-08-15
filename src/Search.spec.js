import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Search, { query, initialState } from "./Search";

configure({ adapter: new Adapter() });

describe("mount search", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Search id={undefined} />);
  });
  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("should render with arg", () => {
    wrapper = shallow(<Search id={"react"} />);
    expect(wrapper.exists()).toBeTruthy();
  });
  it("should define a gql query", () => {
    expect(query).toBeDefined();
  });
  it("should define initial state", () => {
    const mockInitialState = {
      searchTextVal: "",
      searchStarsVal: "",
      searchLicenseVal: "",
      searchForkVal: undefined,
      searchLicenseStr: "",
      searchStarsStr: "",
      searchTextStr: "",
      form: {
        searchText: "",
        searchStars: "",
        searchLicense: "",
        searchFork: undefined
      }
    };
    expect(initialState).toEqual(mockInitialState);
  });
});
