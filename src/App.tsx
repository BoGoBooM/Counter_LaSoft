import { useContext, useEffect, useReducer } from 'react'
import './App.css'
import { products } from './data/data';
import { ThemeContext } from './components/ThemeContext.tsx'

type State = Record<number, number>;

type Action =
  | { type: 'add', id: number }
  | { type: 'subtract', id: number }
  | { type: 'clear', id: number };

function App() {
  const initialState: Record<number, number> = products.reduce((acc, item) => {
    acc[item.id] = 0;

    return acc;
  }, {} as Record<number, number>);

  const [quantities, dispatch] = useReducer(reducer, initialState);
  const { theme, toggleTheme } = useContext(ThemeContext);

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case 'add':
        return {
          ...state,
          [action.id]: state[action.id] + 1
        }
      case 'subtract':
        return {
          ...state,
          [action.id]: Math.max(0, state[action.id] - 1)
        }
      case 'clear':
        return {
          ...state,
          [action.id]: 0
        }
      default:
        throw new Error();
    }
  }

  const total = products.reduce((acc, item) => acc + item.price * quantities[item.id], 0)

  useEffect(() => {
    document.body.style.background = theme.background;
  }, [theme]);

  return (
    <div className="App">
      <button
        onClick={toggleTheme}
        className="App_button App__button--theme"
        style={{ background: theme.button, color: theme.buttonText }}
      >
        Toggle Theme
      </button>
      <ul className="App__list">
        {products.map((item) => (
          <li
            className="App__item"
            key={item.id}
            style={{ background: theme.cardBG }}
          >
            <div className="App__order">
              <h1
                className="App__name"
                style={{ color: theme.textThird }}
              >
                Product: {item.name}
              </h1>
              <span className="App__prive">Price: {item.price}</span>

              <div className="App_counter">
                <span
                  className="App__quantity"
                  style={{ color: theme.textSecond }}
                >
                  Quantity:
                </span>
                <button
                  className="App_button"
                  onClick={() => dispatch({ type: 'subtract', id: item.id })}
                  style={{ background: theme.button, color: theme.buttonText }}
                >
                  -
                </button>

                <span
                  className="App_quantity"
                  style={{ color: theme.textSecond }}
                >
                  {quantities[item.id]}
                </span>

                <button
                  className="App_button"
                  onClick={() => dispatch({ type: 'add', id: item.id })}
                  style={{ background: theme.button, color: theme.buttonText }}
                >
                  +
                </button>

                <button
                  className="App_button"
                  onClick={() => dispatch({ type: 'clear', id: item.id })}
                  style={{ background: theme.button, color: theme.buttonText }}
                >
                  Clear
                </button>
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
