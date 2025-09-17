import { useState } from 'react'
import './App.css'
import { products } from './data/data';

function App() {
  const [quantities, setQuantities] = useState<Record<number, number>>(
    products.reduce((acc, item) => {
      acc[item.id] = 0;

      return acc;
    }, {} as Record<number, number>)
  );

  const add = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  const subtract = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] - 1)
    }));
  };

  const clear = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: 0
    }));
  }

  const total = products.reduce((acc, item) => acc + item.price * quantities[item.id], 0)

  return (
    <div className="App">
      <ul className="App__list">
        {products.map((item) => (
          <li className="App__item" key={item.id}>
            <div className="App__order">
              <h1 className="App__name">Product: {item.name}</h1>
              <span className="App__prive">Price: {item.price}</span>

              <div className="App_counter">
                <span className="App__quantity">Quantity:</span>
                <button className="App_button" onClick={() => subtract(item.id)}>-</button>

                <span className="App_quantity">{quantities[item.id]}</span>

                <button className="App_button" onClick={() => add(item.id)}>+</button>
                <button className="App_button" onClick={() => clear(item.id)}>Clear</button>
              </div>
            </div>
          </li>
        ))}
      </ul>


      <span className="App__total">
        Total price: {total}
      </span>
    </div>
  )
}

export default App
