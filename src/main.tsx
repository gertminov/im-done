import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./Login";
import SelectName from "./SelectName";
import MainStudent from "./MainStudent";
import Createroom from "./Createroom";
import MainTeacher from "./MainTeacher";
import {initPusher} from "./pusher";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Login/>
            },
            {
                path: 'createuser',
                element: <SelectName/>
            },
            {
                path: "mainstudent",
                element: <MainStudent/>
            },
            {
                path: "createroom",
                element: <Createroom/>
            },
            {
                path: "mainteacher",
                element: <MainTeacher/>
            }

        ]
    }
])

initPusher()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
