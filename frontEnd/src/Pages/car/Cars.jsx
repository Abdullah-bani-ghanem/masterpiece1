import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaArrowUp, FaSearch, FaFilter, FaComments, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cars() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', message: 'Hello! How can I help you with finding your perfect classic car today?' }
  ]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000], // Increased max price
    year: '',
    make: '',
    model: '',
  });
  // Enhanced search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars/approved-cars/1');
        // console.log(response.data);  // تحقق من استجابة الخادم
        setCars(response.data);
        setSearchResults(response.data); // Initialize search results with all cars
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Listen for scroll to show/hide back to top button
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

  // Enhanced search effect - runs whenever searchQuery or filters change
  useEffect(() => {
    if (cars.length === 0) return; // Skip if no data loaded yet

    setIsSearching(true);

    // Debounce search for better performance
    const searchTimeout = setTimeout(() => {
      const filteredResults = performSearch(cars, searchQuery, filters);

      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, filters, cars]);

  // Enhanced search function that searches all car properties
  const performSearch = (carsArray, query, filterSettings) => {
    const searchLower = query.toLowerCase().trim();

    return carsArray.filter(car => {
      // Check filters first
      const priceNum = parseInt(car.price);
      const matchesFilters = (
        priceNum >= filterSettings.priceRange[0] &&
        priceNum <= filterSettings.priceRange[1] &&
        (filterSettings.year === '' || car.year.toString().includes(filterSettings.year)) &&
        (filterSettings.make === '' || car.make.toLowerCase().includes(filterSettings.make.toLowerCase())) &&
        (filterSettings.model === '' || car.model.toLowerCase().includes(filterSettings.model.toLowerCase()))
      );

      // If no search query, just return filter results
      if (searchLower === '') return matchesFilters;

      // Enhanced search across all car properties
      const matchesSearch =
        car.make?.toLowerCase().includes(searchLower) ||
        car.model?.toLowerCase().includes(searchLower) ||
        car.year?.toString().includes(searchLower) ||
        car.name?.toLowerCase().includes(searchLower) ||
        car.title?.toLowerCase().includes(searchLower) ||
        car.description?.toLowerCase().includes(searchLower) ||
        car.color?.toLowerCase().includes(searchLower) ||
        car.engine?.toLowerCase().includes(searchLower) ||
        car.transmission?.toLowerCase().includes(searchLower) ||
        car.price?.toString().includes(searchLower);

      return matchesFilters && matchesSearch;
    });
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle chatbot message submit
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatMessage.trim() === '') return;

    // Add user message to chat history
    setChatHistory([...chatHistory, { sender: 'user', message: chatMessage }]);

    // Simulate bot response (in a real app, this would call an API)
    setTimeout(() => {
      let botResponse;
      const msg = chatMessage.toLowerCase();

      if (msg.includes('price') || msg.includes('cost')) {
        botResponse = "Our classic cars range from $30,000 to $150,000 depending on make, model, and condition. Is there a specific budget you have in mind?";
      } else if (msg.includes('test drive') || msg.includes('see')) {
        botResponse = "We offer private viewings and test drives by appointment. Would you like me to schedule one for you?";
      } else if (msg.includes('financing') || msg.includes('loan')) {
        botResponse = "We offer specialized classic car financing options with competitive rates. I can connect you with our finance team if you're interested.";
      } else {
        botResponse = "Thanks for your message! One of our classic car specialists will get back to you shortly. Is there anything specific you'd like to know about our collection?";
      }

      setChatHistory(prev => [...prev, { sender: 'bot', message: botResponse }]);
    }, 1000);

    setChatMessage('');
  };

  // Handle search input change with immediate feedback
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Toggle filter panel
  const toggleFilterPanel = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative">
      {/* Header Section with Improved Hero */}
      <div className="bg-black bg-opacity-70 py-12 px-4 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('../img/hero-bg.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="font-[Playfair Display] text-5xl font-bold mb-6 tracking-wide text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
            Classic Cars Collection
          </h1>
          <p className="font-[Playfair Display] text-2xl text-center max-w-3xl mx-auto mb-8 text-gray-100 font-light">
            Discover Your Perfect Classic Car — Timeless Style, Unmatched Performance!
          </p>

          {/* Enhanced Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search by make, model, year, color, engine type..."
              className="w-full py-3 px-6 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="absolute right-3 top-3 text-green-500">
              <FaSearch size={20} />
            </button>
          </form>

          {/* Filter Toggle Button */}
          <div className="font-[Playfair Display] flex justify-center mt-4">
            <button
              onClick={toggleFilterPanel}
              className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <FaFilter />
              <span>{filterOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
          </div>

          {/* Expanded Filter Panel */}
          {filterOpen && (
            <div className="mt-6 p-6 bg-gray-800 rounded-lg border border-gray-700 max-w-2xl mx-auto">
              <h3 className="font-[Playfair Display] text-lg font-semibold mb-4 text-green-400">Refine Your Search</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-[Playfair Display] block text-sm font-medium text-gray-300 mb-1">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                      value={filters.priceRange[0]}
                      onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                    />
                    <span>to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 1000000])}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-[Playfair Display] block text-sm font-medium text-gray-300 mb-1">Year</label>
                  <input
                    type="text"
                    placeholder="e.g. 1969"
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    value={filters.year}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-[Playfair Display] block text-sm font-medium text-gray-300 mb-1">Make</label>
                  <input
                    type="text"
                    placeholder="e.g. Ford, Chevrolet"
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    value={filters.make}
                    onChange={(e) => handleFilterChange('make', e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-[Playfair Display] block text-sm font-medium text-gray-300 mb-1">Model</label>
                  <input
                    type="text"
                    placeholder="e.g. Mustang, Corvette"
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    value={filters.model}
                    onChange={(e) => handleFilterChange('model', e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setFilters({
                    priceRange: [0, 1000000],
                    year: '',
                    make: '',
                    model: '',
                  })}
                  className="font-[Plafont-[Playfair Display] bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="flex justify-center mt-8 space-x-8">
            <div className="text-center">
              <p className="font-[Playfair Display] text-3xl font-bold text-green-400">25+</p>
              <p className="font-[Playfair Display] text-gray-300">Unique Models</p>
            </div>
            <div className="text-center">
              <p className="font-[Playfair Display] text-3xl font-bold text-green-400">100%</p>
              <p className="font-[Playfair Display] text-gray-300">Verified History</p>
            </div>
            <div className="text-center">
              <p className="font-[Playfair Display] text-3xl font-bold text-green-400">30-Day</p>
              <p className="font-[Playfair Display] text-gray-300">Guarantee</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Results Section Header - MODIFIED WITH ADD CAR BUTTON */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <div className="w-full">
            <p className="font-[Playfair Display] text-5xl text-green-400 font-semibold text-center">
              Available Classic Cars
            </p>
            {/* Search results count */}
            {!loading && (
              <p className="font-[Playfair Display] text-center text-gray-300 mt-2">
                {searchResults.length === 0 ?
                  "No cars match your search" :
                  `Showing ${searchResults.length} ${searchResults.length === 1 ? 'car' : 'cars'}`
                }
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            )}
          </div>
          
          {/* Add Car For Sale Button */}
          <Link to="/form" className="mt-4 md:mt-0">
            <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium flex items-center">
              <span className="mr-2">Add a car for sale</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Loading State */}
        {loading || isSearching ? (
          <div className="font-[Playfair Display] flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
          </div>
        ) : searchResults.length === 0 ? (
          // No results found
          <div className="font-[Playfair Display] text-center py-16">
            <FaSearch size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No Cars Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          /* Cars Grid with Improved Card Design */
          <div className="font-[Playfair Display] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {searchResults.map((car,index) => (

              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg border border-gray-700 group">
                <div className="relative">
                  <img
                    src={`http://localhost:5000/uploads/${car.images[0]}`}
                    alt={car.name}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-2 rounded-bl-lg font-bold text-lg shadow-md">
                    ${car.price}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-16"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-green-400">{car.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Year: {car.year}</span>
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">{car.model}</span>
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-2">{car.description}</p>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-400">Available</span>
                    </div>
                    <Link to={`/car-details/${car._id}`}>
                      <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-medium">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
          className="fixed bottom-6 right-6 bg-gray-700 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-40"
        >
          <FaArrowUp size={20} />
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
    </div>
  );
}

export default Cars;
