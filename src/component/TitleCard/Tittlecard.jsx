import React, { useState, useEffect } from 'react'
import './tittlecard.css'

const API_KEY = '1b7c9ccd5605b5abd60c854187884c29'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

// Sample data for development/fallback
const SAMPLE_MOVIES = [
  {
    id: 1,
    title: "Stranger Things",
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    vote_average: 8.7,
    release_date: "2016-07-15"
  },
  {
    id: 2,
    title: "Wednesday",
    poster_path: "/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    vote_average: 8.8,
    release_date: "2022-11-23"
  },
  {
    id: 3,
    title: "The Witcher",
    poster_path: "/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
    vote_average: 8.2,
    release_date: "2019-12-20"
  }
]

const Tittlecard = ({ category = 'trending' }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjdjOWNjZDU2MDViNWFiZDYwYzg1NDE4Nzg4NGMyOSIsInN1YiI6IjY1M2E3OWM2YzhhNWFjMDEzOWYxZWM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z5KA_6E_QYnNjHPlCGm3V36JE1e5yQh7kWxk_WfeAGw`
          }
        }

        const url = `${BASE_URL}/trending/movie/day?language=en-US`
        const response = await fetch(url, options)
        
        if (!response.ok) {
          console.log('API response not ok, using sample data')
          setMovies(SAMPLE_MOVIES)
          setLoading(false)
          return
        }

        const data = await response.json()
        if (data.results && data.results.length > 0) {
          setMovies(data.results)
        } else {
          setMovies(SAMPLE_MOVIES)
        }
      } catch (error) {
        console.error('Error fetching movies:', error)
        setMovies(SAMPLE_MOVIES)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [category])

  const getCategoryTitle = () => {
    switch(category) {
      case 'trending':
        return 'Trending Now'
      case 'topRated':
        return 'Top Rated'
      case 'popular':
        return 'Popular on Netflix'
      default:
        return 'Trending Now'
    }
  }

  if (loading) {
    return <div className="movie-row loading">Loading...</div>
  }

  return (
    <div className="movie-row">
      <h2 className="row-title">{getCategoryTitle()}</h2>
      <div className="movies-slider">
        <button className="slider-arrow left">‹</button>
        <div className="movies-container">
          {movies && movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img 
                src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
                alt={movie.title || movie.name}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'
                }}
              />
              <div className="movie-info">
                <div className="movie-controls">
                  <button className="play-btn">▶</button>
                  <button className="add-btn">+</button>
                  <button className="like-btn">👍</button>
                </div>
                <h3>{movie.title || movie.name}</h3>
                <div className="movie-details">
                  <span className="rating">{movie.vote_average?.toFixed(1)}</span>
                  <span className="year">{(movie.release_date || movie.first_air_date)?.split('-')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-arrow right">›</button>
      </div>
    </div>
  )
}

export default Tittlecard
