export default function SignalTable({
  signals,
  loading,
  error,
}) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-xl">
        {error}
      </div>
    );
  }

  if (signals.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        No signals found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Symbol</th>
            <th className="p-4 text-left">Action</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {signals.map((signal) => (
            <tr
              key={signal.id}
              className="border-b hover:bg-slate-50"
            >
              <td className="p-4">{signal.id}</td>

              <td className="p-4 font-medium">
                {signal.symbol}
              </td>

              <td
                className={`p-4 font-semibold ${
                  signal.action === "BUY"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {signal.action}
              </td>

              <td className="p-4">
                ${signal.price}
              </td>

              <td className="p-4">
                {new Date(
                  signal.timestamp
                ).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}