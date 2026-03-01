import ToDoList from './ToDoList.tsx';


function App(){

    return (<ToDoList/>);

}

export default App





























/*// 1. Dışarıdaki dosya (Makyaj ayrı yerde)
import './App.css'
import { useState } from "react";

function App() {
    // --- BURASI SENİN "BACKEND" (MANTIK) KISMIN ---
    const [counter, setCounter] = useState<number>(0);

    const handleIncrement = () => {
        setCounter(counter + 1);
    };

    const handleReset = () => setCounter(0);

    // --- BURASI SENİN "FRONTEND" (GÖRÜNÜM) KISMIN ---
    return (
        <div className="container">
            <h1>Sayaç: {counter}</h1>
            <button onClick={handleIncrement}>Arttır</button>
            <button onClick={handleReset}>Sıfırla</button>
        </div>
    );
}

export default App;





 */