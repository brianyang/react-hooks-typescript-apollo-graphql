import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import { SearchForm } from "./SearchForm";
import { Input } from "antd";

configure({ adapter: new Adapter() });

describe("search form", () => {
  let wrapper;
  let mockDispatch = jest.fn();
  let mockSearchTextStr = "mockStr";
  let mockState = {
    searchStarsVal: ">0"
  };
  beforeEach(() => {
    wrapper = shallow(
      <SearchForm
        dispatch={mockDispatch}
        searchTextStr={mockSearchTextStr}
        searchStarsVal={mockState.searchStarsVal}
      />
    );
  });
  it("should mount and render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render form inputs and button", () => {
    const tree = renderer
      .create(
        <SearchForm
          dispatch={mockDispatch}
          searchTextStr={mockSearchTextStr}
          searchStarsVal={mockState.searchStarsVal}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe("search form fields", () => {
    let searchInput, starsInput, event;
    beforeEach(() => {
      searchInput = wrapper.find(Input).get(0);
      starsInput = wrapper.find(Input).get(1);
      event = {
        target: {
          value: "foo"
        }
      };
    });
    it("should show default value when loading url", () => {
      const mockProps = {
        defaultValue: mockSearchTextStr,
        type: "text"
      };
      expect(searchInput.props.defaultValue).toEqual(mockProps.defaultValue);
      expect(searchInput.props.type).toEqual(mockProps.type);
    });
    it("should have an onChange handler", () => {
      expect(searchInput.props.onChange).toBeDefined();
    });
    it("should handle on change of stars", () => {
      starsInput.props.onChange(event);
      expect(mockDispatch).toHaveBeenCalled();
    });
    it("should handle license select menu", () => {});
    it("should handle forked checkbox", () => {});
  });
});
