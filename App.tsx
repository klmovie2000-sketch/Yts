
import React, { useState, useEffect, useMemo } from 'react';
import { Page, Movie, User } from './types';
import { INITIAL_MOVIES } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AdminDashboard from './components/AdminDashboard';
import LoginModal from './components/LoginModal';
import MovieDetails from './components/MovieDetails';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Load initial data with persistence
  useEffect(() => {
    const savedMovies = localStorage.getItem('yts_clone_movies');
    if (savedMovies) {
      try {
        setMovies(JSON.parse(savedMovies));
      } catch (e) {
        setMovies(INITIAL_MOVIES);
      }
    } else {
      setMovies(INITIAL_MOVIES);
      localStorage.setItem('yts_clone_movies', JSON.stringify(INITIAL_MOVIES));
    }

    const savedUser = localStorage.getItem('yts_clone_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const saveMovies = (newMovies: Movie[]) => {
    setMovies(newMovies);
    localStorage.setItem('yts_clone_movies', JSON.stringify(newMovies));
  };

  const handleLogin = (username: string) => {
    const newUser: User = { 
      username, 
      role: username.toLowerCase().includes('admin') ? 'admin' : 'guest' 
    };
    setUser(newUser);
    localStorage.setItem('yts_clone_user', JSON.stringify(newUser));
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('yts_clone_user');
    if (currentPage === 'admin') setCurrentPage('home');
  };

  const addMovie = (movie: Movie) => {
    const updatedMovies = [movie, ...movies];
    saveMovies(updatedMovies);
  };

  const deleteMovie = (id: string) => {
    const updatedMovies = movies.filter(m => m.id !== id);
    saveMovies(updatedMovies);
    // If the currently viewed movie is deleted, navigate home
    if (selectedMovie?.id === id) {
      setCurrentPage('home');
      setSelectedMovie(null);
    }
  };

  const navigateToMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentPage('details');
    window.scrollTo(0, 0);
  };

  const filteredMovies = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return movies;
    return movies.filter(m => 
      m.title.toLowerCase().includes(query) || 
      m.year.toString().includes(query) ||
      m.genres.some(g => g.toLowerCase().includes(query)) ||
      (m.cast && m.cast.some(c => c.toLowerCase().includes(query)))
    );
  }, [movies, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#1d1d1d] text-white selection:bg-[#6ac045] selection:text-black">
      <Header 
        user={user} 
        onLoginClick={() => setShowLoginModal(true)} 
        onLogoutClick={handleLogout}
        onNavigate={(page) => {
          setCurrentPage(page);
          if (page !== 'details') setSelectedMovie(null);
        }}
        currentPage={currentPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomeView 
            movies={filteredMovies} 
            onNavigate={setCurrentPage} 
            onMovieClick={navigateToMovie}
            isSearching={searchQuery.length > 0}
          />
        )}

        {currentPage === 'details' && selectedMovie && (
          <MovieDetails movie={selectedMovie} />
        )}
        
        {currentPage === 'admin' && user?.role === 'admin' && (
          <AdminDashboard 
            movies={movies} 
            onAddMovie={addMovie} 
            onDeleteMovie={deleteMovie}
          />
        )}
        
        {(currentPage === 'admin' && user?.role !== 'admin') && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center p-12 bg-[#171717] border border-[#2d2d2d] rounded-3xl shadow-2xl">
              <h2 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h2>
              <p className="text-gray-400">Restricted Area: Administrator credentials required.</p>
              <button 
                onClick={() => setCurrentPage('home')}
                className="mt-8 bg-[#6ac045] px-10 py-4 rounded-2xl text-black font-bold hover:bg-white transition-all transform hover:scale-105"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer onNavigate={setCurrentPage} />

      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLogin={handleLogin} 
        />
      )}
    </div>
  );
};

export default App;
