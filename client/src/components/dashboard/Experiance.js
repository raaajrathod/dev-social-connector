import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Moment from "react-moment";

const Experiance = ({experiance}) => {
  const experiances = experiance.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{" "}
        {exp.current ? "Now" : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
      </td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));
  const {
    current,
    title,
    _id,
    company,
    location,
    from,
    to,
    description
  } = experiance;
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
        <tbody>{experiances}</tbody>
      </table>
    </Fragment>
  );
};

Experiance.propTypes = {
  experiance: PropTypes.array.isRequired
};

export default Experiance;
