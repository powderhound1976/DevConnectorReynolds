const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');

// @route   GET api/pinned
// @desc    Get pinned posts by user id
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const pinned = await Post.find().sort({ date: -1 });
		const pinnedPosts = [];
		if (!pinned) {
			return res.status(400).json({ msg: 'No pinned posts' });
		}
		for (let i = 0; i < pinned.length; i++) {
			pinned[i].likes.map(
				(like, index) => 
				pinnedPosts.unshift(pinned[i]), // !!WORKS!!
			);
			// for (let j = 0; j < pinned[i].likes.length; j++) {
			// 	if (pinned[i].likes[j].user.toString() === req.user.id) {
			// 		pinned[i].post = true;
			// 	}
			// }
		}

		const mine = [];

		for (let i = 0; i < pinnedPosts.length; i++) {
			for (let j = 0; j < pinnedPosts[i].likes.length; j++) {
				if (pinnedPosts[i].likes[j].user.toString() === req.user.id) {
					mine.push(pinnedPosts[i]);
				}
			}
		}

		res.json(mine);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
