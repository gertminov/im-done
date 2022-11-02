import './App.css'
import {Outlet} from "react-router-dom";


function App() {

    return (
        <div className="App h-full grid place-items-center w-full">
            <Outlet/>
        </div>
    )
}

export default App
