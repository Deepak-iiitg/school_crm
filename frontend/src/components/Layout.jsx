import React from 'react';
import { Outlet,Link } from 'react-router-dom';
function Layout(){
    return(
        <>
        <ul>
        <li>
            <Link to='/home'>Home</Link>
        </li>
          <li>
            <Link to="/class">AddClass</Link>
          </li>
          <li>
            <Link to="/student">AddStudent</Link>
          </li>
          <li>
            <Link to="/teacher">AddTeacher</Link>
          </li>
        </ul>
        <Outlet />
        </>
    )
}
export default Layout;