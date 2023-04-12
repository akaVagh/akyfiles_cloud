import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SignUp.module.css';
import { Button, Form, Alert } from 'react-bootstrap';
import { signUp } from '../../auth/authentication';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		username: '',
	});

	const [errors, setErrors] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = validateForm();
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
		} else {
			try {
				await signUp(
					formData.email,
					formData.username,
					formData.confirmPassword,
					navigate
				).then(() => {
					setSuccessMessage(
						'User registered! Please confirm email!!'
					);
				});
			} catch (error) {
				console.error('Error signing in:', error);
				setErrorMessage(`Error signing up: ${error.message}`);
			}
			// Handle successful form submission
			console.log('Form submitted:', formData);
		}
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.email) newErrors.email = 'Email is required.';
		if (!formData.password) newErrors.password = 'Password is required.';
		if (formData.password !== formData.confirmPassword)
			newErrors.confirmPassword = 'Passwords do not match.';
		if (!formData.username) newErrors.username = 'Username is required.';
		else if (formData.username.length < 6 || formData.username.length > 16)
			newErrors.username =
				'Username must be between 6 and 16 characters long.';

		return newErrors;
	};

	return (
		<div className={styles.registrationContainer}>
			<h2 className={styles.registrationTitle}>Sign Up</h2>
			{errorMessage && (
				<Alert variant='danger' className={styles.errorMessage}>
					{errorMessage}
				</Alert>
			)}
			{errorMessage && (
				<Alert variant='success' className={styles.successMessage}>
					{successMessage}
				</Alert>
			)}
			<form className={styles.registrationForm} onSubmit={handleSubmit}>
				<label htmlFor='email'>Email address</label>
				<input
					type='email'
					placeholder='Enter email'
					name='email'
					id='email'
					value={formData.email}
					onChange={handleChange}
					className={errors.email ? 'is-invalid' : ''}
				/>
				{errors.email && (
					<div className={styles.message}>{errors.email}</div>
				)}
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					placeholder='Username'
					name='username'
					id='username'
					value={formData.username}
					onChange={handleChange}
					className={errors.username ? 'is-invalid' : ''}
				/>
				{errors.username && (
					<div className={styles.message}>{errors.username}</div>
				)}
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					placeholder='Password'
					name='password'
					id='password'
					value={formData.password}
					onChange={handleChange}
					className={errors.password ? 'is-invalid' : ''}
				/>
				{errors.password && (
					<div className={styles.message}>{errors.password}</div>
				)}
				<label htmlFor='confirmPassword'>Confirm Password</label>
				<input
					type='password'
					placeholder='Confirm Password'
					name='confirmPassword'
					id='confirmPassword'
					value={formData.confirmPassword}
					onChange={handleChange}
					className={errors.confirmPassword ? 'is-invalid' : ''}
				/>
				{errors.confirmPassword && (
					<div className={styles.message}>
						{errors.confirmPassword}
					</div>
				)}{' '}
				<button type='submit'>Sign Up</button>
			</form>
		</div>
	);
};

SignUp.propTypes = {};

SignUp.defaultProps = {};

export default SignUp;
