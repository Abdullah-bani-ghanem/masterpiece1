import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp, ChevronDown, ChevronUp } from 'lucide-react';
import { FaComments, FaTimes } from 'react-icons/fa';

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
  const shortText  = <p className='font-[Playfair Display]'>"At our Classic Car sales website, we offer a curated selection of the finest classic cars that embody elegance and luxury. Whether you're looking to add a rare gem to your collection or wish to sell your own unique classic car, we provide a trustworthy and seamless experience."</p>;
  
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
      <div className="bg-gray-700 bg-opacity-70 bg-blend-overlay bg-center bg-cover py-28" 
           style={{ backgroundImage: 'url("https://media.istockphoto.com/id/2149133771/photo/vintage-cars-from-the-1940s-abandoned-in-a-desert-junkyard.jpg?s=2048x2048&w=is&k=20&c=vVhj70VGbykv8zAGrX9NMJhghLKMuJpYUa4fsV-xkeE=")' }}>
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-[Playfair Display] text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">About Us</h1>
          <p className="font-[Playfair Display] text-xl md:text-2xl max-w-3xl mx-auto">"Whether you're searching for your dream classic car or ready to sell, we're here to make your journey effortless and memorable."</p>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full lg:h-screen h-full m-auto flex items-center justify-center py-20 bg-gray-50 dark:bg-gray-900">
        <div className="w-full h-full flex flex-col justify-center items-center sm:px-4 px-2">
          <div className="lg:w-[90%] w-full mx-auto flex flex-col lg:gap-6 lg:flex-row items-center justify-center ">
            <div className="relative">
          
              <img
                className="rounded-full relative object-cover right-0 lg:w-[30rem] lg:h-[30rem] sm:w-[25rem] sm:h-[25rem] w-[12rem] h-[12rem] outline sm:outline-offset-[.77em] outline-offset-[.37em] outline-green-500"
                src="https://images.unsplash.com/photo-1581055926930-cfc6afbe04df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjc0fHxjbGFzc2ljJTIwY2FyJTIwZ3JlZW58ZW58MHx8MHx8fDA%3D"
                alt="About us"
              />
            </div>
            {/*  */}
            <div className="lg:w-[60%] p-4 w-full h-full shadow-xl shadow-green-300/40 flex flex-col justify-center items-center sm:px-6 px-4 rounded-xl">
              <h2 className="font-[Playfair Display] text-4xl text-center text-green-600 font-bold px-4 py-1 md:mt-0 mt-10">
                About Us
              </h2>
              <p className="font-[Playfair Display] md:text-3xl text-2xl text-center text-gray-800 dark:text-gray-200 font-bold my-5">
                We are Petal Haven S.C.
              </p>
              <p className="md:text-xl sm:text-lg text-base mt-2 text-justify sm:px-2 dark:text-gray-300">
                {showMore ? fullText : shortText}
              </p>
              {/* button */}
              <button 
                onClick={toggleText}
                className="lg:mt-10 mt-6 lg:px-6 px-4 lg:py-4 py-2 bg-green-600 rounded-sm lg:text-xl text-lg text-white font-semibold"
              >
                {showMore ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="font-[Playfair Display] text-4xl text-center text-green-600 font-bold mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="mb-6 border border-green-200 rounded-lg shadow-md dark:border-green-800"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <h3 className="font-[Playfair Display] text-xl font-semibold text-left text-gray-800 dark:text-gray-200">
                    {faq.question}
                  </h3>
                  {expandedFaq === index ? 
                    <ChevronUp className="h-5 w-5 text-green-600" /> : 
                    <ChevronDown className="h-5 w-5 text-green-600" />
                  }
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-white dark:bg-gray-700 rounded-b-lg border-t border-green-100 dark:border-green-900">
                    <p className="font-[Playfair Display] text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp button */}
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





      {/* Back to top button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-10 w-12 h-12 rounded-full bg-gray-800 dark:bg-gray-600 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6 text-white" />
        </button>
      )}
      




      {/* Chatbot Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-24 left-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition duration-300 z-40"
      >
        {showChatbot ? <FaTimes size={24} /> : <FaComments size={24} />}
      </button>
     
      {/* Chatbot Panel */}
      {showChatbot && (
        <div className="fixed bottom-40 left-6 w-80 bg-gray-800 rounded-lg shadow-xl overflow-hidden z-40 animate-slide-up">
          <div className="bg-green-600 p-4">
            <h3 className="font-bold">Classic Car Concierge</h3>
            <p className="text-sm text-amber-100">Ask us anything about our collection</p>
          </div>
         
          <div className="h-80 overflow-y-auto p-4" style={{scrollBehavior: 'smooth'}}>
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`mb-3 ${chat.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    chat.sender === 'user'
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-gray-700 text-white rounded-bl-none'
                  }`}
                >
                  {chat.message}
                </div>
              </div>
            ))}
          </div>
         
          <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-700 flex">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 rounded-l p-2 outline-none"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 rounded-r"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default About;