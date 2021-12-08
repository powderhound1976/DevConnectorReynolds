import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {getProfilesWithSkill} from '../../actions/profile';

const ProfileItem = ({
	profile: {
		user: { _id, name, avatar },
		status,
		company,
		location,
		skills,
	},
	getProfilesWithSkill,
}) => {
	return (
		<div>
			<div className='profile bg-light'>
				<img src={avatar} alt='' className='round-img' />
				<div>
					<h2>{name}</h2>
					<p>
						{status} {company && <span> at {company}</span>}
					</p>
					<p className='my-1'>
						{location && <span>{location}</span>}
					</p>
					<Link to={`/profile/${_id}`} className='btn btn-primary'>
						View Profile
					</Link>
				</div>

				<ul>
					{skills.slice(0, 4).map((skill, index) => (
						<li
							key={index}
							className='text-primary'
							onClick={() => getProfilesWithSkill(skill)}>
							<i className='fas fa-check'></i> {skill}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfilesWithSkill: PropTypes.func.isRequired,
};

export default connect(null, { getProfilesWithSkill })(ProfileItem);
