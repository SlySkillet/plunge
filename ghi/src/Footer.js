import React from 'react';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

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

			<div className="footer navbar navbar-expand-lg navbar-light bg-light p-4">
				<div className="footer-item mx-auto">
					<button
						onClick={handleShow}
						className="text-decoration-none btn btn-link"
					>
						Copyright © 2023 Plunge, LLC. All Rights Reserved.
					</button>
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plunge
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
											<a
												href="https://www.linkedin.com/in/greg-herren/"
												target="_blank"
												rel="noreferrer"
												className="text-decoration-none"
											>
												Greg Herren &nbsp;
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													className="bi bi-linkedin align-center"
													viewBox="0 0 16 16"
												>
													<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
												</svg>
											</a>
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
											<a
												href="https://www.linkedin.com/in/hnrykm/"
												target="_blank"
												rel="noreferrer"
												className="text-decoration-none"
											>
												Henry Kim &nbsp;
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													className="bi bi-linkedin align-center"
													viewBox="0 0 16 16"
												>
													<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
												</svg>
											</a>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col text-center">
										<img
											src="https://ca.slack-edge.com/T04JMHGLC1X-U04Q5BUFEEM-84df527d192b-512"
											className="rounded-circle"
											height="100px"
											alt="Simon Avatar"
										/>
										<div className="m-2">
											<a
												href="https://www.linkedin.com/in/simon-conrad/"
												target="_blank"
												rel="noreferrer"
												className="text-decoration-none"
											>
												Simon Conrad &nbsp;
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													className="bi bi-linkedin align-center"
													viewBox="0 0 16 16"
												>
													<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
												</svg>
											</a>
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
											<a
												href="https://www.linkedin.com/in/taras-semeniv-402045259/"
												target="_blank"
												rel="noreferrer"
												className="text-decoration-none"
											>
												Travis Semeniv &nbsp;
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													className="bi bi-linkedin align-center"
													viewBox="0 0 16 16"
												>
													<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
												</svg>
											</a>
										</div>
									</div>
								</div>
							</div>
						</Modal.Body>
					</Modal>
				</div>
			</div>
		</>
	);
}

export default Footer;
