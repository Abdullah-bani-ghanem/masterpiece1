import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const categories = [
  { name: "Classics", icon: "🚗", path: "/classics" },
  { name: "Convertibles", icon: "🚙", path: "/convertibles" },
  { name: "Muscle Cars", icon: "🏎️", path: "/muscle-cars" },
  { name: "Sports Cars", icon: "🚘", path: "/sports-cars" },
  { name: "Exotics", icon: "🚖", path: "/exotics" },
  { name: "Performance Cars", icon: "🚕", path: "/performance-cars" },
  { name: "Restomods & Customs", icon: "🚓", path: "/restomods-customs" },
  { name: "Trucks", icon: "🚛", path: "/trucks" },
  { name: "SUVs", icon: "🚜", path: "/suvs" },
  { name: "4X4s", icon: "🚚", path: "/4x4s" },
];

const CarCategories = () => (
  <div className="bg-[#f8f4f0] p-8">
    <h2 className="text-2xl font-bold text-black mb-6">Popular Search Categories</h2>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {categories.map(({ name, icon, path }) => (
        <Link
          key={name}
          to={path}
          className="flex flex-col items-center justify-center bg-[#f5e9e1] p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <span className="text-4xl">{icon}</span>
          <span className="mt-2 text-lg font-semibold">{name}</span>
        </Link>
      ))}
    </div>
  </div>
);

const TypesOfCars = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CarCategories />} />
      {categories.map(({ name, path }) => (
        <Route key={name} path={path} element={<h1>{name} Page</h1>} />
      ))}
    </Routes>
  </Router>
);

export default TypesOfCars;