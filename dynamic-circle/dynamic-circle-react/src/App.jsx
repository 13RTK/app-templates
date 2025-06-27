import { useState } from 'react';
import './index.css';

function App() {
  const [isPurple, setIsPurple] = useState('');
  const [textColor, setTextColor] = useState('');

  const [size, setSize] = useState(150);
  const [rotate, setRotate] = useState(0);

  const circleStyle = {
    height: `${size}px`,
    width: `${size}px`,
    lineHeight: `${size}px`,

    transform: `rotate(${rotate}deg)`,
  };

  return (
    <main>
      <label>
        Purple
        <input
          type="checkbox"
          value={isPurple}
          onChange={() => setIsPurple(!isPurple)}
        />
      </label>

      <label>
        text color
        <select
          onChange={(event) => setTextColor(event.target.value)}
          value={textColor}
        >
          <option value="" selected>
            White
          </option>
          <option value="text-black">Black</option>
          <option value="text-orange">Orange</option>
        </select>
      </label>

      <label>
        Circle Size
        <input
          type="number"
          value={size}
          onChange={(event) => setSize(event.target.value)}
        />
      </label>

      <label>
        Circle Rotate
        <input
          type="number"
          value={rotate}
          onChange={(event) => setRotate(event.target.value)}
        />
      </label>
      <div
        className={`circle ${isPurple ? 'purple' : ''} ${textColor}`}
        style={circleStyle}
      >
        Hi!
      </div>
    </main>
  );
}

export default App;
