import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTokenQuery, useLogoutMutation } from '../../store/authApi';
import { Modal } from 'bootstrap';

function ClassDetails() {
	const { data: tokenData } = useGetTokenQuery();
	const { classId } = useParams();

	const baseUrl = process.env.REACT_APP_API_HOST;

	const [classes, setClasses] = useState('');
	const [events, setEvents] = useState('');
	const [eventForm, setEventForm] = useState('');
	const [registered, setRegistered] = useState('');
	const [seats, setSeats] = useState(-1);

	const fetchData = async () => {
		let url = `${baseUrl}/api/classes/${classId}`;
		let response = await fetch(url);
		if (response.ok) {
			let data = await response.json();
			setClasses(data);
		}
		url = `${baseUrl}/api/events/future/${classId}`;
		response = await fetch(url);
		if (response.ok) {
			let data = await response.json();
			setEvents(data);
		}
	};

	const registeredStatus = async () => {
		if (tokenData) {
			const url = `${baseUrl}/api/student/reservations/${tokenData.account.id}`;
			const response = await fetch(url);
			if (response.ok) {
				let data = await response.json();
				for (let d of data) {
					if (d.class_id === classes.id && d.status === true) {
						setRegistered(d);
					}
				}
			}
		}
	};

	const handleEventChange = async (e) => {
		const value = e.target.value;
		for (const event of events) {
			if (event.id === parseInt(value)) {
				const availability = event.capacity - event.seats_taken;
				setSeats(availability);
			} else if (value === '') {
				setSeats(-1);
			}
		}
		setEventForm(value);
	};

	const seatsRemaining = () => {
		if (seats === 0) {
			return 'alert alert-danger text-center px-2 py-1 mt-2 mb-3';
		} else if (seats >= 1) {
			return 'alert alert-success text-center px-2 py-1 mt-2 ';
		} else {
			return 'd-none mb-3';
		}
	};

	const getPhotos = () => {
		const photos = [classes.image_1];
		if (classes.image_2 !== 'string') {
			photos.push(classes.image_2);
		}
		if (classes.image_3 !== 'string') {
			photos.push(classes.image_3);
		}
		if (classes.image_4 !== 'string') {
			photos.push(classes.image_4);
		}
		return photos;
	};

	const formatDateTime = (datetime) => {
		const date = new Date(datetime);
		const dayNames = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];
		const dayOfWeek = dayNames[date.getDay()];
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		let hour = date.getHours();
		const minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
		let ampm = 'AM';
		if (hour > 12) {
			hour -= 12;
			ampm = 'PM';
		}
		return `${dayOfWeek}, ${month}/${day}/${year} - ${hour}:${minute} ${ampm}`;
	};

	const googleMapsLink = () => {
		if (classes.location_address) {
			const address = classes.location_address.split(' ').join('+');
			const city = classes.location_city;
			const state = classes.location_state;
			const zip_code = classes.location_zip_code;
			return `https://www.google.com/maps/place/${address},+${city},+${state}+${zip_code}/`;
		}
	};

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

	const handleRegister = async (e) => {
		e.preventDefault();

		const data = {};
		data.event_id = parseInt(eventForm);
		data.class_id = classes.id;
		data.student_id = tokenData.account.id;
		data.total_price = classes.price;
		data.status = true;
		const url = `${baseUrl}/api/reservations`;
		const fetchConfig = {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokenData.access_token}`,
			},
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			setEventForm('');
		}
	};

	const handleWithdraw = async (e) => {
		e.preventDefault();
		const data = {};
		data.status = false;
		const url = `${baseUrl}/api/reservations/${registered.id}`;
		const fetchConfig = {
			method: 'put',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokenData.access_token}`,
			},
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			setRegistered('');
			setSeats(-1);
		}
	};

	useEffect(() => {
		registeredStatus();
	}, [tokenData, classes, eventForm]);

	useEffect(() => {
		fetchData();
		registeredStatus();
	}, []);

	return (
		<div className="container">
			<div className="offset-2 col-9">
				<div className="row m-4"></div>
				<div className="row">
					<div className="text-center">
						<div>
							<a
								href={`/categories/${classes.category_id}`}
								className="decoration-none"
							>
								{classes.category_name}
							</a>
						</div>
						<div>
							<h1>{classes.class_name}</h1>
						</div>
						<div>
							<strong>{classes.location_name}</strong> |{' '}
							<a href={googleMapsLink()} target="_blank">
								{classes.location_address} {classes.location_city}{' '}
								{classes.location_city} {classes.location_state}{' '}
								{classes.location_zip_code}
							</a>
						</div>
						<hr></hr>
						<div>
							{getPhotos()?.map((photo, index) => {
								return (
									<a href={photo} key={index}>
										<img
											className="m-3"
											height="200px"
											alt={photo}
											src={photo}
										/>
									</a>
								);
							})}
						</div>
						<hr></hr>
					</div>
				</div>
				<div className="row">
					<div className="col m-3">
						<div>
							<h4>Description</h4>
						</div>
						<div>
							<p className="text-right">{classes.description}</p>
						</div>
						<div className="mt-4">
							<h4>Requirements</h4>
						</div>
						<div>{classes.requirements}</div>
						<div className="mt-4">
							<h4>Price</h4>
						</div>
						<div>${classes.price}</div>
					</div>

					<div className="col m-3">
						<div className="row">
							<div>
								<h4>About Your Instructor</h4>
							</div>
							<div className="col-3" style={{ width: '120px' }}>
								<img
									className="rounded-circle"
									height="100px"
									src={classes.instructor_avatar}
								></img>
							</div>
							<div className="col">
								<div>
									<h5>
										{classes.instructor_first_name}{' '}
										{classes.instructor_last_name}
									</h5>
								</div>
								<div>{classes.instructor_biography}</div>
								<div></div>
							</div>
							<div>
								<br />
							</div>
							<div>
								<div className="mt-3">
									<h4>Register for a class</h4>
									<div className={!tokenData ? '' : 'd-none'}>
										<button
											type="button"
											className="btn btn-success"
											onClick={showLoginModal}
										>
											Login to register
										</button>
									</div>
									<div className={tokenData ? '' : 'd-none'}>
										<div className={!registered ? '' : 'd-none'}>
											<form onSubmit={handleRegister}>
												<select
													required
													id="event"
													name="event"
													className="form-select"
													value={eventForm}
													onChange={handleEventChange}
												>
													<option value="">Select a date/time</option>
													{events &&
														events.map((event) => {
															return (
																<option key={event.id} value={event.id}>
																	{formatDateTime(event.date_time)}
																</option>
															);
														})}
												</select>
												<div className={seatsRemaining()}>
													{seats} seats remaining
												</div>
												<div className="mb-2"></div>
												<div
													className={tokenData && seats != 0 ? '' : 'd-none'}
												>
													<button className="btn btn-success">Register</button>
												</div>
											</form>
										</div>
										<div className={registered ? '' : 'd-none'}>
											<div
												className={
													!tokenData ? 'd-none' : 'alert alert-success'
												}
												role="alert"
											>
												Registered for {formatDateTime(registered.date_time)}
											</div>
											<div>
												<button
													className="btn btn-danger"
													onClick={handleWithdraw}
												>
													Withdraw
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
		</div>
	);
}

export default ClassDetails;
