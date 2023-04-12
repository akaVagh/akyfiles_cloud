import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './FileTable.module.css';
import GetAppIcon from '@mui/icons-material/GetApp';
import ShareIcon from '@mui/icons-material/Share';
import ImageIcon from '@mui/icons-material/Image';

const FileTable = ({ files }) => {
	const [previewImage, setPreviewImage] = useState(null);

	const fileSize = (size) => {
		const i = Math.floor(Math.log(size) / Math.log(1024));
		return (
			(size / Math.pow(1024, i)).toFixed(2) * 1 +
			' ' +
			['B', 'KB', 'MB', 'GB', 'TB'][i]
		);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-US', {
			timeZone: 'America/Sao_Paulo', // Use IANA time zone name
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}).format(date);
	};

	const preview = (data) => {
		const byteCharacters = atob(data);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);
		const blob = new Blob([byteArray], { type: 'image/jpeg' });
		const imageUrl = URL.createObjectURL(blob);
		setPreviewImage(imageUrl);
	};

	const closeModal = () => {
		setPreviewImage(null);
	};

	const downloadFile = (file) => {
		const { name, data, type } = file;

		const byteCharacters = atob(data);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);
		const blob = new Blob([byteArray], { type: type });
		const url = URL.createObjectURL(blob);

		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = name;
		anchor.style.display = 'none';
		document.body.appendChild(anchor);

		anchor.click();

		// Remove the anchor from the DOM
		document.body.removeChild(anchor);

		// Revoke the object URL to free up memory
		URL.revokeObjectURL(url);
	};

	return (
		<>
			{previewImage && (
				<div className={styles.modal} onClick={closeModal}>
					<img
						className={styles.previewImage}
						src={previewImage}
						alt='Preview'
					/>
				</div>
			)}
			<div className={styles.fileTable}>
				{files.map((file, index) => (
					<div className={styles.fileCard} key={index}>
						<div className={styles.fileIcon}>
							<ImageIcon />
						</div>
						<div className={styles.fileInfo}>
							<div className={styles.fileName}>{file.name}</div>
							<div className={styles.fileDetails}>
								<div>{file.type.split('/')[1]}</div>
								<div>{formatDate(new Date())}</div>
								<div>{fileSize(file.data.length)}</div>
							</div>
						</div>
						<div className={styles.fileActions}>
							<button
								className={styles.actionButton}
								onClick={() => preview(file.data)}
							>
								Preview
							</button>
							<button className={styles.actionButton}>
								<ShareIcon />
							</button>
							<button
								className={styles.actionButton}
								onClick={() => downloadFile(file)}
							>
								<GetAppIcon />
							</button>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default FileTable;
