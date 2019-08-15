import React from "react";
import { Card, Tag } from "antd";
import Spinner from "react-spinkit";
import * as T from "./types";
import branding from "./branding";
import "./ShowResults.css";

export const filterStars = (
  filterItems: any,
  items: T.Item[],
  searchStars: any
) => {
  filterItems = items.filter((item: T.Item) => {
    // this bit of code feels like a hack but without implementing a
    // server component there is no elegant way to filter by stars due to github
    // v3 api limitations
    const getOperator = searchStars.split("")[0];
    const hasOperator = isNaN(Number(getOperator));

    if (!hasOperator) return item.stargazers_count === parseInt(searchStars);
    let derivedNumber = searchStars.split("");
    derivedNumber.shift();
    derivedNumber = derivedNumber.join().replace(/,/, "");
    derivedNumber = parseInt(derivedNumber.replace(/,/g, ""));

    if (getOperator === "<") return item.stargazers_count < derivedNumber;
    if (getOperator === ">") return item.stargazers_count > derivedNumber;

    return item;
  });
  return filterItems;
};

export const filterLicense = (
  filterItems: any,
  items: T.Item[],
  searchLicense: any
) => {
  return filterItems.filter(
    (item: T.Item) => item.license && item.license.key === searchLicense
  );
};

export const ShowResults = ({ data }: any) => {
  const { searchStars, searchLicense, searchFork } = data.variables.form;
  if (data.loading) return <Spinner name="circle" fadeIn="none" />;
  let items = data.repo && data.repo.items;

  let filterItems = items;
  if (items) {
    if (data.variables.searchStarsStr) {
      filterItems = filterStars(
        filterItems,
        items,
        data.variables.searchStarsStr
      );
    } else if (searchStars) {
      filterItems = filterStars(filterItems, items, searchStars);
    }

    if (data.variables.searchLicenseStr) {
      filterItems = filterLicense(
        filterItems,
        items,
        data.variables.searchLicenseStr
      );
    } else if (searchLicense) {
      filterItems = filterLicense(filterItems, items, searchLicense);
    }

    if (searchFork !== undefined) {
      filterItems = filterItems.filter((item: T.Item) => {
        if (item.fork === searchFork) return item;
        return true;
      });
    }
  }

  if (filterItems.length === 0)
    return <>There are no results that match your search</>;

  return (
    <>
      {filterItems &&
        filterItems.map((item: T.Item, index: any) => (
          <React.Fragment key={index}>
            <Card>
              <div className="row">
                <span className="first-col col">
                  <h4>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.html_url}
                    >
                      {item && item.full_name}
                    </a>
                  </h4>
                  <p>{item.description}</p>
                  <Tag color={branding.primary}>
                    {!!item.forks_count && "forked"}
                  </Tag>
                </span>
                <span className="col">
                  <strong>Stars:</strong>
                  <div className="item-val"> {item.stargazers_count}</div>
                </span>
                <span className="col">
                  <strong>License:</strong>
                  <div className="item-val">
                    {item && item.license && item.license.name}
                  </div>
                </span>
              </div>
            </Card>
          </React.Fragment>
        ))}
    </>
  );
};
