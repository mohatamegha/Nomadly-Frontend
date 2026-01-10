import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TravelListings from "../components/TravelListings";

function DiscoverPage() {
  console.log('discover');
  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Top white section */}
      <div className="bg-white">
        <Header />
        <SearchBar />
      </div>

      {/* Swipe cards */}
      <TravelListings />

      <Footer activeTab="discover" />
    </div>
  );
}

export default DiscoverPage;
