import './Hero_Component.css';
import { v4 as uuidv4 } from 'uuid';
import Card from './Card';
import Carousel from './Carousel';
import React from 'react';

function Hero_Component() {
	let cards_1 = [
		{
			key: uuidv4(),
			content: (
				<Card
					imagen="https://cdn0.iconfinder.com/data/icons/simple-icons-4/512/music.png"
					title="Music"
					urlCategory="/categories/1"
				/>
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card
					imagen="https://cdn-icons-png.flaticon.com/512/3460/3460869.png"
					title="Design and Style"
					urlCategory="/categories/2"
				/>
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card
					imagen="https://cdn.icon-icons.com/icons2/2622/PNG/512/map_entertainment_icon_158317.png"
					title="Arts & Entertainment"
					urlCategory="/categories/3"
				/>
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card
					imagen="https://i.fbcd.co/products/resized/resized-750-500/6b619775a4ac628440762cb818859616abb4861d918427d0c55af3908dad0e71.jpg"
					title="Business"
					urlCategory="/categories/4"
				/>
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card
					imagen="https://c8.alamy.com/comp/F5HERW/indoor-sport-game-athletic-set-icon-symbol-sign-pictogram-F5HERW.jpg"
					title="Sports & Gaming"
					urlCategory="/categories/5"
				/>
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card
					imagen="https://cdn-icons-png.flaticon.com/512/1170/1170221.png"
					title="Writting"
					urlCategory="/categories/6"
				/>
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card
					imagen="https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/react-512.png"
					title="Science & Tech"
					urlCategory="/categories/7"
				/>
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card
					imagen="https://static.vecteezy.com/system/resources/previews/006/689/886/original/living-room-icon-illustration-free-vector.jpg"
					title="Home & Lifestyle"
					urlCategory="/categories/8"
				/>
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card
					imagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPH6aHhQOE9-SZBgJCBitmJFZTGDSRPaLRgg&usqp=CAU"
					title="Community & Government"
					urlCategory="/categories/9"
				/>
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card
					imagen="https://static.thenounproject.com/png/3317650-200.png"
					title="Health & Wellness"
					urlCategory="/categories/10"
				/>
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card
					imagen="https://openclipart.org/image/2000px/289282"
					title="Food"
					urlCategory="/categories/11"
				/>
			),
		},
	];
	return (
		<div className="">
			<Carousel
				cards={cards_1}
				height="500px"
				width="100%"
				margin="0 auto"
				offset={4}
				showArrows={false}
			/>
		</div>
	);
}

export default Hero_Component;
