import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HEADER_HEIGHT } from "./Header";
import FlowSelector from "../FlowSelector/FlowSelector";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { makeStyles } from "@material-ui/core/styles";
import { MAX_NAVBAR_WIDTH } from "../Navigation/Navigation";

const Container = styled.div`
  position: fixed;
  height: calc(${HEADER_HEIGHT} + 2) px;
  left: 0px;
  right: 0px;
  top: 0px;
  margin-top: ${HEADER_HEIGHT}px;
  margin-left: ${MAX_NAVBAR_WIDTH}px;

  background: #ffffff;
  border: 1px solid #cccccc;
  z-index: 100;
  button {
    text-transform: none;
  }
`;

const APPLICATION_STAGE = {
  interest: "letter_of_interest",
  full: "full_application"
};

//return current application stage from path
function getNavId(pathname) {
  const parts = pathname.split("/");
  return parts.length >= 2 && parts[2] === "full"
    ? APPLICATION_STAGE.full
    : APPLICATION_STAGE.interest;
}

const useStyles = makeStyles({
  selected: {
    borderColor: "#005EB8"
  },
  unselected: {
    borderColor: "transparent"
  }
});

const Header2 = ({ pathname, push }) => {
  const [selected, setSelected] = useState(getNavId(pathname));
  const styles = useStyles();

  useEffect(() => {
    setSelected(getNavId(pathname));
  }, [pathname]);

  //Update selected state, and load new path (attach /full in the path)
  const onNavClick = (id) => {
    setSelected(id);

    const parts = pathname.split("/");
    const pathFirstPart = parts[1]; //submissions | applications
    const pathAddedPart = id === APPLICATION_STAGE.full ? "/full" : "";
    // ie. If submissions/full/abc -> pathSecondPart does not include 'full' (it is 'abc')
    let pathSecondPart = "";
    if (parts.length >= 3 && parts[2] === "full")
      pathSecondPart = parts.slice(3).join("/");
    else if (parts.length >= 2) pathSecondPart = parts.slice(2).join("/");
    const forwardedPath =
      "/" + pathFirstPart + pathAddedPart + "/" + pathSecondPart;
    push(forwardedPath);
  };

  return (
    <Container>
      <FlowSelector>
        <button
          id={APPLICATION_STAGE.interest}
          className={
            selected === APPLICATION_STAGE.interest
              ? styles.selected
              : styles.unselected
          }
          onClick={() => {
            onNavClick(APPLICATION_STAGE.interest);
          }}
        >
          1. Letter of interest
        </button>
        <button
          id={APPLICATION_STAGE.full}
          className={
            selected === APPLICATION_STAGE.full
              ? styles.selected
              : styles.unselected
          }
          onClick={() => {
            onNavClick(APPLICATION_STAGE.full);
          }}
        >
          2. Full application
        </button>
      </FlowSelector>
    </Container>
  );
};

export default connect(
  (state) => ({
    pathname: state.router.location.pathname
  }),
  { push }
)(Header2);
