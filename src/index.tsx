import React, { useState } from "react";
import * as ReactDOM from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}

const element = document.getElementById("app");

if (element) {
  ReactDOM.createRoot(element).render(<App/>);
}
