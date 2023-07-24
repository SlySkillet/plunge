import React, { useState, useEffect } from 'react';
import { useGetTokenQuery, useLogoutMutation } from '../../store/authApi';
import { useNavigate } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';

function InstructorDashboard() {
	const navigate = useNavigate();
	const { data: tokenData } = useGetTokenQuery();
	const [classes, setClasses] = useState('');
	const [events, setEvents] = useState('');
	const [reservations, setReservations] = useState('');
	const current_date = new Date().toJSON();

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
			console.log(current_date);
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

	const deleteEvent = async (e, id) => {
		e.preventDefault();
		let url = `http://localhost:8000/events/${id}`;
		const fetchConfig = {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			fetchData();
		}
	};

	const changeStatus = async (e, id, enrolled) => {
		console.log('changing status...');
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
						<button
							className="btn btn btn-outline-success"
							onClick={(e) => {
								navigate('/classes/create');
							}}
						>
							Create Class
						</button>
					</div>
					<br />
					<br />
					<br />

					<div>
						{classes &&
							classes.map((instructorClass, index) => {
								return (
									<div key={index}>
										<a
											href={`/classes/${instructorClass.id}`}
											style={{ color: '#000000' }}
										>
											<h3 className="d-inline-flex align-text-middle">
												{instructorClass.class_name}
											</h3>
										</a>
										&nbsp;&nbsp;&nbsp;&nbsp;
										<div className="d-inline-flex">
											<button
												className="btn btn-sm btn-outline-success align-text-bottom"
												onClick={(e) => {
													navigate(
														`/classes/${instructorClass.id}/events/create`
													);
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													class="bi bi-plus-circle"
													viewBox="0 0 16 16"
												>
													<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
													<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
												</svg>
												&nbsp;Add Event
											</button>
											&nbsp;
											<button
												className="btn btn-sm btn-outline-primary"
												onClick={(e) => {
													navigate(`/classes/${instructorClass.id}/edit`);
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													class="bi bi-pencil"
													viewBox="0 0 16 16"
												>
													<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
												</svg>
												&nbsp;Edit Class
											</button>
										</div>
										<div>
											<Accordion>
												{events &&
													events.map((event, index) => {
														if (
															event.class_id === instructorClass.id &&
															event.date_time > current_date
														) {
															return (
																<Accordion.Item key={index} eventKey={index}>
																	<Accordion.Header className="row">
																		<div className="col-7">
																			{formatDateTime(event.date_time)}
																			&nbsp;&nbsp;&nbsp;
																			{availability(
																				event.seats_taken,
																				event.capacity
																			)}
																		</div>
																		<div className="col"></div>
																		<div className="col-1">
																			<button
																				className="btn btn-sm btn-outline-primary"
																				onClick={(e) => {
																					navigate(
																						`/classes/${instructorClass.id}/events/${event.id}/edit`
																					);
																				}}
																			>
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					width="16"
																					height="16"
																					fill="currentColor"
																					class="bi bi-pencil"
																					viewBox="0 0 16 16"
																				>
																					<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
																				</svg>
																			</button>
																			&nbsp;
																			<button
																				className="btn btn-sm btn-outline-danger"
																				onClick={(e) => {
																					deleteEvent(e, event.id);
																				}}
																			>
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					width="16"
																					height="16"
																					fill="currentColor"
																					class="bi bi-trash"
																					viewBox="0 0 16 16"
																				>
																					<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
																					<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
																				</svg>
																			</button>
																		</div>
																	</Accordion.Header>
																	<Accordion.Body>
																		{event.seats_taken > 0 ? (
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
																		) : (
																			<div>
																				No students have registered for this
																				event
																			</div>
																		)}
																	</Accordion.Body>
																</Accordion.Item>
															);
														} else if (event.class_id === instructorClass.id) {
															return (
																<div>
																	<Accordion.Item key={index} eventKey={index}>
																		<Accordion.Header className="row">
																			<div className="col-7">
																				{formatDateTime(event.date_time)}
																				&nbsp;&nbsp;&nbsp;
																				<div className="d-inline-flex px-2 py-1 fw-semibold text-secondary bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2">
																					Past Event
																				</div>
																			</div>
																		</Accordion.Header>
																		<Accordion.Body>
																			{event.seats_taken > 0 ? (
																				<table className="table table-striped m-3">
																					<thead>
																						<tr>
																							<td>Student Name</td>
																							<td>Status</td>
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
																															Attended
																														</div>
																													) : (
																														<div className="text-danger">
																															Withdrew
																														</div>
																													)}
																												</td>
																											</tr>
																										);
																									}
																								}
																							)}
																					</tbody>
																				</table>
																			) : (
																				<div>
																					No students attended this event.
																				</div>
																			)}
																		</Accordion.Body>
																	</Accordion.Item>
																</div>
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
