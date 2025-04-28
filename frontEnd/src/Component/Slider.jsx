import { useState } from "react";
import { motion } from "framer-motion";
import { BriefcaseConveyorBelt, ChevronLeft, ChevronRight } from "lucide-react";


const images = [
  "src/img/102-142309-classic-cars-more-expensive-modern-sports-cars-3.jpeg",
  "src/img/marc.jpg",
  "src/img/car1.webp",
  "src/img/سيارات_كلاسيكية.jpg",
  "src/img/1991-Ferrari-F40-_0.webp",
  "src/img/بنتلي R type - عام 1954.jpeg",
];

export default function Slider() {

  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
    <br />
    
    <div className="relative w-full max-w-6xl mx-auto h-96 overflow-hidden rounded-2xl shadow-lg">
      <motion.img
        key={current}
        src={images[current]}
        className="w-full h-full object-cover"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      />

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        <ChevronRight />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${index === current ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
<br /><br /><br /><br /><br />
    </>
    

  );

}
