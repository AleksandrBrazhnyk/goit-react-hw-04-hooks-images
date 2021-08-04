import React from "react";
import PropTypes from "prop-types";
import { button } from "./Button.module.css";

function Button({ onLoadMore }) {
  return (
    <button type="button" className={button} onClick={onLoadMore}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
