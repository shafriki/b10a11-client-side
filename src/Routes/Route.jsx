import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Marathons from "../Pages/Marathons/Marathons";
import AddMarathons from "../Pages/AddMarathons/AddMarathons";
import MyMarathons from "../Pages/MyMarathons/MyMarathons";
import MyApply from "../Pages/MyApply/MyApply";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <h1>error page</h1>,
        children: [
            {
                index: true, 
                element: <Home></Home>,
            },
            {
                path: '/home',
                element: <Home></Home>,
            },
            {
                path: '/marathons',
                element: <Marathons></Marathons>,
            },
            {
                path: 'add-marathons',
                element: <AddMarathons></AddMarathons>,
            },
            {
                path: 'my-marathons',
                element: <MyMarathons></MyMarathons>,
            },
            {
                path: '/my-apply',
                element: <MyApply></MyApply>,
            },
            {
                path:'/login',
                element:<Login></Login>,
            },
            {
                path:'/register',
                element:<Register></Register>
            },
        ]
    }
])

export default router;