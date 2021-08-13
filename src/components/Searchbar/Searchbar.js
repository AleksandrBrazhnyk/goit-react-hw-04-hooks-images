import { useState } from "react";
import { toast } from "react-toastify";
import s from "./SearchBar.module.css";
import PropTypes from "prop-types";

function SearchBar({ onHandleSubmit }) {
  const [query, setQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      return toast.info("😱 Please enter a value for search images!");
    }
    onHandleSubmit(query);
    setQuery("");
  };

  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={onSubmit}>
        <button type="submit" className={s.btn}>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={({ target }) => setQuery(target.value)}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
