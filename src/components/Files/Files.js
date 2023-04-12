import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Files.module.css';
import axios from 'axios';
import FileTable from '../FileTable/FileTable';

const Files = () => {
	const [files, setFiles] = useState([]);

	const userData = localStorage.getItem('user_data');
	const folder_name = JSON.parse(userData).name;

	const getApi =
		'https://6vf8gy91dd.execute-api.us-east-1.amazonaws.com/api/files/{folder-name}';

	useEffect(() => {
		async function fetchFiles() {
			try {
				const response = await axios.get(
					getApi.replace('{folder-name}', folder_name)
				);
				setFiles(response.data.files);
			} catch (error) {
				console.error(error);
			}
		}

		fetchFiles();
	}, []);

	console.log('files', files);

	return (
		<div>
			<FileTable files={files} />
			{/* <FileList items={files} /> */}
		</div>
	);
};

export default Files;
