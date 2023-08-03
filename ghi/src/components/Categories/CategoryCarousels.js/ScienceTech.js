import { React, useState, useEffect } from 'react';
import ReturnCarousel from './ReturnCarousel';

function ScienceCategory() {
	const [scienceClasses, setScienceClasses] = useState([]);
	const [scienceClasses1, setScienceClasses1] = useState([]);
	const [scienceClasses2, setScienceClasses2] = useState([]);

	const baseUrl = process.env.REACT_APP_API_HOST;

	useEffect(() => {
		async function loadScienceClasses() {
			const response = await fetch(`${baseUrl}/api/classes?category=7`);
			if (response.ok) {
				const data = await response.json();
				setScienceClasses(data);
			} else {
				console.error(response);
			}
		}
		loadScienceClasses();
	}, [baseUrl]);

	useEffect(() => {
		function setStack() {
			setScienceClasses1(scienceClasses.slice(0, 4));
		}
		setStack();
	}, [scienceClasses]);

	useEffect(() => {
		function setStack() {
			setScienceClasses2(scienceClasses.slice(4, 8));
		}
		setStack();
	}, [scienceClasses]);

	return (
		<div>
			<ReturnCarousel
				stack1={scienceClasses1}
				stack2={scienceClasses2}
				title="Science & Tech"
				categoryId={7}
			/>
		</div>
	);
}

export default ScienceCategory;
