import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import { Alert } from 'react-bootstrap';
import { signIn } from '../../auth/authentication';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = validateForm();
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
		} else {
			// Handle successful form submission
			console.log('Form submitted:', formData);
			try {
				await signIn(formData.email, formData.password, navigate);
			} catch (error) {
				console.error('Error signing in:', error);
				setErrorMessage(`Error signing in: ${error.message}`);
			}
		}
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.email) newErrors.email = 'Email is required.';
		if (!formData.password) newErrors.password = 'Password is required.';

		return newErrors;
	};

	return (
		<div className={styles.loginContainer}>
			<h2 className={styles.loginTitle}>Login</h2>
			{errorMessage && (
				<Alert variant='danger' className={styles.errorMessage}>
					{errorMessage}
				</Alert>
			)}
			<form className={styles.loginForm} onSubmit={handleSubmit}>
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
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
