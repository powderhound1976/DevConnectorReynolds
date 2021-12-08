import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getListOfSkills } from '../../actions/profile'
import { connect } from 'react-redux';

const Skills = ({ getListOfSkills, skill }) => {
  
	useEffect(() => {
		getListOfSkills();
	}, [getListOfSkills]);

	return (
		<div className='skills'>
			<button className='btn btn-primary'>
				<Link to={`/${skill}`}>{skill}</Link>
			</button>
		</div>
	);
};

Skills.propTypes = {
  skill: PropTypes.string.isRequired,
  getListOfSkills: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  skill: state.profile.skill
});


export default connect(mapStateToProps, { getListOfSkills })( Skills);
