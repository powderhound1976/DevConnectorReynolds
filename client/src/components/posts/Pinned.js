import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import { getPinned } from '../../actions/post';

const Pinned = ({ auth, getPinned, likes, post: { posts } }) => {
	useEffect(() => {
		getPinned();
	}, [getPinned]);
	console.log(likes);
	return (
		<Fragment>
			<h1 className='large text-primary'>Pinned Posts</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Welcome back 
			</p>
		
			<div className='posts'>
				{posts.map(post => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</Fragment>
	);
};

Pinned.propTypes = {
	getPinned: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	post: state.post,
	auth: state.auth,
});

export default connect(mapStateToProps, { getPinned })(Pinned);
