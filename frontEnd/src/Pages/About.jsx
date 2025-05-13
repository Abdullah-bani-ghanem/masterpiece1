import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp, ChevronDown, ChevronUp } from 'lucide-react';
import { FaComments, FaTimes } from 'react-icons/fa';
import WhatsAndButton from '../Component/WhatsAndButton';

function About() {
  // State to track whether the expanded text is shown
  const [showMore, setShowMore] = useState(false);
  // State to track visibility of back to top button
  const [showBackToTop, setShowBackToTop] = useState(false);
  // State to track which FAQ is expanded
  const [expandedFaq, setExpandedFaq] = useState(null);
  // Chatbot states
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', message: 'Hello! How can I help you with our classic cars today?' }
  ]);

  // Function to toggle the text visibility
  const toggleText = () => {
    setShowMore(!showMore);
  };

  // Function to toggle FAQ visibility
  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  // Function to handle scroll event for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to open WhatsApp
  const openWhatsApp = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  // Function to handle chat submission
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message to chat history
    const updatedChat = [...chatHistory, { sender: 'user', message: chatMessage }];
    setChatHistory(updatedChat);

    // Clear input field
    setChatMessage('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(chatMessage);
      setChatHistory([...updatedChat, { sender: 'bot', message: botResponse }]);

      // Scroll to the bottom of chat
      const chatContainer = document.querySelector('.overflow-y-auto');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 800);
  };

  // Simple bot response function
  const getBotResponse = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return 'Hello! How can I help you with classic cars today?';
    } else if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
      return 'Our classic cars range from $25,000 to $500,000 depending on make, model, year, and condition. Can I help you find something specific?';
    } else if (msg.includes('collection') || msg.includes('inventory') || msg.includes('cars')) {
      return 'We have a diverse collection of classic cars from the 1930s to the 1980s, including brands like Jaguar, Porsche, Ferrari, Chevrolet, Ford, and many more!';
    } else if (msg.includes('sell') || msg.includes('selling')) {
      return 'Were always interested in acquiring quality classic cars. Please provide details about your vehicle, and we can arrange an assessment.';
    } else if (msg.includes('restoration') || msg.includes('restore')) {
      return 'We offer professional restoration services with our team of expert craftsmen who specialize in authentic restorations using period-correct methods.';
    } else if (msg.includes('contact') || msg.includes('reach')) {
      return 'You can contact us via phone at +1234567890, through our WhatsApp, or by visiting our showroom at Classic Avenue, Vintage City.';
    } else {
      return 'Thanks for your message. Our classic car specialist will get back to you soon with more information. Is there anything specific about our collection youd like to know?';
    }
  };

  // Short and full versions of the text
  const shortText = <p className='font-[Playfair Display]'>"At our Classic Car sales website, we offer a curated selection of the finest classic cars that embody elegance and luxury. Whether you're looking to add a rare gem to your collection or wish to sell your own unique classic car, we provide a trustworthy and seamless experience."</p>;

  const fullText = <p className='font-[Playfair Display]'>"At our Classic Car sales website, we offer a curated selection of the finest classic cars that embody elegance and luxury. Whether you're looking to add a rare gem to your collection or wish to sell your own unique classic car, we provide a trustworthy and seamless experience. Our team of experts ensures that each vehicle is of the highest quality, with a documented history and meticulous maintenance. Explore our diverse collection and start a new journey in the world of classic cars, where passion meets authenticity and timeless beauty. We pride ourselves on our commitment to quality, authenticity, and customer satisfaction. Each car in our inventory undergoes a rigorous inspection process to ensure it meets our high standards. Our knowledgeable staff is always ready to assist you in finding the perfect classic car that matches your preferences and requirements."</p>;

  // FAQ Data
  const faqData = [
    {
      question: "What documentation do I need to sell my classic car?",
      answer: "To sell your classic car through our platform, you'll need to provide the original title, maintenance records, restoration documentation (if applicable), and verification of the vehicle identification number (VIN). Our team will guide you through the process to ensure all paperwork is complete and accurate."
    },
    {
      question: "Do you offer financing options for classic car purchases?",
      answer: "Yes, we partner with specialized classic car financing institutions that understand the unique value of vintage automobiles. We can arrange flexible payment plans with competitive interest rates, specifically designed for collector vehicles. Contact us for more details about financing options tailored to your situation."
    },
    {
      question: "How do you verify the authenticity and condition of your classic cars?",
      answer: "Each vehicle in our inventory undergoes a comprehensive 150-point inspection by certified classic car specialists. We verify matching numbers, authenticate original parts, and thoroughly document the car's history. We also provide detailed condition reports with professional photography and, when available, include original documentation and provenance records."
    },
    {
      question: "Can you help source a specific classic car model that's not in your inventory?",
      answer: "Absolutely! Our extensive network of collectors, dealers, and enthusiasts allows us to locate rare and specific models. Simply provide us with details of your dream classic car, and our acquisition team will begin a personalized search. We've successfully sourced some of the rarest vehicles for our clients worldwide."
    },
    {
      question: "What shipping options are available for international buyers?",
      answer: "We offer door-to-door enclosed transport services worldwide. Our logistics team handles all shipping details, including customs documentation, insurance during transit, and any necessary temporary import permits. We work with specialized classic car shipping companies that understand the unique requirements of vintage vehicles."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gray-500 bg-opacity-70 bg-blend-overlay bg-center bg-cover py-16 sm:py-20 md:py-28"
        style={{ backgroundImage: 'url("https://media.istockphoto.com/id/2149133771/photo/vintage-cars-from-the-1940s-abandoned-in-a-desert-junkyard.jpg?s=2048x2048&w=is&k=20&c=vVhj70VGbykv8zAGrX9NMJhghLKMuJpYUa4fsV-xkeE=")' }}>
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-[Playfair Display] text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg">About Us</h1>
          <p className="font-[Playfair Display] text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto">"Whether you're searching for your dream classic car or ready to sell, we're here to make your journey effortless and memorable."</p>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-[#2d2d2e]">
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <img
                className="rounded-full w-full aspect-square object-cover outline outline-offset-4 outline-yellow-500"
                src="https://images.unsplash.com/photo-1581055926930-cfc6afbe04df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjc0fHxjbGFzc2ljJTIwY2FyJTIwZ3JlZW58ZW58MHx8MHx8fDA%3D"
                alt="About us"
              />
            </div>

            <div className="w-full lg:w-3/5 mt-8 lg:mt-0 p-4 sm:p-6 shadow-lg shadow-yellow-500 flex flex-col justify-center items-center rounded-xl">
              <h2 className="font-[Playfair Display] text-3xl sm:text-4xl text-center text-[#FBBF24] font-bold px-4 py-1">
                About Us
              </h2>
              <p className="font-[Playfair Display] text-xl sm:text-2xl md:text-3xl text-center text-gray-800 dark:text-gray-200 font-bold my-4 sm:my-5">
                We are Petal Haven S.C.
              </p>
              <div className="mt-2 text-justify sm:px-2 dark:text-gray-300 text-base sm:text-lg md:text-xl">
                {showMore ? fullText : shortText}
              </div>

              <button
                onClick={toggleText}
                className="mt-6 sm:mt-8 lg:mt-10 px-4 sm:px-5 lg:px-6 py-2 sm:py-3 lg:py-4 bg-yellow-600 rounded-sm text-base sm:text-lg lg:text-xl text-white font-semibold hover:bg-yellow-700 transition-colors"
              >
                {showMore ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full  dark:bg-[#2d2d2e]">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-[Playfair Display] text-3xl sm:text-4xl text-center text-[#FBBF24] font-bold mb-8 sm:mb-12">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="mb-4 sm:mb-6 border border-green-200 rounded-lg shadow-md dark:border-yellow-500"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <h3 className="font-[Playfair Display] text-lg sm:text-xl font-semibold text-left text-gray-800 dark:text-gray-200 pr-4">
                    {faq.question}
                  </h3>
                  {expandedFaq === index ?
                    <ChevronUp className="flex-shrink-0 h-5 w-5 text-yellow-600" /> :
                    <ChevronDown className="flex-shrink-0 h-5 w-5 text-yellow-600" />
                  }
                </button>

                {expandedFaq === index && (
                  <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white dark:bg-gray-700 rounded-b-lg border-t border-green-100 dark:border-green-900">
                    <p className="font-[Playfair Display] text-sm sm:text-base text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

     

<WhatsAndButton/>




    </>
  );
}

export default About;