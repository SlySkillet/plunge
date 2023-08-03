import { React, useState, useEffect } from 'react';
import ReturnCarousel from './ReturnCarousel';

function BusinessCategory() {
	const [businessClasses, setBusinessClasses] = useState([]);
	const [businessClasses1, setBusinessClasses1] = useState([]);
	const [businessClasses2, setBusinessClasses2] = useState([]);

	const baseUrl = process.env.REACT_APP_API_HOST;

	useEffect(() => {
		async function loadBusinessClasses() {
			const response = await fetch(`${baseUrl}/api/classes?category=4`);
			if (response.ok) {
				const data = await response.json();
				setBusinessClasses(data);
			} else {
				console.error(response);
			}
		}
		loadBusinessClasses();
	}, [baseUrl]);

	useEffect(() => {
		function setStack() {
			setBusinessClasses1(businessClasses.slice(0, 4));
		}
		setStack();
	}, [businessClasses]);

	useEffect(() => {
		function setStack() {
			setBusinessClasses2(businessClasses.slice(4, 8));
		}
		setStack();
	}, [businessClasses]);

	return (
		<div>
			<ReturnCarousel
				stack1={businessClasses1}
				stack2={businessClasses2}
				title="Business"
				categoryId={4}
			/>
		</div>
	);
}

export default BusinessCategory;
