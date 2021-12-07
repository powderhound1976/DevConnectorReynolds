import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post: { posts, date} }) => {
  
  useEffect(() => {
    getPosts('dec');
  }, [getPosts]);

  // const dateSort = () => {
  //   sortDirection = 'acc';
  //   return sortDirection;
  // };


  return (
		<Fragment>
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Welcome to the community
			</p>
			<button
				className='primary'
				onClick={() => {
					getPosts('acc');
				}}>
				Sort Accending
			</button>
			<button
				className='primary'
				onClick={() => {
					getPosts('dec');
				}}>
				Sort Decending
			</button>
			<PostForm />
			<div className='posts'>
				{posts.map(post => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
