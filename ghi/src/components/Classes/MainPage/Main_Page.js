import ClassesList from "../Classes_Carousels/Class_Card";
import HeroComponent from "../HeroComponent/HeroComponent";

function MainPage() {
  const classes_carousel = ClassesList();
  const categories_carousel = HeroComponent();
  return (
    <div>
      <div> {categories_carousel}</div>
      <div className="container-fluid p-5 mb-3">
        <h3 className="display-4 text-center mb-5">
          Ready to take the Plunge?
        </h3>
        <div className="row">
          <div className="col d-inline">
            <h1 className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="text-primary mb-3 bi bi-search-heart"
              >
                <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
                <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
              </svg>
            </h1>
            <h4 className="text-center">Stay and Browse</h4>
            <div className="text-center p-5 pt-2 pb-2">
              Discover your passion and expand your horizons! Explore upcoming,
              nearby classes, or find your perfect fit by browsing through
              various categories.
            </div>
          </div>
          <div className="col d-inline">
            <h1 className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="text-primary mb-3 bi bi-pencil"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </h1>
            <h4 className="text-center">Lifelong Learner</h4>
            <div className="text-center p-5 pt-2 pb-2">
              Embrace the joy of continuous learning and personal growth! Start
              your journey towards new skills and connections by attending a
              class.
            </div>
          </div>
          <div className="col d-inline">
            <h1 className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="text-primary mb-3 bi bi-lightbulb"
              >
                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
              </svg>
            </h1>
            <h4 className="text-center">Teach a Class</h4>
            <div className="text-center p-5 pt-2 pb-2">
              Share your passion with the world! Offer your expertise by hosting
              a class and empowering others to learn and grow with your valuable
              skills.
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5"> {classes_carousel} </div>
    </div>
  );
}

export default MainPage;
