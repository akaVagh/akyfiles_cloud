import {
	CognitoUser,
	AuthenticationDetails,
	CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { userPool } from './config';
import { validateToken } from './validateToken';
import { useNavigate } from 'react-router-dom';

export const signUp = (email, name, password, navigate) => {
	const attributeList = [
		{
			Name: 'name',
			Value: name,
		},
	];
	return new Promise((resolve, reject) => {
		userPool.signUp(email, password, attributeList, null, (err, result) => {
			if (err) {
				reject(err);
			} else {
				navigate('/login');

				console.log('result', result);
			}
		});
	});
};

export const signIn = (email, password, navigate) => {
	return new Promise((resolve, reject) => {
		const user = new CognitoUser({ Username: email, Pool: userPool });
		const authDetails = new AuthenticationDetails({
			Username: email,
			Password: password,
		});

		user.authenticateUser(authDetails, {
			onSuccess: async (result) => {
				const accessToken = result.getAccessToken().getJwtToken();
				sessionStorage.setItem('access_token', accessToken);
				const currentUser = getCurrentUser();
				if (currentUser) {
					const userData = await getUserAttributes();
					sessionStorage.setItem(
						'user_data',
						JSON.stringify(userData)
					);
				}
				resolve(result);
				navigate('/home');
				window.location.href = '/home';
			},
			onFailure: (err) => {
				reject(err);
			},
		});
	});
};

export const signOut = () => {
	const user = userPool.getCurrentUser();
	if (user) {
		user.signOut();
		sessionStorage.removeItem('access_token');
		window.location.reload();
	}
};

export const getCurrentUser = () => {
	return userPool.getCurrentUser();
};

export const getUserAttributes = () => {
	const currentUser = userPool.getCurrentUser();
	if (!currentUser) return null;

	const sessionPromise = new Promise((resolve, reject) => {
		currentUser.getSession((err, session) => {
			if (err) reject(err);
			else resolve(session);
		});
	});

	const attributesPromise = new Promise((resolve, reject) => {
		currentUser.getUserAttributes((err, attributes) => {
			if (err) reject(err);
			else {
				const userData = {};
				attributes.forEach((attribute) => {
					userData[attribute.getName()] = attribute.getValue();
				});
				resolve(userData);
			}
		});
	});

	return Promise.all([sessionPromise, attributesPromise])
		.then(([session, userData]) => userData)
		.catch((error) => {
			console.error('Error getting user data:', error.message);
			return null;
		});
};

export const checkToken = async () => {
	const token = sessionStorage.getItem('access_token');
	if (token) {
		try {
			const isValid = await validateToken(token);
			return isValid;
		} catch (error) {
			console.error('Error validating token:', error);
		}
	}
	return false;
};

export const getToken = () => {
	const token = sessionStorage.getItem('access_token');
	return token;
};
