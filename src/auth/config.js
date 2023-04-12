import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
	UserPoolId: 'us-east-1_Fe4I35ALY',
	ClientId: '61clcuv6b6r3i4u36hf1akejco',
};

export const userPool = new CognitoUserPool(poolData);
