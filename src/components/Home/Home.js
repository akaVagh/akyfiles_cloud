import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.css';
import arcimg from '../../ProjectArc.jpg';
const Home = () => {
	return (
		<div className={styles.Home}>
			<h1>Application Architecture</h1>
			<img src={arcimg} className={styles.center} />
		</div>
	);
};
Home.propTypes = {};

Home.defaultProps = {};

export default Home;
