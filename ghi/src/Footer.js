import React from 'react';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<br />
			<br />
			<br />
			<br />
			<br />
			<div className="d-flex flex-wrap justify-content-between align-items-center px-5 py-3 my-4 border-top">
				<div className="col-md-4 d-flex align-items-center mt-3">
					<Link
						to="/"
						className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
					>
						<img
							src="https://henrykimphotography.com/plunge/logo.png"
							alt="Logo"
							height="50px"
							className="mx-2"
						/>
					</Link>
					<span className="mb-3 mb-md-0 text-muted">
						Copyright © 2023 Plunge, LLC. All Rights Reserved.
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plunge
									Production Team
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<div className="container p-5">
									<div className="row mb-4">
										<div className="col text-center">
											<img
												src="https://ca.slack-edge.com/T04JMHGLC1X-U04QGL4B8BF-d430e03b88d2-512"
												className="rounded-circle"
												height="100px"
												alt="Greg Avatar"
											/>
											<div className="m-2">
												Greg Herren &nbsp;
												<div>
													<Link
														to="https://www.linkedin.com/in/greg-herren/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															src="https://henrykimphotography.com/plunge/linkedin.png"
															alt="LinkedIn Icon"
															height="25px"
														/>
													</Link>
													&nbsp;&nbsp;
													<Link
														to="https://gitlab.com/greg-herren/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															src="https://henrykimphotography.com/plunge/gitlab.png"
															alt="Gitlab Icon"
															height="25px"
														/>
													</Link>
												</div>
											</div>
										</div>
										<div className="col text-center">
											<img
												src="https://ca.slack-edge.com/T04JMHGLC1X-U04R7EDGGHF-8c4d5c4db498-512"
												className="rounded-circle"
												height="100px"
												alt="Henry Avatar"
											/>
											<div className="m-2">
												Henry Kim &nbsp;
												<div>
													<Link
														to="https://www.linkedin.com/in/hnrykm/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															src="https://henrykimphotography.com/plunge/linkedin.png"
															alt="LinkedIn Icon"
															height="25px"
														/>
													</Link>
													&nbsp;&nbsp;
													<Link
														to="https://gitlab.com/hnrykm"
														target="_blank"
														rel="noreferrer"
													>
														<img
															src="https://henrykimphotography.com/plunge/gitlab.png"
															alt="Gitlab Icon"
															height="25px"
														/>
													</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="row mt-5">
										<div className="col text-center">
											<img
												src="https://ca.slack-edge.com/T04JMHGLC1X-U04Q5BUFEEM-84df527d192b-512"
												className="rounded-circle"
												height="100px"
												alt="Simon Avatar"
											/>
											<div className="m-2">
												Simon Conrad &nbsp;
												<div>
													<Link
														to="https://www.linkedin.com/in/simon-conrad/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															src="https://henrykimphotography.com/plunge/linkedin.png"
															alt="LinkedIn Icon"
															height="25px"
														/>
													</Link>
													&nbsp;&nbsp;
													<Link
														to="https://gitlab.com/SlySkillet/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															src="https://henrykimphotography.com/plunge/gitlab.png"
															alt="Gitlab Icon"
															height="25px"
														/>
													</Link>
												</div>
											</div>
										</div>
										<div className="col text-center">
											<img
												src="https://ca.slack-edge.com/T04JMHGLC1X-U04PN4M85J9-0783702fa3c6-512"
												className="rounded-circle"
												height="100px"
												alt="Travis Avatar"
											/>
											<div className="m-2">
												Travis Semeniv &nbsp;
												<div>
													<Link
														to="https://www.linkedin.com/in/taras-semeniv-402045259/"
														target="_blank"
														rel="noreferrer"
													>
														<img
															src="https://henrykimphotography.com/plunge/linkedin.png"
															alt="LinkedIn Icon"
															height="25px"
														/>
													</Link>
													&nbsp;&nbsp;
													<Link
														to="https://gitlab.com/tsemeniv13"
														target="_blank"
														rel="noreferrer"
													>
														<img
															src="https://henrykimphotography.com/plunge/gitlab.png"
															alt="Gitlab Icon"
															height="25px"
														/>
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Modal.Body>
						</Modal>
					</span>
				</div>

				<div className="col">
					<button onClick={handleShow} className="btn btn-primary">
						Meet the Plunge Production Team
					</button>
				</div>
				<ul className="nav justify-content-end list-unstyled d-flex">
					<li className="ms-3">
						<Link
							to="https://www.javascript.com/"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="https://henrykimphotography.com/plunge/javascript.png"
								alt="Logo"
								height="31px"
								title="JavaScript"
							/>
						</Link>
					</li>
					<li className="ms-3">
						<Link to="https://www.python.org/" target="_blank" rel="noreferrer">
							<img
								src="https://henrykimphotography.com/plunge/python.png"
								alt="Logo"
								height="31px"
								title="Python 3"
							/>
						</Link>
					</li>
					<li className="ms-3">
						<Link
							to="https://html.spec.whatwg.org/"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="https://henrykimphotography.com/plunge/html5.png"
								alt="Logo"
								height="31px"
								title="HTML 5"
							/>
						</Link>
					</li>
					<li className="ms-3">
						<Link
							to="https://www.w3.org/TR/CSS/"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="https://henrykimphotography.com/plunge/css3.png"
								alt="Logo"
								height="31px"
								title="CSS 3"
							/>
						</Link>
					</li>
					<li className="ms-3">
						<Link to="https://react.dev/" target="_blank" rel="noreferrer">
							<img
								src="https://henrykimphotography.com/plunge/react.png"
								alt="Logo"
								height="31px"
								title="React.js"
							/>
						</Link>
					</li>
					<li className="ms-3">
						<Link
							to="https://fastapi.tiangolo.com/"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="https://henrykimphotography.com/plunge/fastapi.png"
								alt="Logo"
								height="31px"
							/>
						</Link>
					</li>
					<li className="ms-3">
						<Link to="https://redux.js.org/" target="_blank" rel="noreferrer">
							<img
								src="https://henrykimphotography.com/plunge/redux.png"
								alt="Logo"
								height="31px"
							/>
						</Link>
					</li>
					<li className="ms-3">
						<Link
							to="https://getbootstrap.com/"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="https://henrykimphotography.com/plunge/bootstrap.png"
								alt="Logo"
								height="31px"
							/>
						</Link>
					</li>
					<li className="ms-3">
						<Link
							to="https://www.postgresql.org/"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="https://henrykimphotography.com/plunge/postgresql.png"
								alt="Logo"
								height="31px"
							/>
						</Link>
					</li>
					<li className="ms-3">
						<Link to="https://www.docker.com/" target="_blank" rel="noreferrer">
							<img
								src="https://henrykimphotography.com/plunge/docker.png"
								alt="Logo"
								height="31px"
								title="Docker"
							/>
						</Link>
					</li>
					<li className="ms-3">
						<Link to="https://gitlab.com/" target="_blank" rel="noreferrer">
							<img
								src="https://henrykimphotography.com/plunge/gitlab.png"
								alt="Logo"
								height="31px"
								title="Gitlab"
							/>
						</Link>
					</li>
					<li className="ms-3">
						<Link
							to="https://code.visualstudio.com/"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="https://henrykimphotography.com/plunge/vscode.png"
								alt="Logo"
								height="31px"
								title="Visual Studio Code"
							/>
						</Link>
					</li>
					<li className="ms-3">
						<Link to="https://linear.app/" target="_blank" rel="noreferrer">
							<img
								src="https://henrykimphotography.com/plunge/linear.png"
								alt="Logo"
								height="31px"
								title="Linear"
							/>
						</Link>
					</li>
					<li className="ms-3">
						<Link to="https://slack.com/" target="_blank" rel="noreferrer">
							<img
								src="https://henrykimphotography.com/plunge/slack.png"
								alt="Logo"
								height="31px"
								title="Slack"
							/>
						</Link>
					</li>
					<li className="ms-3">
						<Link
							to="https://developers.google.com/maps"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="https://henrykimphotography.com/plunge/googlemaps.png"
								alt="Logo"
								height="31px"
								title="Google Maps API"
							/>
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
}

export default Footer;
