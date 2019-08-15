import React, { useState } from "react";
import { Button, Form, Input, Checkbox, Select, Alert, Divider } from "antd";
import { createBrowserHistory } from "history";
import branding from "./branding";
import "./SearchForm.css";

const { Option } = Select;
const history = createBrowserHistory();

type AppState = {
  r?: string
  s?: string
  l?: string
}

export const setStateUrl = (appState: AppState) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (appState.r) {
    searchParams.set("r", appState.r);
  }
  if (appState.s) {
    searchParams.set("s", appState.s);
  }
  if (appState.s === "") {
    searchParams.delete("s")
  }
  if (appState.l) {
    searchParams.set("l", appState.l);
  }
  if (appState.l === "") {
    searchParams.delete("l");
  }
  const str = searchParams.toString();
  history.push({
    pathname: `?${str}`
  });
};

export const SearchForm = ({
  dispatch,
  searchTextStr,
  searchStarsVal,
  searchStarsStr,
  searchLicenseStr
}: any) => {
  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState(true);

  return (
    <React.Fragment>
      {error !== "" && <Alert message={error} type="error" />}
      <Form>
        <div className="row">
          <Form.Item>
            Text
            <Input
              onChange={event => {
                setStateUrl({ r: event.target.value });
              }}
              defaultValue={searchTextStr}
              style={branding.inputStyles}
            />
          </Form.Item>
          <Form.Item>
            Stars
            <Input
              onChange={event => {
                dispatch({ type: "searchStarsVal", value: event.target.value });
                setStateUrl({ s: event.target.value });
              }}
              onBlur={event => {
                const symbolNum = () => {
                  if (
                    searchStarsVal.split("")[0] === "<" ||
                    searchStarsVal.split("")[0] === ">" ||
                    Number(searchStarsVal.split("")[0]) ||
                    searchStarsVal.split("")[0] === "0" ||
                    searchStarsVal.split("")[0] === "" ||
                    searchStarsVal.split("")[0] === undefined
                  ) {
                    if (
                      /^[0-9]*$/.exec(searchStarsVal.substring(1)) &&
                      /^[0-9]*$/.exec(searchStarsVal.substring(1)) !== null
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                  return false;
                };
                if (symbolNum()) {
                  setError("");
                  setFormValid(true);
                } else {
                  setError(
                    "there is an error in your star syntax search query"
                  );
                  setFormValid(false);
                }
              }}
              defaultValue={searchStarsStr}
              style={branding.inputStyles}
            />
          </Form.Item>
        </div>
        <div className="row">
          <Form.Item>
            License
            <Select
              defaultValue={searchLicenseStr}
              onChange={value => {
                setStateUrl({ l: value });
              }}
              style={branding.inputStyles}
            >
              <Option value="">any</Option>
              <Option value="mit">MIT</Option>
              <Option value="isc">ISC</Option>
              <Option value="apache">Apache</Option>
              <Option value="gpl">GPL</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Checkbox
              id="include-forked"
              onChange={event => {
                dispatch({
                  type: "searchForkVal",
                  value: event.target.checked
                });
              }}
              style={branding.checkboxStyles}
            />
            <label htmlFor="include-forked">Include Forked</label>
          </Form.Item>
        </div>

        <div className="row">
          <Button
            style={branding.btnStyle}
            disabled={!formValid}
            type="primary"
            onClick={() => {
              dispatch({ type: "sendForm" });
            }}
          >
            search
          </Button>
          <Divider style={branding.dividerStyle} />
        </div>
      </Form>
    </React.Fragment>
  );
};
