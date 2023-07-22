import React, { useState, useEffect } from 'react';
import { useGetTokenQuery, useLogoutMutation } from '../../store/authApi';
import { useParams } from 'react-router-dom';
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
		const month = date.getMonth();
		const day = date.getDay();
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
										<h3 className="d-inline-flex">
											{instructorClass.class_name}
										</h3>
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
														return (
															<Accordion.Item key={index} eventKey={index}>
																<Accordion.Header>
																	{formatDateTime(event.date_time)}
																	&nbsp;&nbsp;&nbsp;
																	<div className="d-inline-flex px-2 py-1 fw-semibold text-success bg-success bg-opacity-10 border border-success border-opacity-10 rounded-2">
																		0 of 2 slots remaining
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
																						return (
																							<tr key={index}>
																								<td>
																									{
																										reservation.student_first_name
																									}{' '}
																									{
																										reservation.student_first_name
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
																										<button className="btn btn-sm btn-outline-success">
																											Enroll
																										</button>
																									) : (
																										<button className="btn btn-sm btn-outline-danger">
																											Withdraw
																										</button>
																									)}
																								</td>
																							</tr>
																						);
																					}
																				)}
																		</tbody>
																	</table>
																</Accordion.Body>
															</Accordion.Item>
														);
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
