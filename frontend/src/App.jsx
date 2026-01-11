import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Star, Info, UtensilsCrossed, UserCircle, LogIn, ChevronDown, Zap, UserPlus, Camera } from 'lucide-react';

const MockCampusDishes = [
  {
    id: 1,
    dishName: "Hand-Pulled Buckwheat Noodles", 
    restaurantName: "Global Station",
    cafeName: "The Market Café",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=600",
    price: "$12.50",
    aiSummary: "AI Insight: This signature dish features slow-cooked chicken broth that students rate as the best on campus. High in protein, low fat, and uses 100% gluten-free buckwheat flour. Based on 42 reviews, the broth is richest at 11:30 AM right when they open. Students suggest avoiding the 1:00 PM rush.",
    ingredients: ["100% Buckwheat Flour", "House-made Chicken Stock", "Organic Bok Choy", "Ginger", "Scallions"],
    nutrition: { cal: 450, pro: "22g", carb: "55g", fat: "12g" },
    rating: 4.8
  },
  {
    id: 2,
    dishName: "Sunset Truffle Burger", 
    restaurantName: "The Grill",
    cafeName: "Lone Mountain Cafe",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600",
    price: "$10.00",
    aiSummary: "AI Insight: A cult favorite at Lone Mountain. The 24-hour aged cheddar combined with house-made truffle aioli provides a premium experience. AI analysis indicates the fries are consistently crispier here than at Market Café. Pro tip: The outdoor seating offers the best sunset view.",
    ingredients: ["Grass-fed Angus Beef", "Truffle Aioli", "24-hour Aged Cheddar", "Brioche Bun", "House-made Pickles"],
    nutrition: { cal: 780, pro: "35g", carb: "45g", fat: "38g" },
    rating: 4.5
  },
  {
    id: 3,
    dishName: "Grilled Salmon Bento", 
    restaurantName: "Sambal",
    cafeName: "The Market Café",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600",
    price: "$14.50",
    aiSummary: "AI Insight: One of the most nutritionally balanced meals available. The Atlantic salmon is omega-3 rich and typically served with brown rice. Student data shows this dish has a high 'Sell-out' risk, often unavailable by 1:30 PM. The AI notes that the miso glaze has been improved recently.",
    ingredients: ["Fresh Atlantic Salmon", "Organic Brown Rice", "Miso Glaze", "Pickled Ginger", "Edamame"],
    nutrition: { cal: 520, pro: "32g", carb: "40g", fat: "18g" },
    rating: 4.7
  },
  {
    id: 4,
    dishName: "Vegan Green Curry", 
    restaurantName: "Global Station",
    cafeName: "The Market Café",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=600",
    price: "$11.00",
    aiSummary: "AI Insight: This authentic Thai-style curry is the highest-rated hot vegan meal in UC. AI sentiment analysis highlights the spice level as 'Medium-High'. Loaded with fibrous bamboo shoots and organic tofu. Recent reviews suggest pairing it with a side of white rice.",
    ingredients: ["Coconut Milk", "Organic Firm Tofu", "Bamboo Shoots", "Green Curry Paste", "Thai Basil", "Eggplant"],
    nutrition: { cal: 380, pro: "12g", carb: "48g", fat: "15g" },
    rating: 4.3
  }
];

const USF_LOCATIONS = ["The Market Café", "Lone Mountain Cafe", "Crossroads"];
const PRICE_RANGES = ["< $10", "$10 - $15", "$15+"];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCafes, setSelectedCafes] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleItem = (item, list, setList) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#333] font-sans pb-20">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-3xl font-black text-[#ff9000] tracking-tighter italic mr-6 cursor-pointer">DonsEAT</h1>

          <div className="flex-1 max-w-3xl flex border border-gray-200 rounded-full shadow-sm bg-white overflow-visible h-12">
            {/* Cafe Location Dropdown */}
            <div className="relative flex-1 border-r border-gray-100">
              <button onClick={() => setOpenDropdown(openDropdown === 'loc' ? null : 'loc')} className="w-full h-full pl-10 pr-4 text-left text-sm flex items-center justify-between focus:outline-none">
                <MapPin className="absolute left-4 top-3.5 text-[#ff9000] size-4" />
                <span className="truncate font-bold text-[11px] uppercase tracking-tighter">
                  {selectedCafes.length === 0 ? "All Cafes" : `${selectedCafes.length} Locs`}
                </span>
                <ChevronDown className="size-3 text-gray-300" />
              </button>
              {openDropdown === 'loc' && (
                <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 mt-2 shadow-xl rounded-2xl py-3 z-50">
                  {USF_LOCATIONS.map(cafe => (
                    <label key={cafe} className="flex items-center px-5 py-2 hover:bg-orange-50 cursor-pointer">
                      <input type="checkbox" className="accent-[#ff9000] mr-3" checked={selectedCafes.includes(cafe)} onChange={() => toggleItem(cafe, selectedCafes, setSelectedCafes)} />
                      <span className="text-sm font-medium">{cafe}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Dropdown */}
            <div className="relative flex-1 border-r border-gray-100">
              <button onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')} className="w-full h-full pl-10 pr-4 text-left text-sm flex items-center justify-between focus:outline-none">
                <DollarSign className="absolute left-4 top-3.5 text-[#ff9000] size-4" />
                <span className="truncate font-bold text-[11px] uppercase tracking-tighter">
                  {selectedPrices.length === 0 ? "Any Budget" : `${selectedPrices.length} selected`}
                </span>
                <ChevronDown className="size-3 text-gray-300" />
              </button>
              {openDropdown === 'price' && (
                <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 mt-2 shadow-xl rounded-2xl py-3 z-50">
                  {PRICE_RANGES.map(range => (
                    <label key={range} className="flex items-center px-5 py-2 hover:bg-orange-50 cursor-pointer">
                      <input type="checkbox" className="accent-[#ff9000] mr-3" checked={selectedPrices.includes(range)} onChange={() => toggleItem(range, selectedPrices, setSelectedPrices)} />
                      <span className="text-sm font-medium">{range}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex-[1.2]">
              <Search className="absolute left-4 top-3.5 text-gray-300 size-4" />
              <input className="w-full h-full pl-10 pr-4 focus:outline-none text-xs" placeholder="Search dish..." />
            </div>
            
            <button className="bg-[#ff9000] text-white px-6 rounded-full m-1 font-bold hover:bg-[#e68200] text-xs transition-all active:scale-95">GO</button>
          </div>

          <div className="ml-6 flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <button onClick={() => setIsLoggedIn(true)} className="text-xs font-bold text-gray-400 hover:text-[#ff9000] transition-all">Login</button>
                <button className="text-xs font-bold bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-sm">Sign Up</button>
              </>
            ) : (
              <div className="flex items-center gap-2 bg-orange-50 px-2 py-1 rounded-full border border-orange-100">
                <span className="text-[10px] font-black text-[#ff9000] px-1">Dons Elite</span>
                <UserCircle className="size-7 text-orange-400" />
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none">Hilltop Dining Guide</h2>
            <p className="text-gray-400 font-medium mt-2 text-sm italic">Verified student favorites & AI deep insights</p>
          </div>
          <button className="flex items-center gap-2 bg-[#ff9000] text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-lg text-sm">
            <Camera className="size-5" /> Post Your Meal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {MockCampusDishes.map((dish) => (
            <div key={dish.id} className="bg-white border border-gray-100 flex flex-col rounded-[2.5rem] overflow-hidden hover:shadow-xl transition-all duration-500 group shadow-sm">
              <div className="flex flex-col sm:flex-row h-full">
                {/* Image Section */}
                <div className="w-full sm:w-52 h-full relative overflow-hidden shrink-0">
                  <img src={dish.image} alt={dish.dishName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-4 left-4 bg-white shadow-lg px-4 py-1.5 rounded-full font-black text-xs text-gray-900">
                    {dish.price}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-[#ff9000] transition-colors tracking-tight italic">{dish.dishName}</h3>
                    <div className="flex items-center text-[#ff9000] font-black text-xs">
                      <Star className="size-3 fill-current mr-0.5" /> {dish.rating}
                    </div>
                  </div>
                  <p className="text-[#06c] font-black text-[10px] mb-4 uppercase tracking-[0.1em]">
                    {dish.restaurantName} • {dish.cafeName}
                  </p>
                  
                  {/* AI Detailed Insight */}
                  <div className="bg-[#fdfdfd] p-5 rounded-2xl border border-gray-100 mb-5 relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="size-3.5 text-[#ff9000] fill-current" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 font-sans">AI Analysis</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-[1.7] font-medium italic relative z-10">
                      "{dish.aiSummary}"
                    </p>
                  </div>

                  {/* Ingredients Section */}
                  <div className="mb-6">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Ingredients</span>
                    <p className="text-[10px] text-gray-500 font-medium leading-relaxed px-1">
                      {dish.ingredients.join(" • ")}
                    </p>
                  </div>

                  {/* Nutrition Section - Clean White Style */}
                  <div className="flex justify-between items-center bg-white border border-gray-100 p-4 rounded-2xl shadow-sm mt-auto">
                    <div className="text-center flex-1 border-r border-gray-50">
                      <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter mb-1">Calories</p>
                      <p className="text-sm font-black text-gray-700">{dish.nutrition.cal}</p>
                    </div>
                    <div className="text-center flex-1 border-r border-gray-50">
                      <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter mb-1">Protein</p>
                      <p className="text-sm font-black text-gray-700">{dish.nutrition.pro}</p>
                    </div>
                    <div className="text-center flex-1 border-r border-gray-50">
                      <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter mb-1">Carbs</p>
                      <p className="text-sm font-black text-gray-700">{dish.nutrition.carb}</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter mb-1">Fat</p>
                      <p className="text-sm font-black text-gray-700">{dish.nutrition.fat}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;