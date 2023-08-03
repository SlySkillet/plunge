import { React, useState, useEffect } from 'react';
import ReturnCarousel from './ReturnCarousel';

function SportsCategory() {
	const [sportsClasses, setSportsClasses] = useState([]);
	const [sportsClasses1, setSportsClasses1] = useState([]);
	const [sportsClasses2, setSportsClasses2] = useState([]);

	const baseUrl = process.env.REACT_APP_API_HOST;

	useEffect(() => {
		async function loadSportsClasses() {
			const response = await fetch(`${baseUrl}/api/classes?category=5`);
			if (response.ok) {
				const data = await response.json();
				setSportsClasses(data);
			} else {
				console.error(response);
			}
		}
		loadSportsClasses();
	}, [baseUrl]);

	useEffect(() => {
		function setStack() {
			setSportsClasses1(sportsClasses.slice(0, 4));
		}
		setStack();
	}, [sportsClasses]);

	useEffect(() => {
		function setStack() {
			setSportsClasses2(sportsClasses.slice(4, 8));
		}
		setStack();
	}, [sportsClasses]);

	return (
		<div>
			<ReturnCarousel
				stack1={sportsClasses1}
				stack2={sportsClasses2}
				title="Sports & Gaming"
				categoryId={5}
			/>
		</div>
	);
}

export default SportsCategory;
