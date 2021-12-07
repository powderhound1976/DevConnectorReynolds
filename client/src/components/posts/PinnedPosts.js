import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPinned, getPosts } from '../../actions/post';

const Pinned = ({ auth, getPinned, getPosts, likes, post: { posts} }) => {
	useEffect(() => {
		getPinned();
    getPosts();
	}, [getPinned, getPosts]);
  console.log(likes);
	return (
		<Fragment>
			<h1 className='large text-primary'>Pinned Posts</h1>
			<p className='lead'>
				<i className='fas fa-user' /> These are posts that you have pinned
			</p>
			

			<div className='posts'>
				{posts.map((p,i) => (
          p.likes.map(like => (
            like.user === auth.user._id ? (<PostItem key={p._id} post={p} />) : null
          ))
          )
					
				)}
			</div>
		</Fragment>
	);
};

Pinned.propTypes = {
	getPinned: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
  likes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	post: state.post,
	auth: state.auth,
});

export default connect(mapStateToProps, { getPosts, getPinned })(Pinned);
