import { useEffect, useState } from "react";
import api from "./api";
import SignalForm from "./components/SingnalForm.jsx";
import SignalTable from "./components/SingnalTable.jsx";

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
    } catch {
      setError("Failed to fetch signals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
  }, [symbol]);

  return (
    <div>
      <h1>Signal Dashboard</h1>

      <SignalForm onSuccess={fetchSignals} />

      <br />

      <input
        placeholder="Filter Symbol"
        value={symbol}
        onChange={(e) =>
          setSymbol(e.target.value)
        }
      />

      <br />
      <br />

      <SignalTable
        signals={signals}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;