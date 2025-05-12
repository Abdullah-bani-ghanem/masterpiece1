
import React from "react";
// import cars from "../Pages/Cars"
import ford from "../img/car3.png";
import car2 from "../img/car4.png";
import car5 from "../img/car5.png";
import car6 from "../img/car6.png";

const ClassicCarsSection = () => {

 
 

  return (
    <section className="home-section flex flex-col items-center text-center p-8">
      <h1 className="text-4xl font-bold text-white mb-4 font-[Playfair Display]">
        Discover your perfect classic car
      </h1>
      <p className="text-lg text-white max-w-xl mb-6 font-[Playfair Display]">
        We offer you a wide range of reliable classic cars that suit your needs and budget.
      </p>
      <div className="car-images grid grid-cols-2 md:grid-cols-4 gap-4">
        <img className="w-full h-40 object-cover rounded-lg transition-transform duration-300 transform hover:scale-130" src={ford} />
        <img className="w-full h-40 object-cover rounded-lg transition-transform duration-300 transform hover:scale-130" src={car6} alt="Car 4" />
        <img className="w-full h-40 object-cover rounded-lg transition-transform duration-300 transform hover:scale-130" src={car2} alt="Car 2" />
        <img className="w-full h-40 object-cover rounded-lg transition-transform duration-300 transform hover:scale-130" src={car5} alt="Car 3" />
      </div>
      <a
        href="/cars"
        className="mt-6 px-6 py-3 text-white dark:bg-[#FBBF24] rounded-lg hover:bg-yellow-600 transition"
      >
        Explore More
      </a>

    </section>
  );
};

export default ClassicCarsSection;