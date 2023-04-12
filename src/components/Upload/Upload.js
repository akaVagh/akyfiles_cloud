import React from 'react';
import PropTypes from 'prop-types';
import styles from './Upload.module.css';
import FileUpload from '../FileUpload/FileUpload';

const Upload = () => {
	return (
		<div className={styles.Upload}>
			<FileUpload label='Add file(s)' multiple />
		</div>
	);
};

Upload.propTypes = {};

Upload.defaultProps = {};

export default Upload;
