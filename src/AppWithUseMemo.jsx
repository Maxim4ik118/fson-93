import { useMemo, useState } from 'react';

export const AppWithUseMemo = ({ someProp }) => {
  const [planets, setPlanets] = useState(['Earth', 'Mars', 'Jupiter', 'Venus']);
  const [query, setQuery] = useState('');
  const [clicks, setClicks] = useState(0);

  const filteredPlanets = useMemo(() => planets.filter(planet => {
    for (let i = 0; i < 700_000_000; i++) {
      // Цей цикл спеціально сповільнить виконання коду
    }
    return planet.includes(query);
  }), [planets, query]);

  return (
    <div>
      <div>Some prop: {someProp}</div>
      <button onClick={() => setClicks(clicks + 1)}>
        Number of clicks: {clicks}
      </button>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div>
        {filteredPlanets.map(planet => (
          <div key={planet}>{planet}</div>
        ))}
      </div>
    </div>
  );
};
