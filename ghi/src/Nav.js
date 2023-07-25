import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
	useGetTokenQuery,
	useLoginMutation,
	useLogoutMutation,
	useCreateAccountMutation,
} from './store/authApi';
import { Modal } from 'bootstrap';

function Nav() {
	const {
		data: tokenData,
		error: tokenError,
		isLoading: tokenIsLoading,
	} = useGetTokenQuery();
	const [login, { isSuccess: loginIsSuccess, status: loginStatus }] =
		useLoginMutation();
	const [logout, { isSuccess: logoutIsSuccess, status: logoutStatus }] =
		useLogoutMutation();
	const [
		createAccount,
		{ isSuccess: createAccountIsSuccess, status: createAccountStatus },
	] = useCreateAccountMutation();

	const [registrationData, setRegistrationData] = useState({
		username: '',
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [avatar, setAvatar] = useState('');

	const fetchAvatar = async () => {
		if (tokenData) {
			let url = `http://localhost:8000/account/${tokenData.account.id}`;
			let response = await fetch(url);
			if (response.ok) {
				let data = await response.json();
				setAvatar(data.avatar);
			}
		}
	};
	useEffect(() => {
		fetchAvatar();
	}, [tokenData]);

	const userButton = () => {
		return (
			<div className="align-middle">
				<img className="rounded-circle" height="35px" src={avatar} />
				&nbsp;&nbsp; {tokenData.account.first_name}
			</div>
		);
	};

	const handleCreateAccountFormChange = async (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setRegistrationData({ ...registrationData, [name]: value });
	};

	const showCreateAccountModal = () => {
		const loginModal = Modal.getOrCreateInstance(
			document.getElementById('loginModal')
		);
		loginModal.hide();
		const createAccountModal = Modal.getOrCreateInstance(
			document.getElementById('createAccountModal')
		);
		createAccountModal.toggle();
	};

	const handleCreateAccountSubmit = (e) => {
		e.preventDefault();
		const payload = {
			username: registrationData.username,
			first_name: registrationData.firstName,
			last_name: registrationData.lastName,
			email: registrationData.email,
			password: registrationData.password,
		};
		createAccount(payload);
	};

	useEffect(() => {
		if (createAccountIsSuccess) {
			const createAccountModal = Modal.getOrCreateInstance(
				document.getElementById('createAccountModal')
			);
			createAccountModal.hide();
			setRegistrationData({
				username: '',
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
		}
	}, [createAccountStatus]);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const showLoginModal = () => {
		const createAccountModal = Modal.getOrCreateInstance(
			document.getElementById('createAccountModal')
		);
		createAccountModal.hide();
		const loginModal = Modal.getOrCreateInstance(
			document.getElementById('loginModal')
		);
		loginModal.toggle();
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		login({ username, password });
	};

	useEffect(() => {
		if (loginIsSuccess) {
			const loginModal = Modal.getOrCreateInstance(
				document.getElementById('loginModal')
			);
			loginModal.hide();
			setUsername('');
			setPassword('');
		}
	}, [loginStatus]);

	return (
		<>
			<nav className="navbar p-3 bg-light navbar-light navbar-expand-lg">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						Plunge
					</Link>
				</div>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<div className="dropdown">
						<button
							className="btn btn-outline-success dropdown-toggle"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Browse&nbsp;
						</button>
						<ul className="dropdown-menu">
							<li className="nav-item">
								<Link className="dropdown-item">By Location</Link>
							</li>
							<li className="nav-item">
								<Link className="dropdown-item">By Category</Link>
							</li>
							<li className="nav-item">
								<Link className="dropdown-item">By Upcoming</Link>
							</li>
						</ul>
					</div>
					<form className="form-inline">
						<input
							className="form-control mr-sm-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Search
						</button>
					</form>
					<div id="login" className={tokenData ? 'd-none' : ''}>
						<button className="btn btn-success" onClick={showLoginModal}>
							Login
						</button>
					</div>

					<div className={tokenData ? 'dropdown' : 'dropdown d-none'}>
						<button
							className="btn btn-outline-success dropdown-toggle d-inline-flex px-4 py-1 border align-items-center"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{tokenData ? userButton() : 'username'}&nbsp;&nbsp;
						</button>
						<ul className="dropdown-menu">
							<li className="nav-item">
								<Link className="dropdown-item" to="/reservations">
									Reservations
								</Link>
							</li>
							<li className="nav-item">
								<Link className="dropdown-item" to="/profile">
									My Profile
								</Link>
							</li>
							<li className="nav-item">
								<Link className="dropdown-item" to="/dashboard">
									Instructor Dashboard
								</Link>
							</li>
							<li className="nav-item">
								<a href="#" onClick={logout} className="dropdown-item">
									Logout
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			{/*Login Modal*/}
			<div
				className="modal fade"
				id="loginModal"
				tabIndex="-1"
				aria-labelledby="loginModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="loginModalLabel">
								Login
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<form onSubmit={handleLoginSubmit}>
							<div className="modal-body">
								<div className="form-floating mb-3">
									<input
										placeholder="username"
										name="username"
										type="text"
										required
										className="form-control"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
									/>
									<label>Username</label>
								</div>
								<div className="form-floating mb-3">
									<input
										placeholder="password"
										name="password"
										type="password"
										required
										className="form-control"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<label>Password</label>
								</div>
								<div
									id="errorMessage"
									className={
										loginStatus == 'rejected'
											? 'alert alert-danger text-center'
											: 'alert alert-danger text-center d-none'
									}
									role="alert"
								>
									Login failed. Please try again.
								</div>
								<div>
									<div className="text-center">
										<a href="#" onClick={showCreateAccountModal}>
											Create an account
										</a>{' '}
										&nbsp;|&nbsp; <a href="#">Forgot password?</a>{' '}
										&nbsp;&nbsp;&nbsp;
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Close
								</button>
								<button type="submit" className="btn btn-success">
									Login
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			{/*Create Account Modal*/}
			<div
				className="modal fade"
				id="createAccountModal"
				tabIndex="-1"
				aria-labelledby="createAccountModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="createAccountModalLabel">
								Create an Account
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<form onSubmit={(e) => handleCreateAccountSubmit(e)}>
							<div className="modal-body">
								<div className="form-floating mb-3">
									<input
										placeholder="username"
										required
										value={registrationData.username}
										name="username"
										type="text"
										className="form-control"
										onChange={handleCreateAccountFormChange}
									/>
									<label>Username</label>
								</div>
								<div className="form-floating mb-3">
									<input
										placeholder="First Name"
										required
										value={registrationData.firstName}
										name="firstName"
										type="text"
										className="form-control"
										onChange={handleCreateAccountFormChange}
									/>
									<label>First Name</label>
								</div>
								<div className="form-floating mb-3">
									<input
										placeholder="Last Name"
										required
										value={registrationData.lastName}
										name="lastName"
										type="text"
										className="form-control"
										onChange={handleCreateAccountFormChange}
									/>
									<label>Last Name</label>
								</div>
								<div className="form-floating mb-3">
									<input
										placeholder="Email"
										required
										value={registrationData.email}
										name="email"
										type="email"
										className="form-control"
										onChange={handleCreateAccountFormChange}
									/>
									<label>Email</label>
								</div>
								<div className="form-floating mb-3">
									<input
										placeholder="Password"
										required
										value={registrationData.password}
										name="password"
										type="password"
										className="form-control"
										onChange={handleCreateAccountFormChange}
									/>
									<label>Password</label>
								</div>
								<div className="form-floating mb-3">
									<input
										placeholder="Confirm Password"
										required
										value={registrationData.confirmPassword}
										name="confirmPassword"
										type="password"
										className="form-control"
										onChange={handleCreateAccountFormChange}
									/>
									<label>Confirm Password</label>
								</div>
								<div
									className={
										registrationData.password !=
										registrationData.confirmPassword
											? 'alert alert-warning'
											: 'alert alert-warning d-none'
									}
									role="alert"
								>
									Passwords do not match
								</div>
								<div className=" mb-3">
									<label className="form-label">Terms and Conditions</label>
									<textarea
										name="termsAndConditions"
										className="form-control"
										rows="3"
										value="Welcome to Plunge! These terms and conditions (“Terms”) govern your use of our website, products, and services. By accessing or using our platform, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our services.
Acceptance of Terms
By using our services, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you are using our services on behalf of an organization, you represent and warrant that you have the necessary authority to enter into these Terms on behalf of that organization.
Privacy Policy
Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and disclose information when you use our services.
Intellectual Property
All content and materials provided on our platform, including but not limited to text, graphics, logos, images, audio, videos, software, and trademarks, are the intellectual property of [Your Company Name] or its licensors. You may not modify, reproduce, distribute, or create derivative works based on our intellectual property without our prior written consent.
User Responsibilities
a. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account. You agree to accept responsibility for all activities that occur under your account.
b. You agree not to use our services for any unlawful or unauthorized purpose or in violation of these Terms.
c. You agree not to upload, post, or transmit any content that is illegal, offensive, infringing, defamatory, or harmful to others.
d. You are solely responsible for your interactions with other users of our platform.
Termination
We reserve the right to suspend or terminate your access to our services at any time, with or without cause or notice.
Limitation of Liability
a. Our services are provided on an “as is” and “as available” basis. We do not warrant that our services will be error-free, uninterrupted, or secure.
b. In no event shall [Your Company Name], its directors, officers, employees, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to these Terms or your use of our services.
Governing Law and Jurisdiction
These Terms shall be governed by and construed in accordance with the laws of [Your Country/State]. Any legal actions or proceedings arising out of or relating to these Terms shall be exclusively brought in the courts located in [Your Country/State].
Changes to Terms
We reserve the right to modify or update these Terms at any time without prior notice. Please review these Terms periodically for any changes.
By using our services, you acknowledge and agree to these Terms. If you have any questions or concerns regarding these Terms, please contact us at [Contact Email].
These terms and conditions are a basic starting point, and you may need to include additional clauses depending on the nature of your business or services."
										readOnly
									/>
								</div>
								<div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										required
										value=""
									/>
									<label className="form-check-label">
										I agree to the terms and conditions.
									</label>
								</div>
								<div id="errorMessage">
									<br />
									<div
										className={
											createAccountStatus == 'rejected'
												? 'alert alert-danger text-center'
												: 'alert alert-danger text-center d-none'
										}
										role="alert"
									>
										Unable to create an account. Please try again.
									</div>
								</div>
								<div>
									<div className="text-center">
										<a href="#" onClick={showLoginModal}>
											Already have an account?
										</a>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Close
								</button>
								<button type="submit" className="btn btn-success">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Nav;
