import Styles from './Card.module.css';
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Button from './Button';
import { Link } from 'react-router-dom';

function Card({ imagen, title, urlCategory }) {
	const [show, setShown] = useState(false);

	const props3 = useSpring({
		transform: show ? 'scale(1.03)' : 'scale(1)',
		boxShadow: show
			? '0 20px 25px rgb(0 0 0 / 25%)'
			: '0 2px 10px rgb(0 0 0 / 8%)',
	});
	return (
		<animated.div
			className={Styles.card}
			style={props3}
			onMouseEnter={() => setShown(true)}
			onMouseLeave={() => setShown(false)}
		>
			<div className="mx-auto">
				<img className="card-img-top" src={imagen} alt="" />
				<Link to={urlCategory}>
					<div className="Plunge">Plunge →</div>
				</Link>
			</div>
		</animated.div>
	);
}

export default Card;
