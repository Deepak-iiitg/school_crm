import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Class from './AddClass';
import Teacher from './AddTeacher';
import Student from './AddStudent';
import Layout from "./Layout";
import Home from "./Classes";

function Router(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/class' element={<Class/>}></Route>
                <Route path='/student' element={<Student/>}></Route>
                <Route path='/teacher' element={<Teacher/>}></Route>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}
export default Router;