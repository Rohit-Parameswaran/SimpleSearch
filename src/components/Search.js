import React, { useState } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import MicIcon from "@material-ui/icons/Mic";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function Search({ hideButtons = false }) {
  const [{ term }, dispatch] = useStateValue();

  const [input, setInput] = useState(term);
  const history = useHistory();

  const search = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      term: input,
    });
    history.push("/search");
  };

  return (
    <form className="search" onSubmit={search}>
      <div className="search__input">
        <SearchIcon className="search__inputIcon" />
        <input onChange={(e) => setInput(e.target.value)} value={input} />
        <MicIcon className="search__inputIcon" />
      </div>

      {!hideButtons && (
        <div className="search__buttons">
          <Button
            type="submit"
            onClick={search}
            variant="outlined"
            color="secondary"
          >
            Simple Search
          </Button>
        </div>
      )}
    </form>
  );
}

export default Search;
