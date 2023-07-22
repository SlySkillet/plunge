import { useState, useEffect } from 'react';
import { useGetTokenQuery, useLogoutMutation } from '../../store/authApi';
import { useParams } from 'react-router-dom';

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
				console.log('classes fetched');
				setClasses(data);
			}
			url = `http://localhost:8000/events/instructor/${tokenData.account.id}`;
			response = await fetch(url);
			if (response.ok) {
				console.log('events fetched');
				let data = await response.json();
				setEvents(data);
			}
			url = `http://localhost:8000/reservations/instructors/${tokenData.account.id}`;
			response = await fetch(url);
			if (response.ok) {
				console.log('events fetched');
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
						{/* <button className="btn btn-sm btn-success">Edit Class</button> */}
					</div>
					<br />
					<br />
					<br />
					{/* <div>
						{events &&
							events.map((event, index) => {
								return <div>{event.date_time}</div>;
							})}
					</div> */}
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
										{/* {events &&
											events.map((event, index) => {
												return (
													<div>
														<strong>{formatDateTime(event.date_time)}</strong>
													</div>
												);
											})} */}
										<div class="accordion" id="accordionExample">
											<div class="accordion-item">
												<h2 class="accordion-header">
													<button
														class="accordion-button"
														type="button"
														data-bs-toggle="collapse"
														data-bs-target="#collapseOne"
														aria-expanded="true"
														aria-controls="collapseOne"
													>
														{events && formatDateTime(events[0].date_time)}
													</button>
												</h2>
												<div
													id="collapseOne"
													class="accordion-collapse collapse collapsed"
													data-bs-parent="#accordionExample"
												>
													<div class="accordion-body">
														<table className="table table-striped m-3">
															<thead>
																<tr>
																	<td>Student Name</td>
																	<td>Status</td>
																	<td>Actions</td>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>John Franklin</td>
																	<td>Enrolled</td>
																	<td>
																		<button className="btn btn-sm btn-outline-danger">
																			Withdraw
																		</button>
																	</td>
																</tr>
																<tr>
																	<td>Melissa Dobber</td>
																	<td>Withdrawn</td>
																	<td>
																		<button className="btn btn-sm btn-outline-success">
																			&nbsp;&nbsp;&nbsp;Enroll&nbsp;&nbsp;&nbsp;&nbsp;
																		</button>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
											{events &&
												events.map((event, index) => {
													return (
														<div class="accordion-item">
															<h2 class="accordion-header">
																<button
																	class="accordion-button collapsed"
																	type="button"
																	data-bs-toggle="collapse"
																	data-bs-target=`#{index}`
																	aria-expanded="false"
																	aria-controls="collapseTwo"
																>
																	<strong>
																		{formatDateTime(event.date_time)}
																	</strong>
																</button>
															</h2>
															<div
																id="collapseTwo"
																class="accordion-collapse collapse"
																data-bs-parent="#accordionExample"
															>
																<div class="accordion-body">
																	<strong>
																		This is the second item's accordion body.
																	</strong>{' '}
																	It is hidden by default, until the collapse
																	plugin adds the appropriate classes that we
																	use to style each element. These classes
																	control the overall appearance, as well as the
																	showing and hiding via CSS transitions. You
																	can modify any of this with custom CSS or
																	overriding our default variables. It's also
																	worth noting that just about any HTML can go
																	within the <code>.accordion-body</code>,
																	though the transition does limit overflow.
																</div>
															</div>
														</div>
													);
												})}
										</div>
										<div className="m-4">
											<div className="mb-4">
												<div className="m-2">
													<strong>Thursday, 7/20/23 - 7:00 pm</strong>
													&nbsp;&nbsp;
													<div className="d-inline-flex px-2 py-1 fw-semibold text-success bg-success bg-opacity-10 border border-success border-opacity-10 rounded-2">
														5 of 15 slots remaining
													</div>
												</div>
												<table className="table table-striped m-3">
													<thead>
														<tr>
															<td>Student Name</td>
															<td>Status</td>
															<td>Actions</td>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>John Franklin</td>
															<td>Enrolled</td>
															<td>
																<button className="btn btn-sm btn-outline-danger">
																	Withdraw
																</button>
															</td>
														</tr>
														<tr>
															<td>Melissa Dobber</td>
															<td>Withdrawn</td>
															<td>
																<button className="btn btn-sm btn-outline-success">
																	&nbsp;&nbsp;&nbsp;Enroll&nbsp;&nbsp;&nbsp;&nbsp;
																</button>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
											{/* <div className="m-2">
												<strong>Saturday, 7/20/23 - 2:00 pm</strong>&nbsp;&nbsp;
												<div className="d-inline-flex px-2 py-1 fw-semibold text-danger bg-danger bg-opacity-10 border border-danger border-opacity-10 rounded-2">
													0 of 2 slots remaining
												</div>
											</div>
											<table className="table table-striped m-3">
												<thead>
													<tr>
														<td>Student Name</td>
														<td>Status</td>
														<td>Actions</td>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>John Franklin</td>
														<td>Registered</td>
														<td>
															<button className="btn btn-sm btn-outline-danger">
																Withdraw
															</button>
														</td>
													</tr>
													<tr>
														<td>Melissa Dobber</td>
														<td>Cancelled</td>
														<td>
															<button className="btn btn-sm btn-outline-success">
																&nbsp;&nbsp;&nbsp;Enroll&nbsp;&nbsp;&nbsp;&nbsp;
															</button>
														</td>
													</tr>
												</tbody>
											</table> */}
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
