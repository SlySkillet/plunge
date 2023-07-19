import "./Hero_Component.css";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from "./Carousel";

function Hero_Component() {
  let cards = [
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://cdn0.iconfinder.com/data/icons/simple-icons-4/512/music.png" name="Music" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://cdn-icons-png.flaticon.com/512/3460/3460869.png" name="Design & Style" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://cdn.icon-icons.com/icons2/2622/PNG/512/map_entertainment_icon_158317.png" name="Arts & Entertainment" />
      )
    },{
      key: uuidv4(),
      content: (
        <Card imagen="https://i.fbcd.co/products/resized/resized-750-500/6b619775a4ac628440762cb818859616abb4861d918427d0c55af3908dad0e71.jpg" name="Bussiness" />
      )
    },{
      key: uuidv4(),
      content: (
        <Card imagen="https://c8.alamy.com/comp/F5HERW/indoor-sport-game-athletic-set-icon-symbol-sign-pictogram-F5HERW.jpg" name="Sports & Gaming" />
      )
    },{
      key: uuidv4(),
      content: (
        <Card imagen="https://cdn-icons-png.flaticon.com/512/1170/1170221.png" name="Writting" />
      )
    },{
      key: uuidv4(),
      content: (
        <Card imagen="https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/react-512.png" name="Science & Tech" />
      )
    },{
      key: uuidv4(),
      content: (
        <Card imagen="https://static.vecteezy.com/system/resources/previews/006/689/886/original/living-room-icon-illustration-free-vector.jpg" name="Home & Lifestyle" />
      )
    },{
      key: uuidv4(),
      content: (
        <Card imagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPH6aHhQOE9-SZBgJCBitmJFZTGDSRPaLRgg&usqp=CAU" name="Community & Government" />
      )
    },{
      key: uuidv4(),
      content: (
        <Card imagen="https://static.thenounproject.com/png/3317650-200.png" name="Health & Wellness" />
      )
    },{
      key: uuidv4(),
      content: (
        <Card imagen="https://openclipart.org/image/2000px/289282" name="Food" />
      )
    },
  ];
  return (
    <div className="">
      <Carousel
        cards={cards}
        height="500px"
        width="100%"
        margin="0 auto"
        offset={200}
        showArrows={false}
      />
    </div>
  );
}

export default Hero_Component;
