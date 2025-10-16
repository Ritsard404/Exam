import { useState, useEffect } from 'react';
import { MapPin, Search, X, LogOut, Globe, Trash2, Clock, AlertCircle } from 'lucide-react';

interface GeoData {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org?: string;
  postal?: string;
  timezone?: string;
}

const Home = () => {
  const [geo, setGeo] = useState<GeoData | null>(null);
  const [ipInput, setIpInput] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState<GeoData[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load history from memory on mount
    fetchGeo();
  }, []);

  const fetchGeo = async (ip?: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const url = ip ? `https://ipinfo.io/${ip}/geo` : 'https://ipinfo.io/geo';
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Invalid IP address or API error');
      }
      
      const data: GeoData = await response.json();
      setGeo(data);
      
      // Add to history if it's a new IP search (not the default user IP)
      if (ip && !history.find(h => h.ip === data.ip)) {
        setHistory([data, ...history]);
      }
    } catch (err) {
      setError('Failed to fetch location data. Please check the IP address.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (!ipInput.trim()) {
      setError('Please enter an IP address');
      return;
    }
    
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipPattern.test(ipInput)) {
      setError('Invalid IP address format. Use format: xxx.xxx.xxx.xxx');
      return;
    }
    
    // Validate IP range (0-255 for each octet)
    const octets = ipInput.split('.').map(Number);
    if (octets.some(octet => octet < 0 || octet > 255)) {
      setError('IP address octets must be between 0 and 255');
      return;
    }
    
    fetchGeo(ipInput);
    setIpInput('');
  };

  const handleClear = () => {
    setIpInput('');
    setError('');
    fetchGeo(); // Fetch user's own IP
  };

  const toggleSelection = (index: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedItems(newSelected);
  };

  const deleteSelected = () => {
    const newHistory = history.filter((_, idx) => !selectedItems.has(idx));
    setHistory(newHistory);
    setSelectedItems(new Set());
  };

  const handleHistoryClick = (item: GeoData) => {
    setGeo(item);
    setError('');
  };

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Generate Google Maps URL
  const getMapUrl = (loc: string) => {
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${loc}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">GeoIP Tracker</h1>
                <p className="text-sm text-gray-500">Track IP locations worldwide</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 shadow-md hover:shadow-lg"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Search & Current Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-500" />
                Search IP Address
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter IP address (e.g., 8.8.8.8)"
                  value={ipInput}
                  onChange={(e) => setIpInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Search className="w-4 h-4" />
                    Search
                  </button>
                  <button
                    onClick={handleClear}
                    disabled={isLoading}
                    className="flex-1 sm:flex-none px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                </div>
              </div>
              {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Current Location Card */}
            {isLoading ? (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading location data...</p>
                  </div>
                </div>
              </div>
            ) : geo && (
              <>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    Location Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                      <p className="text-sm text-gray-600 mb-1">IP Address</p>
                      <p className="text-lg font-semibold text-gray-800">{geo.ip}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                      <p className="text-sm text-gray-600 mb-1">City</p>
                      <p className="text-lg font-semibold text-gray-800">{geo.city || 'N/A'}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                      <p className="text-sm text-gray-600 mb-1">Region</p>
                      <p className="text-lg font-semibold text-gray-800">{geo.region || 'N/A'}</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-100">
                      <p className="text-sm text-gray-600 mb-1">Country</p>
                      <p className="text-lg font-semibold text-gray-800">{geo.country || 'N/A'}</p>
                    </div>
                    <div className="md:col-span-2 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-100">
                      <p className="text-sm text-gray-600 mb-1">Coordinates</p>
                      <p className="text-lg font-semibold text-gray-800">{geo.loc || 'N/A'}</p>
                    </div>
                    {geo.org && (
                      <div className="md:col-span-2 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-4 border border-violet-100">
                        <p className="text-sm text-gray-600 mb-1">Organization</p>
                        <p className="text-lg font-semibold text-gray-800">{geo.org}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Map Card */}
                {geo.loc && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-500" />
                      Location Map
                    </h2>
                    <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={getMapUrl(geo.loc)}
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Showing location for {geo.ip}</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Column - History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Search History
                </h2>
                {selectedItems.size > 0 && (
                  <button
                    onClick={deleteSelected}
                    className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 flex items-center gap-1 text-sm shadow-md"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete ({selectedItems.size})
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">No search history yet</p>
                  <p className="text-gray-400 text-xs mt-1">Start searching IP addresses</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                  {history.map((item, idx) => (
                    <div
                      key={idx}
                      className={`group flex items-center gap-3 p-3 rounded-lg transition duration-200 border ${
                        selectedItems.has(idx)
                          ? 'bg-blue-50 border-blue-200'
                          : 'hover:bg-gray-50 border-gray-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.has(idx)}
                        onChange={() => toggleSelection(idx)}
                        className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      />
                      <div
                        onClick={() => handleHistoryClick(item)}
                        className="flex-1 cursor-pointer"
                      >
                        <p className="font-medium text-gray-800 group-hover:text-blue-600 transition duration-200">
                          {item.ip}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.city}, {item.region}
                        </p>
                      </div>
                      <MapPin className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition duration-200 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;