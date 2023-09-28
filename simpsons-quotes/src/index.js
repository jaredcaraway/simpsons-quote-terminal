import React from 'react';
import ReactDOM from 'react-dom/client';
import Desktop from './components/Desktop';

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

function App() {
    return <Desktop />;
};

root.render(<App />);