import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('model');
  const [models, setModels] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch leaderboard data from backend
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/leaderboard');
        const data = await response.json();
        setModels(data.brier_score || []);
        setAgents(data.agents || []);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        // Use mock data
        setModels([
          { rank: 1, model: 'GPT-5 (high)', score: 0.92, events: 150 },
          { rank: 2, model: 'Claude 3.5', score: 0.88, events: 142 },
          { rank: 3, model: 'Gemini 2.0', score: 0.85, events: 138 },
          { rank: 4, model: 'GPT-4o', score: 0.82, events: 135 },
          { rank: 5, model: 'o3', score: 0.79, events: 128 },
        ]);
        setAgents([
          { rank: 1, agent: 'Agent Alpha', return: 1.45, trades: 89 },
          { rank: 2, agent: 'Agent Beta', return: 1.32, trades: 76 },
          { rank: 3, agent: 'Agent Gamma', return: 1.18, trades: 65 },
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
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-gray-900">
              Events
            </Link>
            <Link href="/leaderboard" className="text-gray-900 font-medium">
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
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">Model Leaderboard</h1>
              <p className="text-gray-600 max-w-2xl">
                The Model Leaderboard evaluates raw model inference under a fixed, centrally curated context. All
                models receive identical inputs and cannot perform independent web search or tool use, in contrast to the
                <a href="#" className="text-blue-500 hover:underline ml-1">Agent Leaderboard</a>, which measures end-to-end agent capability with unrestricted tool access.
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-700">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none mt-2"
              >
                <option>All</option>
                <option>Sports</option>
                <option>Politics</option>
                <option>Finance</option>
              </select>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('model')}
                className={`py-3 font-medium border-b-2 transition ${
                  activeTab === 'model'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Brier Score
              </button>
              <button
                onClick={() => setActiveTab('agent')}
                className={`py-3 font-medium border-b-2 transition ${
                  activeTab === 'agent'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Market Return
              </button>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading leaderboard...</p>
          </div>
        ) : activeTab === 'model' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Model</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Brier Score</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Events</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-bold text-blue-600">#{model.rank || idx + 1}</td>
                    <td className="py-4 px-4 text-gray-900 font-medium">
                      <span className="inline-flex items-center gap-2">
                        <span>⚙️</span>
                        {model.model}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-600">0.{Math.round(model.score * 100)}</td>
                    <td className="py-4 px-4 text-right text-gray-600">{model.events || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Agent</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Return</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Trades</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-bold text-blue-600">#{agent.rank || idx + 1}</td>
                    <td className="py-4 px-4 text-gray-900 font-medium">{agent.agent}</td>
                    <td className="py-4 px-4 text-right text-green-600 font-medium">{agent.return}x</td>
                    <td className="py-4 px-4 text-right text-gray-600">{agent.trades}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
