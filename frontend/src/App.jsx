import { useEffect, useState } from "react";
import api from "./api";
import SignalForm from "./components/SingnalForm";
import SignalTable from "./components/SingnalTable";

function App() {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [symbol, setSymbol] = useState("");

  const fetchSignals = async () => {
    try {
      setLoading(true);
      setError("");

      const url = symbol
        ? `/signals?symbol=${symbol}`
        : "/signals";

      const res = await api.get(url);

      setSignals(res.data);
    } catch (err) {
      setError("Failed to fetch signals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
  }, [symbol]);

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-slate-800">
          Signal Dashboard
        </h1>

        <SignalForm onSuccess={fetchSignals} />

        <div className="my-8">
          <input
            type="text"
            placeholder="Filter by Symbol (e.g. AAPL)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="
              w-full
              p-3
              rounded-lg
              border
              border-slate-300
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              bg-white
            "
          />
        </div>

        <SignalTable
          signals={signals}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;