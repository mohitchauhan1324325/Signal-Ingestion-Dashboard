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
      setError(
        err.response?.data?.detail ||
        "Failed to submit signal"
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">
        Submit Signal
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Signal ID"
          value={form.id}
          onChange={(e) =>
            setForm({ ...form, id: e.target.value })
          }
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          placeholder="Symbol"
          value={form.symbol}
          onChange={(e) =>
            setForm({
              ...form,
              symbol: e.target.value.toUpperCase(),
            })
          }
          className="p-3 border rounded-lg"
          required
        />

        <select
          value={form.action}
          onChange={(e) =>
            setForm({ ...form, action: e.target.value })
          }
          className="p-3 border rounded-lg"
        >
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="datetime-local"
          value={form.timestamp}
          onChange={(e) =>
            setForm({
              ...form,
              timestamp: e.target.value,
            })
          }
          className="p-3 border rounded-lg md:col-span-2"
          required
        />

        <button
          type="submit"
          className="
            md:col-span-2
            bg-blue-600
            text-white
            py-3
            rounded-lg
            hover:bg-blue-700
            transition
          "
        >
          Submit Signal
        </button>
      </form>

      {error && (
        <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}