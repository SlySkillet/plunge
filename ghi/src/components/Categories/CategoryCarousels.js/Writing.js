import { React, useState, useEffect } from 'react';
import { Carousel, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function WritingCategory() {
	const [writingClasses, setWritingClasses] = useState([]);
	const [writingClasses1, setWritingClasses1] = useState([]);
	const [writingClasses2, setWritingClasses2] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		async function loadWritingClasses() {
			const response = await fetch('http://localhost:8000/classes?category=6');
			if (response.ok) {
				const data = await response.json();
				setWritingClasses(data);
			} else {
				console.error(response);
			}
		}
		loadWritingClasses();
	}, []);
	useEffect(() => {
		function setStack() {
			setWritingClasses1(writingClasses.slice(0, 4));
		}
		setStack();
	}, [writingClasses]);

	useEffect(() => {
		function setStack() {
			setWritingClasses2(writingClasses.slice(4, 8));
		}
		setStack();
	}, [writingClasses]);
	console.log(writingClasses);

	function returnCategoryJSX(stack1, stack2, title) {
		return (
			<div>
				<div className="upcoming-container">
					<h3 className="upcoming-title">{title}</h3>
					<div className="text-end">
						<button
							type="button"
							className="btn btn-outline-primary more-classes-btn"
							onClick={(e) => {
								navigate('/categories/6');
							}}
							style={{ maxWidth: '200px' }}
						>
							See More...
						</button>
					</div>
					<Carousel variant="dark" className="upcoming-carousel">
						<Carousel.Item>
							<Stack className="card-stack" direction="horizontal" gap={3}>
								{stack1.map((classIterable, Idx) => {
									const classDetailUrl = `classes/${classIterable.id}`;
									return (
										<div className="card location-card mx-2" key={Idx}>
											<div className="card-body location-card">
												<img
													src={classIterable.image_1}
													className="card-img-top"
													alt="..."
												/>
												<h5 className="card-title location-card">
													{classIterable.class_name}
												</h5>
												<div></div>
												<p className="card-text location-card">
													{classIterable.description.length > 143
														? classIterable.description.substr(0, 140) + '...'
														: classIterable.description}
												</p>
												<ul className="list-group list-group-flush location-card">
													<li className="list-group-item">
														<p className="card-text location-card">
															{classIterable.location_address.length > 16
																? classIterable.location_address.substr(0, 13) +
																  '...'
																: classIterable.location_address}
														</p>
													</li>
													<li className="list-group-item">
														<a
															href={classDetailUrl}
															className="btn btn-primary"
														>
															Class Details
														</a>
													</li>
												</ul>
											</div>
										</div>
									);
								})}
							</Stack>
						</Carousel.Item>
						<Carousel.Item>
							<Stack className="card-stack" direction="horizontal" gap={3}>
								{stack2.map((classIterable, Idx) => {
									const classDetailUrl = `classes/${classIterable.id}`;
									return (
										<div className="card location-card mx-2" key={Idx}>
											<div className="card-body location-card">
												<img
													src={classIterable.image_1}
													className="card-img-top"
													alt="..."
												/>
												<h5 className="card-title location-card">
													{classIterable.class_name}
												</h5>
												<p className="card-text location-card">
													{classIterable.description.length > 153
														? classIterable.description.substr(0, 150) + '...'
														: classIterable.description}
												</p>
												<ul className="list-group list-group-flush location-card">
													<li className="list-group-item">
														<p className="card-text location-card">
															{classIterable.location_address.length > 18
																? classIterable.location_address.substr(0, 15) +
																  '...'
																: classIterable.location_address}
														</p>
													</li>
													<li className="list-group-item">
														<a
															href={classDetailUrl}
															className="btn btn-primary"
														>
															Class Details
														</a>
													</li>
												</ul>
											</div>
										</div>
									);
								})}
							</Stack>
						</Carousel.Item>
					</Carousel>
				</div>
			</div>
		);
	}
	return returnCategoryJSX(writingClasses1, writingClasses2, 'Writing');
}

export default WritingCategory;
