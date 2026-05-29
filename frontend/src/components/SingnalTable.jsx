export default function SignalTable({
  signals,
  loading,
  error,
}) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (signals.length === 0) {
    return <p>No signals found</p>;
  }

  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Symbol</th>
          <th>Action</th>
          <th>Price</th>
          <th>Timestamp</th>
        </tr>
      </thead>

      <tbody>
        {signals.map((signal) => (
          <tr key={signal.id}>
            <td>{signal.id}</td>
            <td>{signal.symbol}</td>
            <td>{signal.action}</td>
            <td>{signal.price}</td>
            <td>{signal.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}