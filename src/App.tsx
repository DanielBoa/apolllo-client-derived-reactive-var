import "./styles.css";
import { useReactiveVar, makeVar } from "@apollo/client";
import { useMemo } from "react";

interface Item {
  name: string;
  price: number;
}

const global = {
  items: makeVar<Array<Item>>([
    { name: "GameBoy Pocket", price: 50 },
    { name: "GameBoy Advance", price: 30 }
  ])
};

const ItemList = () => {
  const items = useReactiveVar(global.items);

  return (
    <ul>
      {items.map(({ name, price }) => (
        <li key={name}>
          {name} - £{price}
        </li>
      ))}
    </ul>
  );
};

let timesCalculated = 0;
const useListTotal = () => {
  const items = useReactiveVar(global.items);

  return useMemo(() => {
    console.log("Calculated Total:", timesCalculated++);
    return items.reduce((a, b) => a + b.price, 0);
  }, [items]);
};

const ListSummary = () => {
  const total = useListTotal();

  return (
    <div>
      <span>Total: </span>
      <b>£{total}</b>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Items</h1>
      <ItemList />
      <ListSummary />
    </div>
  );
}
