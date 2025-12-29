import React from 'react';
import { Movie, Page } from '../types';
import { Star, Film, SearchX, Download } from 'lucide-react';

interface HomeViewProps {
  movies: Movie[];
  onNavigate: (page: Page) => void;
  onMovieClick: (movie: Movie) => void;
  isSearching: boolean;
}

const MovieCard: React.FC<{ movie: Movie; onClick: () => void }> = ({ movie, onClick }) => {
  return (
    <div className="group relative" onClick={onClick}>
      <div className="relative border-4 border-transparent group-hover:border-[#6ac045] rounded-lg transition-all duration-300 overflow-hidden cursor-pointer shadow-xl bg-[#171717] aspect-[2/3]">
        <img 
          src={movie.coverImage} 
          alt={movie.title} 
          className="w-full h-full object-cover rounded group-hover:opacity-30 group-hover:scale-105 transition-all duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://via.placeholder.com/210x315/111/fff?text=${encodeURIComponent(movie.title)}`;
          }}
        />
        
        <div className="absolute top-2 right-2 flex flex-col space-y-1 z-20">
          {movie.downloads.slice(0, 1).map(d => (
            <span key={d.quality} className="bg-black/90 text-[9px] px-1.5 py-0.5 rounded text-[#6ac045] font-bold border border-[#6ac045]/30 tracking-tighter shadow-xl">
              {d.quality}
            </span>
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-4 text-center z-10">
          <Star className="text-[#6ac045] fill-[#6ac045] mb-2 drop-shadow-lg" size={40} />
          <h4 className="text-2xl font-bold mb-1 drop-shadow-md">{movie.rating} / 10</h4>
          <div className="flex flex-wrap justify-center gap-1.5 mb-8">
            {movie.genres.slice(0, 2).map(g => (
              <span key={g} className="text-xs font-bold bg-[#6ac045]/20 text-[#6ac045] px-2 py-0.5 rounded-full border border-[#6ac045]/10">{g}</span>
            ))}
          </div>
          <div className="flex flex-col gap-2 w-full px-4">
            <button className="bg-[#6ac045] text-black font-bold py-2 px-6 rounded-xl text-[11px] hover:bg-white hover:scale-105 transition-all shadow-xl shadow-black/40 uppercase tracking-widest">
              View Details
            </button>
            <button className="bg-white/10 text-white font-bold py-2 px-6 rounded-xl text-[11px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest border border-white/10">
              <Download size={14} /> Download
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 px-1">
        <h3 className="font-bold text-sm truncate group-hover:text-[#6ac045] transition-colors cursor-pointer leading-tight">
          {movie.title}
        </h3>
        <p className="text-[11px] text-gray-500 font-bold mt-0.5 uppercase tracking-widest">{movie.year}</p>
      </div>
    </div>
  );
};

const HomeView: React.FC<HomeViewProps> = ({ movies, onNavigate, onMovieClick, isSearching }) => {
  return (
    <div className="bg-[#1d1d1d] animate-in fade-in duration-500">
      {!isSearching && (
        <div className="relative py-16 md:py-24 overflow-hidden border-b border-[#2d2d2d]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1d] via-[#1d1d1d]/90 to-transparent z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 blur-[2px]" 
            style={{ backgroundImage: 'url(https://picsum.photos/seed/yify-bg/1920/1080)' }}
          ></div>
          
          <div className="max-w-6xl mx-auto px-4 relative z-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Download YTS YIFY movies: <span className="text-[#6ac045]">HD smallest size</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              Welcome to the official YTS.LT website. Browse and download YIFY movies in excellent 720p, 1080p, 2160p 4K and 3D quality.
            </p>
            <div className="flex items-center justify-center gap-6 text-[#6ac045] font-bold text-sm uppercase tracking-widest">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#6ac045] rounded-full"></div> Small Files</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#6ac045] rounded-full"></div> HD Quality</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#6ac045] rounded-full"></div> Fast DL</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-10 border-b border-[#2d2d2d] pb-4">
          <h2 className="text-xl font-bold flex items-center space-x-3">
            <Film className="text-[#6ac045]" size={22} />
            <span className="tracking-tight italic">{isSearching ? `Search Results (${movies.length})` : 'Popular Downloads'}</span>
          </h2>
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-12">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-in zoom-in-95 duration-300">
            <div className="bg-[#2d2d2d] p-8 rounded-full mb-6">
              <SearchX size={64} className="text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No movies found</h3>
            <p className="text-gray-500 max-w-sm">We couldn't find any results matching your search query. Try searching for a different title, year, or genre.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeView;