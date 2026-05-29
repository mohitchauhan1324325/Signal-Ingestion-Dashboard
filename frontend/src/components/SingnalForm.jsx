import { useState } from "react";
import api from "../api";

export default function SignalForm({ onSuccess }) {
  const [form, setForm] = useState({
    id: "",
    symbol: "",
    action: "BUY",
    price: "",
    timestamp: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await api.post("/signals", {
        ...form,
        price: Number(form.price),
      });

      onSuccess();

      setForm({
        id: "",
        symbol: "",
        action: "BUY",
        price: "",
        timestamp: "",
      });
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="ID"
          value={form.id}
          onChange={(e) =>
            setForm({ ...form, id: e.target.value })
          }
        />

        <input
          placeholder="Symbol"
          value={form.symbol}
          onChange={(e) =>
            setForm({ ...form, symbol: e.target.value })
          }
        />

        <select
          value={form.action}
          onChange={(e) =>
            setForm({ ...form, action: e.target.value })
          }
        >
          <option>BUY</option>
          <option>SELL</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          type="datetime-local"
          value={form.timestamp}
          onChange={(e) =>
            setForm({ ...form, timestamp: e.target.value })
          }
        />

        <button type="submit">
          Submit
        </button>
      </form>

      {error && <p>{error}</p>}
    </>
  );
}