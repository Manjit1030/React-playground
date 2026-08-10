import { useState } from 'react';
import Button from './Button.jsx';

function Counter() {
  // useState stores the current counter value and gives us a function to update it.
  const [count, setCount] = useState(0);

  // These handlers update state. When state changes, React re-renders the component.
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <main className="app-shell">
      <section className="counter" aria-labelledby="counter-title">
        <h1 className="counter__title" id="counter-title">
          Counter App
        </h1>

        <div className="counter__value" aria-live="polite">
          {count}
        </div>

        <div className="counter__actions">
          <Button label="Increment" variant="increment" onClick={increment} />
          <Button label="Decrement" variant="decrement" onClick={decrement} />
          <Button label="Reset" variant="reset" onClick={reset} />
        </div>
      </section>
    </main>
  );
}

export default Counter;
