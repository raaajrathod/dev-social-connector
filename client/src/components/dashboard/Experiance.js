import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Moment from "react-moment";
import {deleteExperience} from "../../actions/ProfileAction";

const Experiance = ({experiance, deleteExperience}) => {
  const experiances = experiance.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{" "}
        {exp.current ? "Now" : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
      </td>
      <td>
        <button
          onClick={() => deleteExperience(exp._id)}
          className='btn btn-danger'>
          Delete
        </button>
      </td>
    </tr>
  ));

  if (experiance.length == 0) {
    return <Fragment> </Fragment>;
  }
  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentails</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {experiances.length == 0 ? <p>No Record Found</p> : experiances}
        </tbody>
      </table>
    </Fragment>
  );
};

Experiance.propTypes = {
  experiance: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  {deleteExperience}
)(Experiance);
