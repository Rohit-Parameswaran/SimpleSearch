import React from "react";
import { Link } from "react-router-dom";
import "./SearchPage.css";
import { useStateValue } from "../StateProvider";
import useGoogleSearch from "./useGoogleSearch";
import Response from "./response";
import Search from "../components/Search";
import image from "../logo.png";

function SearchPage() {
  const [{ term }, dispatch] = useStateValue();
  // LIVE CALL
  const { data } = useGoogleSearch(term);
  // const data = Response;
  console.log("Displaying results for ", term, data);
  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img className="searchPage__logo" src={image} />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButtons />
          <div className="searchPage__options"></div>
        </div>
      </div>
      {term && (
        <div className="searchPage__results">
          <div className="searchPage__resultsCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime} seconds) for {term}
          </div>

          {data?.items.map((item) => (
            <div className="searchPage__result">
              <a className="searchPage__resultURL" href={item.link}>
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      className="searchPage__resultImage"
                      src={item.pagemap?.cse_image[0]?.src}
                      alt=""
                    />
                  )}
                {item.displayLink}⏷
              </a>
              <a className="searchPage__resultTitle" href={item.link}>
                <h2>{item.title}</h2>
              </a>
              <div className="searchPage__resultSnippet">{item.snippet}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
