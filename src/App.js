import React from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Upload from './components/Upload/Upload';

import { useIsValidating } from './auth/validateToken';
import { getToken } from './auth/authentication';
import Files from './components/Files/Files';

function App() {
	const [isValidating] = useIsValidating();
	if (isValidating) {
		return <div>Validating...</div>;
	}
	return (
		<div>
			<BrowserRouter>
				<Navbar></Navbar>
				<Routes>
					{getToken() ? (
						<>
							<Route exact path='/home' Component={Home} />
							<Route path='/upload' Component={Upload} />
							<Route path='/files' Component={Files} />
						</>
					) : (
						<Route
							path='*'
							element={<Navigate to='/login' replace />}
						/>
					)}
					<Route path='/register' Component={SignUp} />
					<Route path='/login' Component={Login} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
