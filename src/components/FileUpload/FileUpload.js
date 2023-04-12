import React, { useRef, useState } from 'react';
import styles from './FileUpload.module.css';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { getUserAttributes } from '../../auth/authentication';

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 50000000;

const convertNestedObjectToArray = (nestedObj) =>
	Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
	label,
	maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
	...otherProps
}) => {
	const fileInputField = useRef(null);
	const [files, setFiles] = useState({});

	const handleUploadBtnClick = () => {
		fileInputField.current.click();
	};

	const addNewFiles = (newFiles) => {
		for (let file of newFiles) {
			if (file.size <= maxFileSizeInBytes) {
				if (!otherProps.multiple) {
					return { file };
				}
				files[file.name] = file;
			}
		}
		return { ...files };
	};

	const updateUploadedFiles = (files) => {
		const filesAsArray = convertNestedObjectToArray(files);
		// Perform any additional actions required here with filesAsArray
	};

	const handleNewFileUpload = (e) => {
		const { files: newFiles } = e.target;
		if (newFiles.length) {
			let updatedFiles = addNewFiles(newFiles);
			setFiles(updatedFiles);
			updateUploadedFiles(updatedFiles);
		}
	};

	const removeFile = (fileName) => {
		delete files[fileName];
		setFiles({ ...files });
		updateUploadedFiles({ ...files });
	};

	const readFileAsDataURL = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onerror = () => {
				reader.abort();
				reject(new Error('Error reading file.'));
			};

			reader.onload = () => {
				resolve(reader.result);
			};

			reader.readAsDataURL(file);
		});

	const uploadFiles = async () => {
		console.log('uploaded');
		const apiUrl =
			'https://6vf8gy91dd.execute-api.us-east-1.amazonaws.com/api/upload-images';

		try {
			const filesArray = convertNestedObjectToArray(files);
			const filesDataPromises = filesArray.map(async (file) => {
				const data = await readFileAsDataURL(file);
				return {
					name: file.name,
					type: file.type,
					data: data.split(',')[1],
				};
			});

			const filesData = await Promise.all(filesDataPromises);

			getUserAttributes().then(async (userData) => {
				console.log('username', userData.name);

				const requestData = {
					files: filesData,
					username: userData.name,
					email: userData.email,
				};
				console.log('requestData', requestData);

				const response = await axios.post(apiUrl, requestData);

				if (response.status === 200) {
					setMessage('Files uploaded successfully');
					setFiles([]);
				} else {
					console.error(
						'Error uploading files:',
						response.statusText
					);
				}
			});
		} catch (error) {
			console.error('Error uploading files:', error.message);
		}
	};

	const [message, setMessage] = useState(null);

	return (
		<div className={styles.container}>
			{message && (
				<Alert variant='success' className={styles.message}>
					{message}
				</Alert>
			)}
			<label className={styles.inputLabel}>{label}</label>
			<section className={styles.fileUploadContainer}>
				<p className={styles.dragDropText}>
					Drag and drop your files anywhere or
				</p>
				<button
					type='button'
					className={styles.uploadFileBtn}
					onClick={handleUploadBtnClick}
				>
					{' '}
					<i className='fas fa-file-upload' />
					<span className={styles.addBtn}>
						{' '}
						Add {otherProps.multiple ? 'files' : 'a file'}
					</span>
				</button>
				<input
					type='file'
					className={styles.formField}
					ref={fileInputField}
					onChange={handleNewFileUpload}
					title=''
					value=''
					{...otherProps}
					accept='.jpg,.png,.jpeg'
				/>
			</section>
			<article className={styles.filePreviewContainer}>
				<span className={styles.label}>To Upload</span>
				<section className={styles.previewList}>
					{Object.keys(files).map((fileName, index) => {
						let file = files[fileName];
						let isImageFile = file.type.split('/')[0] === 'image';
						return (
							<section
								key={fileName}
								className={styles.previewContainer}
							>
								<div>
									{isImageFile && (
										<img
											className={styles.imagePreview}
											src={URL.createObjectURL(file)}
											alt={`file preview ${index}`}
										/>
									)}
									<div
										className={`${styles.fileMetaData} ${
											isImageFile
												? ''
												: styles.fileMetaDataVisible
										}`}
									>
										<span>{file.name}</span>
										<aside>
											<span>
												{convertBytesToKB(file.size)} kb
											</span>
											<button
												onClick={() =>
													removeFile(fileName)
												}
												aria-label={`Remove ${fileName}`}
											>
												<FontAwesomeIcon
													icon={faTrashAlt}
												/>
											</button>
										</aside>
									</div>
								</div>
							</section>
						);
					})}
				</section>
			</article>
			<button
				className={styles.uploadButton}
				disabled={Object.keys(files).length === 0 ? true : false}
				onClick={() => {
					console.log(files);
					uploadFiles();
				}}
			>
				Upload
			</button>
		</div>
	);
};
export default FileUpload;
