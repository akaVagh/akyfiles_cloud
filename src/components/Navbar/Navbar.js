import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';
import { signOut } from '../../auth/authentication';
import { Button } from 'react-bootstrap';

const Navbar = () => {
	const [isMenuActive, setIsMenuActive] = useState(styles['nav-menu']);
	const [isTogglerActive, setIsTogglerActive] = useState(
		styles['nav-toggler']
	);

	const navToggle = () => {
		setIsMenuActive(
			isMenuActive === styles['nav-menu']
				? `${styles['nav-menu']} ${styles['nav-active']}`
				: styles['nav-menu']
		);

		setIsTogglerActive(
			isTogglerActive === styles['nav-toggler']
				? `${styles['nav-toggler']} ${styles['toggle']}`
				: styles['nav-toggler']
		);
	};

	return (
		<nav className={styles.nav}>
			<div className={styles.brand}>
				<a className={styles.brand} href='#'>
					Skyfiles
				</a>
			</div>
			<div className={styles.toggle} onClick={navToggle}>
				<div className={styles.line1}></div>
				<div className={styles.line2}></div>
				<div className={styles.line3}></div>
			</div>
			<ul className={isMenuActive}>
				<li className={styles['menu-item']}>
					<a href='/home' className={styles['item-link']}>
						Home
					</a>
				</li>
				<li className={styles['menu-item']}>
					<a href='/upload' className={styles['item-link']}>
						Upload
					</a>
				</li>
				<li className={styles['menu-item']}>
					<a href='/files' className={styles['item-link']}>
						Files
					</a>
				</li>
				<li className={styles['menu-item']}>
					<a href='/register' className={styles['item-link']}>
						Register
					</a>
				</li>
				<li className={styles['menu-item']}>
					<a href='/login' className={styles['item-link']}>
						Login
					</a>
				</li>
				<li className={styles['menu-item']}>
					<a
						onClick={() => signOut()}
						className={styles['item-link']}
					>
						Logout
					</a>
				</li>
			</ul>
		</nav>
	);
};

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
