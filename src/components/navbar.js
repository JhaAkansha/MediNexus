import "../App.css";
import React from 'react';
import {  Link } from "react-router-dom";
const Navbar= () =>{
  return (
    <ul className="NavButtons">
    <li>
      <Link to = '/home'>Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/services">Services</Link>
    </li>
    <li>
      <Link to="/calendar">Calendar</Link>
    </li>
    {/* <li>
      <Link to="/contact">Contact</Link>
    </li> */}
  </ul>
  );
}
export default Navbar;