import React, { useState, useEffect } from 'react';
import { useGetTokenQuery, useLogoutMutation } from '../../store/authApi';
import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';

function InstructorDashboard() {
	const { data: tokenData } = useGetTokenQuery();
	const [classes, setClasses] = useState('');
	const [events, setEvents] = useState('');
	const [reservations, setReservations] = useState('');

	const fetchData = async () => {
		if (tokenData) {
			let url = `http://localhost:8000/classes?instructor=${tokenData.account.id}`;
			let response = await fetch(url);
			if (response.ok) {
				let data = await response.json();
				setClasses(data);
			}
			url = `http://localhost:8000/events/instructor/${tokenData.account.id}`;
			response = await fetch(url);
			if (response.ok) {
				let data = await response.json();
				setEvents(data);
			}
			url = `http://localhost:8000/reservations/instructors/${tokenData.account.id}`;
			response = await fetch(url);
			if (response.ok) {
				let data = await response.json();
				setReservations(data);
			}
		}
	};

	const changeStatus = async (e, id, enrolled) => {
		e.preventDefault();
		const data = {};
		data.status = enrolled;
		let url = `http://localhost:8000/reservations/${id}`;
		const fetchConfig = {
			method: 'put',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			fetchData();
		}
	};

	// const filterEvents = (instructorClass, classEvent) => {
	// 	if (instructorClass.id === classEvent.class_id) {
	// 		return instructorClass;
	// 	}
	// };

	const availability = (seatsTaken, capacity) => {
		if (seatsTaken == null) {
			return (
				<div className="d-inline-flex px-2 py-1 fw-semibold text-success bg-success bg-opacity-10 border border-success border-opacity-10 rounded-2">
					0 / {capacity} slots filled
				</div>
			);
		} else if (seatsTaken / capacity >= 1) {
			return (
				<div className="d-inline-flex px-2 py-1 fw-semibold text-danger bg-danger bg-opacity-10 border border-danger border-opacity-10 rounded-2">
					FULL - {seatsTaken} / {capacity} slots filled
				</div>
			);
		} else {
			return (
				<div className="d-inline-flex px-2 py-1 fw-semibold text-success bg-success bg-opacity-10 border border-success border-opacity-10 rounded-2">
					{seatsTaken} / {capacity} slots filled
				</div>
			);
		}
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

	useEffect(() => {
		fetchData();
	}, [tokenData]);

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="container mt-5">
			<div className="offset-1 col-10">
				<div className="row m-4">
					<div className="text-center">
						<h1>Instructor Dashboard</h1>
					</div>
					<div className="text-center">
						<button className="btn btn-sm btn-success">Create Class</button>
					</div>
					<br />
					<br />
					<br />

					<div>
						{classes &&
							classes.map((instructorClass, index) => {
								return (
									<div key={index}>
										<a href={`/classes/${instructorClass.id}`}>
											<h3 className="d-inline-flex">
												{instructorClass.class_name}
											</h3>
										</a>
										&nbsp;&nbsp;&nbsp;&nbsp;
										<div className="d-inline-flex">
											<button className="btn btn-sm btn-outline-success">
												Add an event
											</button>
											&nbsp;
											<button className="btn btn-sm btn-outline-success">
												Edit event
											</button>
											&nbsp;
											<button className="btn btn-sm btn-outline-success">
												Delete event
											</button>
										</div>
										<div>
											<Accordion>
												{events &&
													events.map((event, index) => {
														if (event.class_id === instructorClass.id) {
															return (
																<Accordion.Item key={index} eventKey={index}>
																	<Accordion.Header>
																		{formatDateTime(event.date_time)}
																		&nbsp;&nbsp;&nbsp;
																		<div>
																			{availability(
																				event.seats_taken,
																				event.capacity
																			)}
																		</div>
																	</Accordion.Header>
																	<Accordion.Body>
																		<table className="table table-striped m-3">
																			<thead>
																				<tr>
																					<td>Student Name</td>
																					<td>Status</td>
																					<td>Actions</td>
																				</tr>
																			</thead>
																			<tbody>
																				{reservations &&
																					reservations.map(
																						(reservation, index) => {
																							if (
																								reservation.event_id ===
																								event.id
																							) {
																								return (
																									<tr key={index}>
																										<td>
																											{
																												reservation.student_first_name
																											}{' '}
																											{
																												reservation.student_last_name
																											}
																										</td>
																										<td>
																											{reservation.status ? (
																												<div className="text-success">
																													Enrolled
																												</div>
																											) : (
																												<div className="text-danger">
																													Withdrawn
																												</div>
																											)}
																										</td>
																										<td>
																											{!reservation.status ? (
																												<button
																													className="btn btn-sm btn-outline-success"
																													onClick={(e) =>
																														changeStatus(
																															e,
																															reservation.id,
																															true
																														)
																													}
																												>
																													Enroll
																												</button>
																											) : (
																												<button
																													className="btn btn-sm btn-outline-danger"
																													onClick={(e) =>
																														changeStatus(
																															e,
																															reservation.id,
																															false
																														)
																													}
																												>
																													Withdraw
																												</button>
																											)}
																										</td>
																									</tr>
																								);
																							}
																						}
																					)}
																			</tbody>
																		</table>
																	</Accordion.Body>
																</Accordion.Item>
															);
														}
													})}
											</Accordion>
										</div>
										<br />
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default InstructorDashboard;
