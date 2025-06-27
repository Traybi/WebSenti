const { useState, useEffect } = React;

function App() {
  const [sentiments, setSentiments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [bouquet, setBouquet] = useState(null);

  useEffect(() => {
    fetch('/api/bouquets')
      .then(r => r.json())
      .then(data => setSentiments(data.map(b => b.sentiment)));
  }, []);

  const chooseSentiment = (s) => {
    setSelected(s);
    fetch(`/api/bouquets/${s}`)
      .then(r => r.json())
      .then(setBouquet);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-pink-700">Floralbir</h1>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {sentiments.map(s => (
          <button key={s} onClick={() => chooseSentiment(s)} className="bg-white border border-pink-200 rounded p-2 hover:bg-pink-100 capitalize">
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>
      {bouquet && (
        <div className="bg-white p-4 rounded shadow-md animate-fade-in">
          <h2 className="text-xl font-semibold mb-2">{bouquet.name}</h2>
          <p className="italic mb-2">{bouquet.description}</p>
          <p className="text-sm text-gray-600">Flores: {bouquet.flowers.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
