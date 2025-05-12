import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Calendar, Clock, Map, Phone, Mail, ArrowRight, Search } from 'lucide-react';
import { FaArrowUp, FaComments, FaTimes } from 'react-icons/fa'; // Import all required icons
import heroCar from '../../src/img/122.png';
import Slider from '../Component/Slider';
import ClassicCarsSection from '../Component/sectionHome';
import axios from 'axios';

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', message: 'Hello! How can I help you with your classic car journey today?' }
  ]);
  const [userCount, setUserCount] = useState(0);
  const [approvedCarCount, setApprovedCarCount] = useState(0);
  const [approvedBikeCount, setApprovedBikeCount] = useState(0);


  const chatEndRef = useRef(null);

  const [featuredCars] = useState([
    { id: 1, name: 'Ford Mustang', price: '$85,000', image: 'https://images.unsplash.com/photo-1698205244154-28d627e3dcd4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEZvcmQlMjBNdXN0YW5nfGVufDB8fDB8fHww', year: 1967 },
    { id: 2, name: 'Mercedes-Benz 300SL', price: '$1,450,000', image: 'https://images.unsplash.com/photo-1629653944541-84d79f7ea9da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWVyY2VkZXMlMjBCZW56JTIwMzAwU0wlMjBjbGFzc2ljfGVufDB8fDB8fHww', year: 1955 },
    { id: 3, name: 'Dodge Challenger', price: '$125,000', image: 'https://images.unsplash.com/photo-1604940500627-d3f44d1d21c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RG9kZ2UlMjBDaGFsbGVuZ2VyJTIwMTk3MHxlbnwwfHwwfHx8MA%3D%3D', year: 1970 },
  ]);

  const [testimonials] = useState([
    { id: 1, name: 'James Wilson', rating: 5, text: 'Found my dream 1964 Corvette through Classic. The restoration quality was impeccable, and the buying process was seamless.', image: 'https://academy.hsoub.com/uploads/monthly_2015_10/13.jpg.4cbe499c45618f176d5aea2b8d599da2.jpg' },
    { id: 2, name: 'Emily Rodriguez', rating: 5, text: 'The team at Classic helped me source a rare Jaguar E-Type. Their knowledge and passion for classic cars is unmatched.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMN1uE6fK7qzUmqut_a2Ft32RgypVnSjzmug&s' },
    { id: 3, name: 'Robert Chen', rating: 4, text: 'Excellent collection and service. The only reason for 4 stars is because I wish they had more European classics from the 50s.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlYS_uNeO2qep48OrguwiMnpT_wov3RT7m1g&s' },
  ]);

  const [events] = useState([
    { id: 1, name: 'Monterey Car Week', date: 'August 15-21, 2025', location: 'Monterey, CA', image: '/api/placeholder/250/150' },
    { id: 2, name: 'Amelia Island Concours', date: 'May 17-19, 2025', location: 'Amelia Island, FL', image: '/api/placeholder/250/150' },
    { id: 3, name: 'Goodwood Revival', date: 'September 5-7, 2025', location: 'Chichester, UK', image: '/api/placeholder/250/150' },
  ]);

  // Categories of classic cars
  const categories = [
    { name: 'American Muscle', count: 45, image: '/api/placeholder/300/200' },
    { name: 'European Luxury', count: 38, image: '/api/placeholder/300/200' },
    { name: 'Vintage Roadsters', count: 27, image: '/api/placeholder/300/200' },
    { name: 'Classic Trucks', count: 19, image: '/api/placeholder/300/200' },
  ];

  // Services offered
  const services = [
    {
      title: "Acquisition Services",
      description: "Let our experts find your dream classic car based on your specific requirements.",
      icon: "🔍"
    },
    {
      title: "Professional Appraisals",
      description: "Get an accurate valuation of your classic car from our certified appraisers.",
      icon: "📊"
    },
    {
      title: "Restoration Services",
      description: "Our master craftsmen can restore your classic to its original glory or customize it to your preferences.",
      icon: "🔧"
    },
    {
      title: "Secure Transportation",
      description: "Trust our specialized transport services to safely deliver your vehicle anywhere in the world.",
      icon: "🚚"
    },
  ];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };



  useEffect(() => {
    const fetchApprovedBikeCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found!");
          return;
        }

        const res = await axios.get("/api/bikes/approved-bikes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setApprovedBikeCount(res.data.length); // نحسب الطول مباشرة لأن الـ API بترجع فقط الدراجات المعتمدة
      } catch (err) {
        console.error('Error fetching approved bike count:', err);
      }
    };




    // جلب عدد المستخدمين المسجلين
    const fetchUserCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found!");
          return;
        }

        const res = await axios.get("/api/counter/user-count", {
          headers: { Authorization: `Bearer ${token}` },
        });


        // عرض النتيجة في الكونسول
        setUserCount(res.data.length); // تعيين عدد المستخدمين في ال state
      } catch (err) {
        console.error('Error fetching user count:', err);
      }
    };


    // جلب عدد السيارات المعتمدة
    const fetchApprovedCarCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found!");
          return;
        }

        const res = await axios.get("/api/counter/approved-car-count", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const cars = res.data;
        const approved = cars.filter(c => c.status === "approved");
        setApprovedCarCount(approved.length); // تعيين عدد السيارات المعتمدة في ال state
      } catch (err) {
        console.error('Error fetching approved car count:', err);
      }
    };

    fetchUserCount(); // جلب عدد المستخدمين
    fetchApprovedCarCount(); // جلب عدد السيارات المعتمدة
    fetchApprovedBikeCount();

  }, []); // فقط عند تحميل الصفحة



  // Handle chat submission
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message to chat history
    const updatedChat = [...chatHistory, { sender: 'user', message: chatMessage }];
    setChatHistory(updatedChat);
    setChatMessage('');

    // Simulate bot response (in real app, this would likely be an API call)
    setTimeout(() => {
      let botResponse;
      const userMsg = chatMessage.toLowerCase();

      if (userMsg.includes('price') || userMsg.includes('cost') || userMsg.includes('how much')) {
        botResponse = "Our classic car prices range from $30,000 to over $1.5 million depending on the model, year, and condition. Would you like information about a specific model?";
      } else if (userMsg.includes('schedule') || userMsg.includes('appointment') || userMsg.includes('visit')) {
        botResponse = "We're open Monday-Saturday, 9am-6pm. You can schedule a viewing appointment by calling us at (555) 123-4567 or through our website.";
      } else if (userMsg.includes('restoration') || userMsg.includes('repair')) {
        botResponse = "Our master technicians specialize in complete period-correct restorations. Each restoration project is handled with meticulous attention to detail to preserve the vehicle's heritage.";
      } else {
        botResponse = "Thank you for your message. One of our classic car specialists will get back to you shortly. Is there anything specific about our collection you'd like to know?";
      }

      setChatHistory(prev => [...prev, { sender: 'bot', message: botResponse }]);
    }, 1000);
  };

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  useEffect(() => {
    const handleScroll = () => {
      // For header background
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // For back to top button - show after scrolling down 300px
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // <div className="bg-gray-50 dark:bg-gray-900">
    <div className="bg-gray-50 dark:bg-[#2d2d2e]">
      {/* Hero Section with Enhanced CTA */}
      <div className="relative h-screen">
        <div className="absolute inset-0 z-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full max-w-4xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-[Playfair Display] text-[#FBBF24]  font-cursive  md:text-7xl lg:text-6xl  mb-50"
          >
            Driven By Drivers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[Playfair Display] text-[#FBBF24] text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Experience the golden age of automotive excellence with our curated collection of timeless classics
          </motion.p>

        </div>
        {/* <img className="h-screen w-full object-cover" src={heroCar} alt="Classic Car Hero" /> */}
        <>
          {/* forked from: https://codepen.io/cuonoj/pen/JjPmMaB */}
          <section className="relative h-screen flex flex-col items-center justify-center text-center text-white ">
            <div className="video-docker absolute top-0 left-0 w-full h-[39rem] overflow-hidden">
              <video
                className="min-w-full min-h-full absolute object-cover "
                src="/classicCar.mp4"
                autoPlay
                muted
                loop
                playsInline
              />

            </div>

          </section>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '\n    .video-docker video {\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n    }\n\n    .video-docker::after {\n        content: "";\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        top: 0;\n        left: 0;\n        background: rgba(0, 0, 0, 0.6);\n        z-index: 1;\n    }\n'
            }}
          />
        </>

      </div>



      {/* Welcome Section with Animation */}
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center  px-4 max-w-4xl mx-auto"
        >
          <h2 className="font-[Playfair Display] text-4xl font-cursive font-bold mb-6 dark:text-white">Welcome to Classic</h2>
          <p className="font-[Playfair Display] text-xl font-cursive dark:text-gray-300 mb-6 leading-relaxed">
            "Are you a fan of classic cars? Here at Classic, we offer a curated selection of original classic cars that combine luxury and history. Browse our collection of unique vehicles and enjoy an exceptional buying experience. Every car has a story, discover the story that sets you apart." 🚗✨
          </p>
          <div className="flex justify-center gap-8 mt-10">
            <div className="text-center">
              <div className="font-[Playfair Display] text-green-600 text-5xl font-bold mb-2">{userCount}+</div>
              <div className="font-[Playfair Display] text-gray-600 dark:text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="font-[Playfair Display] text-green-600 text-5xl font-bold mb-2">{approvedCarCount}+</div>
              <div className="font-[Playfair Display] text-gray-600 dark:text-gray-400">Classic Cars</div>
            </div>
            <div className="text-center">
              <div className="font-[Playfair Display] text-green-600 text-5xl font-bold mb-2">{approvedBikeCount}+</div>
              <div className="font-[Playfair Display] text-gray-600 dark:text-gray-400">Classic Bikes</div>
            </div>
          </div>
        </motion.div>
      </div>



      {/* Original Slider Component */}
      <Slider />



      {/* Featured Listings Section */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <h2 className="font-[Playfair Display] text-5xl font-bold dark:text-white text-center">
            Featured Listings
          </h2>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map(car => (
            <motion.div
              key={car.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative">
                <img src={car.image} alt={car.name} className="w-full h-64 object-cover" />
                <div className="font-[Playfair Display] absolute top-3 right-3 dark:bg-[#FBBF24] text-white py-1 px-3 rounded-full text-sm font-semibold">
                  Featured
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white">{car.name}</h3>
                <p className="text-2xl text-[#FBBF24] font-bold mb-4">{car.price}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar size={18} className="mr-2" />
                    <span>{car.year}</span>
                  </div>
                </div>
                <a href={`/vehicles/${car.id}`} className="font-[Playfair Display] block w-full dark:bg-[#FBBF24] hover:bg-yellow-600 text-white text-center py-3 rounded-lg font-semibold transition">
                  View Details
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>



        {/* Original ClassicCarsSection Component */}
        <ClassicCarsSection />




      {/* Services Section */}
      <div className="py-16 ">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-[Playfair Display] text-5xl font-bold text-center mb-12 dark:text-white">Our Specialized Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg text-center"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>

              </motion.div>
            ))}
          </div>
        </div>
      </div>





      {/* Testimonials Section */}
      <div className="py-16 bg-white dark:bg-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-[Playfair Display] text-5xl font-bold text-center mb-12 dark:text-white">What Our Clients Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg 
                     transition-transform duration-300 ease-in-out 
                     hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill={i < testimonial.rating ? "#f59e0b" : "none"}
                      stroke={i < testimonial.rating ? "#f59e0b" : "#d1d5db"}
                      size={20}
                      className="mr-1"
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <span className="font-semibold dark:text-white">{testimonial.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>





      {/* Map Section */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <h2 className="font-[Playfair Display] text-5xl font-bold mb-8 p-8 text-center dark:text-white">
            Our Location
          </h2>
          <div className="h-96 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.3895895885753!2d36.08776962490851!3d32.05870992034881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b65cd4d8f17e1%3A0x30e86b8a97e4ac7d!2sOrange%20Digital%20Village%20Zarqa!5e0!3m2!1sar!2sjo!4v1742754671002!5m2!1sar!2sjo"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>







    







      {/* Newsletter Section */}
      {/* <div className="bg-green-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-[Playfair Display] text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="font-[Playfair Display] text-white/90 mb-8 text-lg">Subscribe to our newsletter for exclusive updates on new inventory, special events, and classic car insights.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-3 rounded-lg text-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 max-w-md"
            />
            <button className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>
      </div> */}






     {/* WhatsApp Button */}
        <a
        href="https://wa.me/+962787491703"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 z-10 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
      >
        <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gray-700 text-white p-4 rounded-full shadow-lg  hover:bg-yellow-600 transition duration-300 z-40"
        >
          <FaArrowUp size={20} />
        </button>
      )}






      {/* Chatbot Button */}
      {/* <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-24 left-6 bg-[#FBBF24] text-white p-4 rounded-full shadow-lg hover:bg-[#2d2d2e] transition duration-300 z-40"
      >
        {showChatbot ? <FaTimes size={24} /> : <FaComments size={24} />}
      </button> */}







      {/* Chatbot Panel */}
      {/* {showChatbot && (
        <div className="fixed bottom-40 left-6 w-80 bg-gray-800 rounded-lg shadow-xl overflow-hidden z-40 animate-slide-up">
          <div className="bg-green-600 p-4">
            <h3 className="font-bold">Classic Car Concierge</h3>
            <p className="text-sm text-amber-100">Ask us anything about our collection</p>
          </div>

          <div className="h-80 overflow-y-auto p-4" style={{ scrollBehavior: 'smooth' }}>
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`mb-3 ${chat.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${chat.sender === 'user'
                    ? 'bg-green-600 text-white rounded-br-none'
                    : 'bg-gray-700 text-white rounded-bl-none'
                    }`}
                >
                  {chat.message}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-700 flex">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 rounded-l p-2 outline-none text-white"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 rounded-r"
            >
              Send
            </button>
          </form>
        </div> */}
      
    </div>
  );
}

export default Home;