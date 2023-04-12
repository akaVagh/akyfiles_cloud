// import { jwtVerify, createRemoteJWKSet } from 'jose';
// import { useEffect, useState } from 'react';
// import { signOut } from './authentication';

// const JWKSetUrl =
// 	'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_Fe4I35ALY/.well-known/jwks.json';

// // Configure the remote JWK set
// const remoteJWKSet = createRemoteJWKSet(new URL(JWKSetUrl), {
// 	timeoutDuration: 5000,
// });

// export const validateToken = async (token) => {
// 	try {
// 		const decoded = await jwtVerify(token, remoteJWKSet, {
// 			algorithms: ['RS256'],
// 		});
// 		return Promise.resolve(decoded);
// 	} catch (err) {
// 		return Promise.reject(err);
// 	}
// };

// export const useIsValidating = () => {
// 	const [isValidating, setValidating] = useState(true);
// 	const [isValidToken, setValidToken] = useState(false);

// 	useEffect(() => {
// 		const checkTokenValidity = async () => {
// 			const token = sessionStorage.getItem('access_token');
// 			if (token) {
// 				try {
// 					const isValid = await validateToken(token);
// 					setValidToken(isValid);
// 				} catch (error) {
// 					console.error('Error validating token:', error);
// 					signOut();
// 				}
// 			}
// 			setValidating(false);
// 		};

// 		checkTokenValidity();
// 	}, []);

// 	return [isValidating, isValidToken];
// };
