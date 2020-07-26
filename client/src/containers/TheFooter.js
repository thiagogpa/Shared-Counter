import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>    
      <a target="_blank" rel='noopener noreferrer'>
        <a href="https://github.com/thiagogpa">thiagogpa</a>
      </a>
      &nbsp; 2020
    </CFooter>
  );
};

export default React.memo(TheFooter);
