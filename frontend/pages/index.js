import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [topModelsBrier, setTopModelsBrier] = useState([]);
  const [topModelsReturn, setTopModelsReturn] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/leaderboard');
        const data = await response.json();
        setTopModelsBrier(data.brier_score?.slice(0, 3) || []);
        setTopModelsReturn(data.market_return?.slice(0, 3) || []);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        // Use mock data on error
        setTopModelsBrier([
          { rank: 1, model: 'GPT-5 (high)', score: 0.85 },
          { rank: 2, model: 'GPT-5 (medium)', score: 0.82 },
          { rank: 3, model: 'GPT-5 (minimal)', score: 0.79 },
        ]);
        setTopModelsReturn([
          { rank: 1, model: 'GPT-4o', score: 0.88 },
          { rank: 2, model: 'o3', score: 0.76 },
          { rank: 3, model: 'GPT-5 (high)', score: 0.74 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
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
            <Link href="/events" className="text-gray-700 hover:text-gray-900">
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
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            How well can AI predict the future?
          </h1>
          <p className="text-xl text-gray-600">
            Compare AI model performance across prediction markets.
          </p>
        </div>

        {/* Top Models Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Brier Score */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span>🏆</span> Top Model by Brier Score
            </h2>
            <div className="space-y-4">
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                topModelsBrier.map((model, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-500 font-semibold">#{model.rank || idx + 1}</span>
                      <span className="text-gray-400">⚙️</span>
                      <span className="font-medium text-gray-900">{model.model}</span>
                      {model.score && <span className="ml-auto text-blue-500">{(model.score * 100).toFixed(0)}%</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Market Return */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span>🥇</span> Top Models by Return
            </h2>
            <div className="space-y-4">
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                topModelsReturn.map((model, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-500 font-semibold">#{model.rank || idx + 1}</span>
                      <span className="text-gray-400">⚙️</span>
                      <span className="font-medium text-gray-900">{model.model}</span>
                      {model.score && <span className="ml-auto text-blue-500">{(model.score * 100).toFixed(0)}%</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-6 mb-12">
          <Link href="/leaderboard"
            className="border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
          >
            View Leaderboard
          </Link>
          <a href="#"
            className="border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
          >
            Read Research
          </a>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 space-y-2">
          <p>❤️ Liking our platform? Share via</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="text-blue-400 hover:text-blue-600">𝕏 X/Twitter</a>
            <a href="#" className="text-blue-500 hover:text-blue-700">in LinkedIn</a>
          </div>
        </div>
      </main>
    </div>
  );
}
