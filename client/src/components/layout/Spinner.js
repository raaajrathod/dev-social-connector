import React, {Fragment} from "react";
import preloader from "../../img/preloader.gif";

const Spinner = () => {
  return (  
    <Fragment>
      <img
        src={preloader}
        alt='Loading...'
        style={{width: "200px", margin: "auto", display: "block"}}
      />
    </Fragment>
  );
};

export default Spinner;
