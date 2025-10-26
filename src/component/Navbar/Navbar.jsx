import React from 'react'
import './navbar.css'
import profile from '../../assets/profile.png'
import search from '../../assets/search.png'
import scrollDown from '../../assets/scroll-down.svg'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Netflix Logo" className="logo" />
        <ul className="nav-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#tvshows">TV Shows</a></li>
          <li><a href="#movies">Movies</a></li>
          <li><a href="#new">New & Popular</a></li>
          <li><a href="#mylist">My List</a></li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="search">
          <img className ="search-btn"src= {search} alt="" />
        </div>
        <div className="profile">
          <img src={profile} alt="Profile" className="profile-img" />
          <img src={scrollDown} alt="Scroll down" className="scroll-down" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
