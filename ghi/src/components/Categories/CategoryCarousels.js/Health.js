import { React, useState, useEffect } from 'react';
import ReturnCarousel from './ReturnCarousel';

function HealthCategory() {
	const [healthClasses, setHealthClasses] = useState([]);
	const [healthClasses1, setHealthClasses1] = useState([]);
	const [healthClasses2, setHealthClasses2] = useState([]);

	const baseUrl = process.env.REACT_APP_API_HOST;

	useEffect(() => {
		async function loadHealthClasses() {
			const response = await fetch(`${baseUrl}/api/classes?category=10`);
			if (response.ok) {
				const data = await response.json();
				setHealthClasses(data);
			} else {
				console.error(response);
			}
		}
		loadHealthClasses();
	}, [baseUrl]);

	useEffect(() => {
		function setStack() {
			setHealthClasses1(healthClasses.slice(0, 4));
		}
		setStack();
	}, [healthClasses]);

	useEffect(() => {
		function setStack() {
			setHealthClasses2(healthClasses.slice(4, 8));
		}
		setStack();
	}, [healthClasses]);

	return (
		<div>
			<ReturnCarousel
				stack1={healthClasses1}
				stack2={healthClasses2}
				title="Health & Wellness"
				categoryId={10}
			/>
		</div>
	);
}

export default HealthCategory;
