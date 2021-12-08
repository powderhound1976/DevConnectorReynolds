import axios from 'axios';

import { setAlert } from './alert';

import {
	GET_ONE_PROFILE,
	GET_ALL_PROFILES,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	CLEAR_PROFILE,
	ACCOUNT_DELETED,
	GET_REPOS,
} from './types';

// Get current users profiles
export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/me');

		dispatch({
			type: GET_ONE_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Get current users profiles
export const getProfilesWithSkill = skill => async dispatch => {
	try {
		const res = await axios.get(`api/skills/${skill}`);

		dispatch({
			type: GET_ALL_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Get list of skills
export const getListOfSkills = () => async dispatch => {
	try {
		const res = await axios.get(`api/profile/skills`);

		dispatch({
			type: GET_ALL_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Get all profiles
export const getProfiles = () => async dispatch => {
	dispatch({ type: CLEAR_PROFILE });

	try {
		const res = await axios.get('/api/profile');

		dispatch({
			type: GET_ALL_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);
		
			dispatch(
				{
					type: GET_ONE_PROFILE,
					payload: res.data,
				},
				// console.log(JSON.stringify(res.data))
			);
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: 'err.response.statusText',
				status: 8888888,
			},
		});
	}
};

//Get Github repos
export const getGithubRepos = username => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/github/${username}`);

		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Create or update profile
export const createProfile =
	(formData, history, edit = false) =>
	async dispatch => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const res = await axios.post('/api/profile', formData, config);

			dispatch({
				type: GET_ONE_PROFILE,
				payload: res.data,
			});

			dispatch(
				setAlert(
					edit ? 'Profile Updated' : 'Profile Created',
					'success'
				)
			);

			if (!edit) {
				history.push('/dashboard');
			}
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach(error =>
					dispatch(setAlert(error.msg, 'danger'))
				);
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	};

// Add experience
export const addExperience = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(
			'/api/profile/experience',
			formData,
			config
		);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Experience Added', 'success'));

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Add education
export const addEducation = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put('/api/profile/education', formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Education Added', 'success'));

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Delete experience
export const deleteExperience = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Experience Removed', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Delete education
export const deleteEducation = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Education Removed', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Delete account & profile
export const deleteAccount = () => async dispatch => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		try {
			await axios.delete('/api/profile');

			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: ACCOUNT_DELETED });

			dispatch(setAlert('Your account has been permanently deleted'));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	}
};
