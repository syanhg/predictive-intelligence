import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [topic, setTopic] = useState('All');
  const [sortBy, setSortBy] = useState('Last Updated');
  const [order, setOrder] = useState('High to Low');

  useEffect(() => {
    // Fetch markets from backend
    const fetchMarkets = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/markets');
        const data = await response.json();
        setEvents(data.markets || []);
      } catch (error) {
        console.error('Error fetching markets:', error);
        // Use mock data
        setEvents([
          {
            id: 1,
            title: 'Miami (FL) at Ole Miss',
            image: '',
            topPredictions: [
              { model: 'Gemini 2.5 Pro', accuracy: 59 },
              { model: 'Grok 4', accuracy: 58 },
            ],
            status: 'LIVE',
            closesAt: 'Jan 9, 2026',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-full"></div>
            <span className="font-semibold text-lg">Prophet Arena</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/events" className="text-gray-900 font-medium">
              Events
            </Link>
            <Link href="/leaderboard" className="text-gray-700 hover:text-gray-900">
              Leaderboard
            </Link>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Research
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              About
            </a>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events by title, topic, ticker, or markets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-3 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-8 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Topic:</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option>All</option>
              <option>Sports</option>
              <option>Politics</option>
              <option>Finance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option>Last Updated</option>
              <option>Most Active</option>
              <option>Newest</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order:</label>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option>High to Low</option>
              <option>Low to High</option>
            </select>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-gray-600">Live</span>
            <button className="w-12 h-6 bg-gray-300 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </button>
            <span className="text-sm text-gray-600">Historical</span>
          </div>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No events found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex gap-4">
                  {event.image && (
                    <img src={event.image} alt={event.title} className="w-16 h-16 rounded object-cover" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">Top predictions for:</p>
                    <div className="space-y-1">
                      {event.topPredictions?.map((pred, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="text-gray-700">{pred.model}</span>
                          <span className="float-right text-blue-500 font-medium">{pred.accuracy}%</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-green-600">● {event.status}</span>
                      <span className="text-gray-500">Closes {event.closesAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
