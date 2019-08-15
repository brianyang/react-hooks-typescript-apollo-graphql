import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import { ShowResults, filterStars, filterLicense } from "./ShowResults";

configure({ adapter: new Adapter() });

describe("mount search", () => {
  let wrapper;
  let mockData = {
    variables: {
      form: {
        searchText: "search"
      }
    },
    repo: {
      items: [
        {
          description:
            "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
          fork: false,
          full_name: "facebook/react",
          html_url: "https://github.com/facebook/react",
          id: 10270250
        }
      ]
    }
  };
  beforeEach(() => {
    wrapper = shallow(<ShowResults data={mockData} />);
  });
  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("should test filter stars method", () => {
    const filteredStars = filterStars([], mockData.repo.items, "");
    expect(filteredStars).toEqual(mockData.repo.items);
  });
  it("should test filter license method", () => {
    const filteredLicense = filterLicense([], mockData.repo.items, "");
    expect(filteredLicense).toEqual([]);
  });
  it("should render show results markup", () => {
    const tree = renderer.create(<ShowResults data={mockData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
