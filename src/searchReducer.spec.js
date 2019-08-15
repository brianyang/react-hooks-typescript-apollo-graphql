import { searchReducer } from "./searchReducer";

describe("search reducer", () => {
  let mockState, mockAction;
  beforeEach(() => {
    mockState = { foo: "bar" };
    mockAction = "action";
  });
  it("should handle setting state", () => {
    const reducerResponse = searchReducer(mockState, mockAction);
    expect(reducerResponse).toBeTruthy();
  });
  it("should handle searchTextVal action", () => {
    const searchAction = {
      type: "searchTextVal",
      value: "searchedText"
    };
    const spreadedObj = { foo: "bar", searchTextVal: "searchedText" };
    const searchReducerFn = searchReducer(mockState, searchAction);
    expect(searchReducerFn).toEqual(spreadedObj);
  });
  it("should handle stars action", () => {
    const searchAction = {
      type: "searchStarsVal",
      value: "searchedStarsStr"
    };
    const spreadedObj = { foo: "bar", searchStarsVal: "searchedStarsStr" };
    const searchReducerFn = searchReducer(mockState, searchAction);
    expect(searchReducerFn).toEqual(spreadedObj);
  });
});
