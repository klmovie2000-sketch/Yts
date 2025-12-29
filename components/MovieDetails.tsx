import React, { useState } from 'react';
import { Movie, MovieDownload } from '../types';
import { Star, Download, Magnet, Check, Users, Globe, Clock, Activity, HardDrive, ShieldCheck, Users as PeersIcon, Play, ExternalLink, FileText, ChevronDown } from 'lucide-react';

interface MovieDetailsProps {
  movie: Movie;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyMagnet = (magnet: string, index: number) => {
    navigator.clipboard.writeText(magnet);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownloadTorrent = (dl: MovieDownload) => {
    if (dl.torrentFileData) {
      const link = document.createElement('a');
      link.href = dl.torrentFileData;
      link.download = `${movie.title.replace(/\s+/g, '_')}_${dl.quality}.torrent`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (dl.torrentUrl) {
      window.open(dl.torrentUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = dl.magnet;
    }
  };

  const handleWatchTrailer = () => {
    if (movie.trailerUrl) {
      window.open(movie.trailerUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title)}+official+trailer`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen pb-40 animate-in fade-in duration-1000">
      {/* Cinematic Backdrop */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
        <img 
          src={movie.backgroundImage || movie.coverImage} 
          className="w-full h-full object-cover blur-3xl opacity-20 scale-125 animate-pulse" 
          alt="" 
        />
        {/* Dynamic Scanline/Grid Overlay */}
        <div className="absolute inset-0 z-5 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(106, 192, 69, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(106, 192, 69, 0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-80 relative z-20">
        <div className="flex flex-col lg:flex-row gap-20 items-center lg:items-start">
          
          {/* Left: Premium Poster Column */}
          <div className="w-80 sm:w-[22rem] flex-shrink-0 animate-in slide-in-from-left-12 duration-1000">
             <div className="relative border-[12px] border-[#111] rounded-[4rem] shadow-[0_60px_120px_rgba(0,0,0,1)] overflow-hidden group transition-all duration-700 hover:scale-[1.04] hover:shadow-[#6ac045]/5">
                <img src={movie.coverImage} className="w-full h-auto transition-transform duration-700 group-hover:scale-110" alt={movie.title} />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col items-center justify-end pb-12">
                   <div className="bg-[#6ac045] text-black text-[11px] font-black px-6 py-2.5 rounded-full flex items-center gap-2.5 shadow-2xl uppercase tracking-[0.2em] animate-bounce">
                      <ShieldCheck size={16} strokeWidth={3} /> VERIFIED BY YTS
                   </div>
                </div>
             </div>
             
             <div className="mt-12 space-y-6">
                <button 
                  onClick={handleWatchTrailer}
                  className="w-full bg-white text-black font-black py-6 rounded-[2rem] flex items-center justify-center gap-4 transition-all hover:bg-[#6ac045] hover:shadow-[0_0_40px_rgba(106,192,69,0.4)] active:scale-95 group uppercase tracking-[0.25em] text-sm italic"
                >
                   <Play size={24} fill="currentColor" strokeWidth={0} /> Watch Trailer
                </button>
                <div className="grid grid-cols-2 gap-6">
                   <div className="bg-[#0f0f0f] border border-[#222] p-6 rounded-[2rem] text-center shadow-2xl hover:border-[#6ac045]/20 transition-all">
                      <div className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">IMDb RATING</div>
                      <div className="text-white font-black text-3xl italic leading-none">{movie.rating} <span className="text-xs text-gray-700">/ 10</span></div>
                   </div>
                   <div className="bg-[#0f0f0f] border border-[#222] p-6 rounded-[2rem] text-center shadow-2xl hover:border-[#6ac045]/20 transition-all">
                      <div className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">ENCODING</div>
                      <div className="text-[#6ac045] font-black text-sm italic tracking-[0.2em]">{movie.language.toUpperCase()}</div>
                   </div>
                </div>
             </div>
          </div>

          {/* Right: Detailed Content Area */}
          <div className="flex-grow pt-16 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <h1 className="text-7xl lg:text-[10rem] font-black mb-10 tracking-tighter italic text-white leading-[0.8] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mb-16">
              <span className="text-6xl font-black text-gray-800 italic select-none">{movie.year}</span>
              <span className="text-gray-900 text-6xl font-thin select-none">/</span>
              <div className="flex items-center gap-5 bg-[#0f0f0f] px-10 py-4 rounded-[2rem] border border-white/5 shadow-2xl">
                 <Star size={32} className="text-[#6ac045] fill-[#6ac045]" />
                 <span className="font-black text-4xl text-white italic">{movie.rating}</span>
              </div>
              <div className="flex items-center gap-4 bg-white/[0.01] px-8 py-4 rounded-[2rem] border border-white/5">
                 <Clock size={20} className="text-gray-700" />
                 <span className="text-[12px] font-black text-gray-600 uppercase tracking-[0.4em]">{movie.dateAdded}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-20">
               {movie.genres.map(g => (
                 <span key={g} className="bg-[#6ac045]/5 text-[#6ac045] text-[12px] font-black uppercase tracking-[0.25em] border border-[#6ac045]/10 px-10 py-3 rounded-full transition-all hover:bg-[#6ac045] hover:text-black cursor-default hover:scale-110">
                   {g}
                 </span>
               ))}
            </div>

            {/* DOWNLOAD UI - TOTALLY ULTRA VERTICAL CARDS */}
            <div className="mb-24">
               <div className="flex items-center justify-between mb-12">
                 <h3 className="text-[13px] font-black text-gray-600 uppercase tracking-[0.8em] flex items-center gap-6">
                   <div className="h-[2px] w-24 bg-[#6ac045]"></div>
                   ULTRA RELEASES
                 </h3>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
                 {movie.downloads.map((dl, i) => {
                    const hasFile = !!(dl.torrentFileData || dl.torrentUrl);
                    
                    return (
                    <div key={i} className="group bg-[#0d0d0d] border-2 border-[#1a1a1a] rounded-[4rem] p-12 transition-all duration-700 hover:border-[#6ac045]/80 hover:bg-[#111] hover:shadow-[0_0_120px_rgba(106,192,69,0.15)] text-center flex flex-col items-center relative overflow-hidden">
                        {/* Interactive Sparkle Effect */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#6ac045]/10 blur-[80px] rounded-full group-hover:bg-[#6ac045]/20 transition-all duration-700"></div>
                        
                        {/* Quality Section */}
                        <div className="mb-10 relative z-10">
                           <div className="text-[#6ac045] font-black text-[6.5rem] leading-none italic group-hover:scale-110 transition-transform duration-700 tracking-tighter drop-shadow-[0_0_30px_rgba(106,192,69,0.3)]">{dl.quality}</div>
                           <div className="text-gray-600 text-[12px] font-black uppercase tracking-[0.5em] mt-3 italic">{dl.type} RELEASE</div>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#222] to-transparent my-10"></div>

                        {/* Ultra Metadata Grid */}
                        <div className="w-full space-y-8 mb-12 relative z-10">
                           <div className="flex items-center justify-between px-4 group/item">
                              <div className="flex items-center gap-4">
                                 <div className="p-2 bg-white/5 rounded-lg group-hover/item:bg-white/10 transition-all">
                                    <HardDrive size={18} className="text-gray-600 group-hover/item:text-[#6ac045]" />
                                 </div>
                                 <span className="text-[11px] font-black text-gray-600 uppercase tracking-[0.2em] group-hover/item:text-gray-400">Total Size</span>
                              </div>
                              <span className="text-white font-black italic text-lg">{dl.size || "1.4 GB"}</span>
                           </div>
                           <div className="flex items-center justify-between px-4 group/item">
                              <div className="flex items-center gap-4">
                                 <div className="p-2 bg-[#6ac045]/5 rounded-lg group-hover/item:bg-[#6ac045]/20 transition-all">
                                    <Activity size={18} className="text-[#6ac045]" />
                                 </div>
                                 <span className="text-[11px] font-black text-gray-600 uppercase tracking-[0.2em] group-hover/item:text-gray-400">Active Seeds</span>
                              </div>
                              <span className="text-[#6ac045] font-black italic text-lg">{dl.seeds || "350"}</span>
                           </div>
                           <div className="flex items-center justify-between px-4 group/item">
                              <div className="flex items-center gap-4">
                                 <div className="p-2 bg-blue-600/5 rounded-lg group-hover/item:bg-blue-600/20 transition-all">
                                    <PeersIcon size={18} className="text-blue-500" />
                                 </div>
                                 <span className="text-[11px] font-black text-gray-600 uppercase tracking-[0.2em] group-hover/item:text-gray-400">Total Peers</span>
                              </div>
                              <span className="text-blue-500 font-black italic text-lg">{dl.peers || "82"}</span>
                           </div>
                        </div>

                        {/* Ultra Control Panel (Buttons) */}
                        <div className="flex items-center gap-6 mt-auto relative z-10">
                           <button 
                             onClick={() => handleDownloadTorrent(dl)} 
                             className={`w-24 h-24 rounded-[2rem] transition-all duration-500 transform active:scale-90 flex items-center justify-center shadow-3xl ${hasFile ? 'bg-[#1a1a1a] text-[#6ac045] hover:bg-white hover:text-black border-2 border-[#222] hover:border-white' : 'bg-[#0a0a0a] text-gray-800 cursor-not-allowed border-2 border-transparent'}`}
                             title={hasFile ? "Download Ultra .torrent" : "File Not Available"}
                           >
                              {hasFile ? <Download size={40} strokeWidth={3} /> : <Download size={40} />}
                           </button>

                           <button 
                             onClick={() => copyMagnet(dl.magnet, i)} 
                             className={`w-24 h-24 rounded-[2rem] transition-all duration-500 transform active:scale-90 border-2 flex items-center justify-center shadow-3xl relative group/mag ${copiedIndex === i ? 'bg-[#6ac045] border-[#6ac045] text-black shadow-[0_0_50px_rgba(106,192,69,0.3)]' : 'bg-[#1a1a1a] border-[#222] text-white hover:bg-[#252525] hover:border-[#6ac045]/40'}`}
                             title="Copy Magnet link"
                           >
                              {copiedIndex === i ? <Check size={40} strokeWidth={4} /> : <Magnet size={40} strokeWidth={3} />}
                              {copiedIndex === i && (
                                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#6ac045] text-black text-[11px] font-black px-6 py-2.5 rounded-full animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-2xl whitespace-nowrap uppercase tracking-[0.2em]">
                                  LINK COPIED!
                                </div>
                              )}
                           </button>
                        </div>
                    </div>
                    );
                 })}
               </div>
            </div>

            {/* Storyline Ultra Card */}
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-20 rounded-[5rem] mb-16 text-left shadow-[0_80px_160px_rgba(0,0,0,0.8)] relative overflow-hidden group/card">
               <div className="absolute -top-20 -right-20 p-12 opacity-[0.02] group-hover/card:opacity-[0.05] group-hover/card:scale-110 transition-all duration-1000 pointer-events-none">
                  <Globe size={500} strokeWidth={1} />
               </div>
               
               <h3 className="text-4xl font-black mb-16 flex items-center gap-8 text-white italic tracking-tighter uppercase">
                 <div className="w-24 h-24 bg-[#6ac045] rounded-[2rem] shadow-[0_0_60px_rgba(106,192,69,0.5)] flex items-center justify-center animate-pulse">
                    <Globe className="text-black" size={44} strokeWidth={3} />
                 </div>
                 The Storyline
               </h3>
               
               <p className="text-gray-400 leading-[2.4] text-3xl font-medium max-w-5xl relative z-10 drop-shadow-2xl italic tracking-tight font-sans">
                  {movie.description || "The definitive ultra-encode of this cinematic production is now available for global distribution. Optimized for extreme high-fidelity playback with prioritized peer-to-peer routing via the YTS network."}
               </p>
               
               {movie.cast && movie.cast.length > 0 && (
                 <div className="mt-24 pt-24 border-t border-[#1a1a1a] relative z-10">
                    <h3 className="text-3xl font-black mb-16 flex items-center gap-8 text-white italic tracking-tighter uppercase">
                      <div className="w-20 h-20 bg-blue-600 rounded-[1.5rem] shadow-[0_0_60px_rgba(37,99,235,0.4)] flex items-center justify-center">
                        <Users className="text-black" size={36} strokeWidth={3} />
                      </div>
                      Starring Cast
                    </h3>
                    <div className="flex flex-wrap gap-6">
                       {movie.cast.map(actor => (
                         <div key={actor} className="bg-[#151515] px-14 py-8 rounded-[3rem] text-base font-black text-gray-600 border border-white/5 hover:border-[#6ac045] transition-all cursor-default shadow-2xl hover:text-white hover:bg-black group/actor relative overflow-hidden">
                           <div className="relative z-10 uppercase tracking-[0.3em]">{actor}</div>
                           <div className="absolute inset-0 bg-gradient-to-r from-[#6ac045]/10 to-transparent opacity-0 group-hover/actor:opacity-100 transition-opacity"></div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               <div className="mt-24 pt-16 border-t border-[#1a1a1a] flex flex-wrap gap-16 opacity-30 hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.5em] cursor-pointer hover:text-[#6ac045] transition-colors group/link">
                     <ExternalLink size={20} className="group-hover/link:rotate-45 transition-transform" /> IMDb Master Page
                  </div>
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.5em] cursor-pointer hover:text-[#6ac045] transition-colors group/link">
                     <ExternalLink size={20} className="group-hover/link:rotate-45 transition-transform" /> Official Source
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;