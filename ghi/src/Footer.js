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
					<a href="#" onClick={handleShow} className="text-decoration-none">
						Copyright © 2023 Plunge, LLC. All Rights Reserved.
					</a>
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plunge
								Production Team
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className="text-center">
								<div className="m-2">
									<a
										href="https://www.linkedin.com/in/greg-herren/"
										target="_blank"
										className="text-decoration-none"
									>
										Greg Herren
									</a>
								</div>
								<div className="m-2">
									<a
										href="https://www.linkedin.com/in/hnrykm/"
										target="_blank"
										className="text-decoration-none"
									>
										Henry Kim
									</a>
								</div>
								<div className="m-2">
									<a
										href="https://www.linkedin.com/in/simon-conrad/"
										target="_blank"
										className="text-decoration-none"
									>
										Simon Conrad
									</a>
								</div>
								<div className="m-2">
									<a
										href="https://www.linkedin.com/in/taras-semeniv-402045259/"
										target="_blank"
										className="text-decoration-none"
									>
										Travis Semeniv
									</a>
								</div>
								<br />
							</div>
						</Modal.Body>
					</Modal>
				</div>
			</div>
		</>
	);
}

export default Footer;
