import React, { useState } from 'react';
import { Movie, MovieDownload } from '../types';
import { Upload, Plus, Trash2, Film, BarChart3, Image as ImageIcon, File, PlusCircle, X, Users, Loader2, Info, Activity, Users2, PlayCircle, Link as LinkIcon, Sparkles } from 'lucide-react';
import { GENRES, QUALITIES } from '../constants';

interface AdminDashboardProps {
  movies: Movie[];
  onAddMovie: (movie: Movie) => void;
  onDeleteMovie: (id: string) => void;
}

interface MovieDownloadForm extends Partial<MovieDownload> {
  fileName?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ movies, onAddMovie, onDeleteMovie }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [movieDownloads, setMovieDownloads] = useState<MovieDownloadForm[]>([
    { quality: '1080p', magnet: '', size: '1.5 GB', type: 'WEB', seeds: 150, peers: 20, fileName: '', torrentUrl: '' }
  ]);
  const [coverBase64, setCoverBase64] = useState<string>('');
  const [bgBase64, setBgBase64] = useState<string>('');
  const [castInput, setCastInput] = useState<string>('');
  const [newMovie, setNewMovie] = useState<Partial<Movie>>({
    title: '',
    year: new Date().getFullYear(),
    rating: 7.0,
    genres: [],
    language: 'English',
    description: '',
    trailerUrl: ''
  });

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleTorrentUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      const updated = [...movieDownloads];
      updated[index] = { ...updated[index], fileName: file.name, torrentFileData: base64 };
      setMovieDownloads(updated);
    }
  };

  const handleImageUpload = async (type: 'cover' | 'background', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      if (type === 'cover') setCoverBase64(base64);
      else setBgBase64(base64);
    }
  };

  const addDownloadField = () => {
    setMovieDownloads([...movieDownloads, { quality: '720p', magnet: '', size: '800 MB', type: 'WEB', seeds: 50, peers: 5, fileName: '', torrentUrl: '' }]);
  };

  const removeDownloadField = (index: number) => {
    setMovieDownloads(movieDownloads.filter((_, i) => i !== index));
  };

  const updateDownloadField = (index: number, field: keyof MovieDownloadForm, value: string | number) => {
    const updated = [...movieDownloads];
    updated[index] = { ...updated[index], [field]: value };
    setMovieDownloads(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMovie.title || !coverBase64) {
      alert('Movie Title and Cover Poster are mandatory for Ultra Releases.');
      return;
    }

    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate intensive processing

    const validDownloads: MovieDownload[] = movieDownloads.map(d => ({
      quality: d.quality || '1080p',
      magnet: d.magnet || 'magnet:?xt=urn:btih:mock',
      size: d.size || '1.5 GB',
      type: d.type || 'WEB',
      seeds: Number(d.seeds) || 10,
      peers: Number(d.peers) || 5,
      torrentFileData: d.torrentFileData,
      torrentUrl: d.torrentUrl
    }));

    const movie: Movie = {
      id: Date.now().toString(),
      title: newMovie.title!,
      year: Number(newMovie.year),
      rating: Number(newMovie.rating),
      genres: newMovie.genres || [],
      cast: castInput.split(',').map(s => s.trim()).filter(s => s !== ''),
      coverImage: coverBase64,
      backgroundImage: bgBase64 || coverBase64,
      downloads: validDownloads,
      language: newMovie.language || 'English',
      description: newMovie.description || '',
      dateAdded: new Date().toISOString().split('T')[0],
      trailerUrl: newMovie.trailerUrl
    };

    onAddMovie(movie);
    setIsUploading(false);
    setActiveTab('manage');
    
    // Reset Form
    setNewMovie({ title: '', year: new Date().getFullYear(), rating: 7.0, genres: [], language: 'English', description: '', trailerUrl: '' });
    setCoverBase64('');
    setBgBase64('');
    setCastInput('');
    setMovieDownloads([{ quality: '1080p', magnet: '', size: '1.5 GB', type: 'WEB', seeds: 150, peers: 20, fileName: '', torrentUrl: '' }]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('DANGER: This action permanently removes this Ultra release from the global index. Continue?')) return;
    setDeletingId(id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onDeleteMovie(id);
    setDeletingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
      {/* Side Navigation */}
      <aside className="w-full lg:w-80 flex-shrink-0">
        <div className="bg-[#111] rounded-[3rem] border border-[#222] overflow-hidden sticky top-28 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
          <div className="p-8 bg-[#181818] border-b border-[#222]">
            <h3 className="font-black text-2xl text-[#6ac045] flex items-center gap-4 italic tracking-tighter">
              <BarChart3 size={28} className="animate-pulse" /> ULTRA HUB
            </h3>
          </div>
          <nav className="p-6 flex flex-col space-y-4">
            <button 
              onClick={() => setActiveTab('upload')} 
              className={`flex items-center space-x-5 px-8 py-5 rounded-[2rem] transition-all duration-500 ${activeTab === 'upload' ? 'bg-[#6ac045] text-black font-black shadow-[0_15px_40px_rgba(106,192,69,0.3)]' : 'text-gray-500 hover:bg-white/5'}`}
            >
              <Upload size={22} /> <span className="uppercase text-[11px] tracking-[0.3em]">NEW RELEASE</span>
            </button>
            <button 
              onClick={() => setActiveTab('manage')} 
              className={`flex items-center space-x-5 px-8 py-5 rounded-[2rem] transition-all duration-500 ${activeTab === 'manage' ? 'bg-[#6ac045] text-black font-black shadow-[0_15px_40px_rgba(106,192,69,0.3)]' : 'text-gray-500 hover:bg-white/5'}`}
            >
              <Film size={22} /> <span className="uppercase text-[11px] tracking-[0.3em]">MANAGE ({movies.length})</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow">
        {activeTab === 'upload' && (
          <form onSubmit={handleSubmit} className="bg-[#111] border border-[#222] rounded-[4rem] shadow-[0_80px_160px_rgba(0,0,0,0.7)] overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="p-10 bg-[#181818] border-b border-[#222] flex items-center justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-black flex items-center gap-4 italic text-white tracking-tighter">
                  <PlusCircle className="text-[#6ac045]" size={36} /> 
                  GENERATE ULTRA RELEASE
                </h2>
                <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.5em] mt-2 ml-12">High-Fidelity . Optimized Enqueue . Global Reach</p>
              </div>
              <Sparkles className="text-[#6ac045]/10 absolute -right-4 top-0" size={120} />
            </div>
            
            <div className="p-12 space-y-16">
              {/* Basic Info */}
              <div className="space-y-10">
                 <div className="flex items-center gap-4 text-gray-500">
                    <Info size={18} className="text-[#6ac045]" />
                    <span className="text-[12px] font-black uppercase tracking-[0.4em]">Metadata Definition</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-8">
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-gray-600 mb-3 ml-2">Movie Title</label>
                        <input required type="text" className="w-full bg-[#1a1a1a] border border-[#222] focus:border-[#6ac045] rounded-[1.5rem] px-6 py-5 outline-none transition-all text-white font-bold placeholder:opacity-20" value={newMovie.title} onChange={e => setNewMovie({...newMovie, title: e.target.value})} placeholder="Master Title Name" />
                      </div>
                      <div className="flex gap-6">
                        <div className="flex-1">
                          <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-gray-600 mb-3 ml-2">Year</label>
                          <input type="number" className="w-full bg-[#1a1a1a] border border-[#222] focus:border-[#6ac045] rounded-[1.5rem] px-6 py-5 outline-none text-white font-black italic" value={newMovie.year} onChange={e => setNewMovie({...newMovie, year: parseInt(e.target.value)})} />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-gray-600 mb-3 ml-2">IMDb</label>
                          <input type="number" step="0.1" className="w-full bg-[#1a1a1a] border border-[#222] focus:border-[#6ac045] rounded-[1.5rem] px-6 py-5 outline-none text-[#6ac045] font-black italic" value={newMovie.rating} onChange={e => setNewMovie({...newMovie, rating: parseFloat(e.target.value)})} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-gray-600 mb-3 ml-2">Trailer URL</label>
                        <div className="relative">
                           <PlayCircle size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                           <input type="url" className="w-full bg-[#1a1a1a] border border-[#222] focus:border-[#6ac045] rounded-[1.5rem] pl-14 pr-6 py-5 outline-none transition-all text-white font-bold" value={newMovie.trailerUrl} onChange={e => setNewMovie({...newMovie, trailerUrl: e.target.value})} placeholder="YouTube Direct Link" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-gray-600 mb-3 ml-2">Select Genres</label>
                        <div className="flex flex-wrap gap-2.5 bg-[#0a0a0a] p-5 rounded-[2rem] border border-[#222]">
                          {GENRES.slice(0, 15).map(genre => (
                            <button
                              key={genre}
                              type="button"
                              onClick={() => {
                                const current = newMovie.genres || [];
                                const next = current.includes(genre) ? current.filter(g => g !== genre) : [...current, genre];
                                setNewMovie({...newMovie, genres: next});
                              }}
                              className={`text-[10px] font-black px-4 py-2 rounded-xl border-2 transition-all ${newMovie.genres?.includes(genre) ? 'bg-[#6ac045] text-black border-[#6ac045] scale-105' : 'bg-black/40 text-gray-600 border-white/5 hover:border-white/10'}`}
                            >
                              {genre.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-gray-600 mb-3 ml-2">Cast Listing</label>
                        <input type="text" className="w-full bg-[#1a1a1a] border border-[#222] focus:border-[#6ac045] rounded-[1.5rem] px-6 py-5 outline-none transition-all text-white font-bold" placeholder="Actor 1, Actor 2, Actor 3..." value={castInput} onChange={e => setCastInput(e.target.value)} />
                      </div>
                    </div>
                 </div>
              </div>

              {/* Visual Assets */}
              <div className="space-y-10">
                 <div className="flex items-center gap-4 text-gray-500">
                    <ImageIcon size={18} className="text-[#6ac045]" />
                    <span className="text-[12px] font-black uppercase tracking-[0.4em]">Visual Packaging</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <label className={`relative h-80 rounded-[3rem] border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group ${coverBase64 ? 'border-[#6ac045]' : 'border-[#222] hover:border-[#6ac045]/50'}`}>
                       <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload('cover', e)} />
                       {coverBase64 ? (
                         <>
                           <img src={coverBase64} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm"><Upload className="text-[#6ac045]" size={40} /></div>
                         </>
                       ) : (
                         <div className="text-center group-hover:scale-110 transition-transform">
                            <ImageIcon size={60} className="mx-auto text-[#222] mb-4" />
                            <span className="text-[11px] font-black text-gray-600 uppercase tracking-[0.3em]">UPLOAD POSTER</span>
                         </div>
                       )}
                    </label>
                    <label className={`relative h-80 rounded-[3rem] border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group ${bgBase64 ? 'border-[#6ac045]' : 'border-[#222] hover:border-[#6ac045]/50'}`}>
                       <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload('background', e)} />
                       {bgBase64 ? (
                         <>
                           <img src={bgBase64} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm"><Upload className="text-[#6ac045]" size={40} /></div>
                         </>
                       ) : (
                         <div className="text-center group-hover:scale-110 transition-transform">
                            <Upload size={60} className="mx-auto text-[#222] mb-4" />
                            <span className="text-[11px] font-black text-gray-600 uppercase tracking-[0.3em]">UPLOAD BACKDROP</span>
                         </div>
                       )}
                    </label>
                 </div>
              </div>

              {/* Ultra Encodings */}
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4 text-gray-500">
                      <File size={18} className="text-[#6ac045]" />
                      <span className="text-[12px] font-black uppercase tracking-[0.4em]">Ultra Streams</span>
                   </div>
                   <button type="button" onClick={addDownloadField} className="bg-[#6ac045] text-black font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 px-8 py-4 rounded-[1.5rem] hover:bg-white transition-all transform active:scale-95 shadow-xl shadow-[#6ac045]/20">
                     <Plus size={18} strokeWidth={3} /> ADD NEW RELEASE
                   </button>
                </div>
                <div className="space-y-10">
                  {movieDownloads.map((dl, idx) => (
                    <div key={idx} className="bg-[#151515] p-12 rounded-[3.5rem] border-2 border-[#222] relative group/row animate-in zoom-in-95 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                        <div className="space-y-6">
                           <div>
                              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-2">Resolution</label>
                              <select className="w-full bg-[#222] rounded-[1.25rem] px-5 py-4 text-sm font-black italic outline-none border-2 border-transparent focus:border-[#6ac045] appearance-none" value={dl.quality} onChange={e => updateDownloadField(idx, 'quality', e.target.value)}>
                                {QUALITIES.map(q => <option key={q} value={q}>{q}</option>)}
                              </select>
                           </div>
                           <div>
                              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-2">File Weight</label>
                              <input type="text" className="w-full bg-[#222] rounded-[1.25rem] px-5 py-4 text-sm font-black outline-none border-2 border-transparent focus:border-[#6ac045]" value={dl.size} onChange={e => updateDownloadField(idx, 'size', e.target.value)} placeholder="e.g. 2.4 GB" />
                           </div>
                        </div>
                        <div className="md:col-span-2 space-y-6">
                           <div>
                              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-2">Magnet Master URI</label>
                              <input type="text" className="w-full bg-[#222] rounded-[1.25rem] px-6 py-4 text-xs font-medium outline-none border-2 border-transparent focus:border-[#6ac045] italic" placeholder="magnet:?xt=urn:btih:..." value={dl.magnet} onChange={e => updateDownloadField(idx, 'magnet', e.target.value)} />
                           </div>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <label className="block bg-[#222] border-2 border-dashed border-[#333] rounded-[1.25rem] px-6 py-4 cursor-pointer hover:border-[#6ac045] transition-all group/tor h-full flex items-center">
                                 <input type="file" className="hidden" accept=".torrent" onChange={(e) => handleTorrentUpload(idx, e)} />
                                 <div className="flex items-center justify-between w-full">
                                    <span className={`text-[10px] font-black ${dl.fileName ? 'text-[#6ac045]' : 'text-gray-500'} truncate uppercase tracking-widest`}>
                                      {dl.fileName || "ATTACH FILE"}
                                    </span>
                                    <File size={18} className={dl.fileName ? 'text-[#6ac045]' : 'text-gray-700'} />
                                 </div>
                              </label>
                              <div className="relative">
                                 <LinkIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                 <input type="url" className="w-full h-full bg-[#222] rounded-[1.25rem] pl-11 pr-5 py-4 text-[10px] font-black uppercase tracking-widest outline-none border-2 border-transparent focus:border-[#6ac045]" placeholder="TORRENT URL" value={dl.torrentUrl} onChange={e => updateDownloadField(idx, 'torrentUrl', e.target.value)} />
                              </div>
                           </div>
                        </div>
                        <div className="space-y-6">
                           <div>
                              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-2">Seed/Peer Calibration</label>
                              <div className="flex gap-4">
                                <div className="relative flex-1">
                                  <Activity size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6ac045]" />
                                  <input type="number" className="w-full bg-[#222] rounded-[1.25rem] pl-11 pr-4 py-4 text-sm font-black outline-none italic border-2 border-transparent focus:border-[#6ac045]" value={dl.seeds} onChange={e => updateDownloadField(idx, 'seeds', e.target.value)} />
                                </div>
                                <div className="relative flex-1">
                                  <Users2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                                  <input type="number" className="w-full bg-[#222] rounded-[1.25rem] pl-11 pr-4 py-4 text-sm font-black outline-none italic border-2 border-transparent focus:border-[#6ac045]" value={dl.peers} onChange={e => updateDownloadField(idx, 'peers', e.target.value)} />
                                </div>
                              </div>
                           </div>
                        </div>
                      </div>
                      {movieDownloads.length > 1 && (
                        <button type="button" onClick={() => removeDownloadField(idx)} className="absolute -top-5 -right-5 bg-red-600 text-white w-12 h-12 rounded-[1.25rem] shadow-2xl hover:bg-white hover:text-red-600 transition-all transform hover:rotate-90 flex items-center justify-center border-4 border-[#111]">
                          <X size={24} strokeWidth={4} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-10">
                <button disabled={isUploading} type="submit" className="w-full bg-[#6ac045] text-black font-black py-10 rounded-[3rem] text-3xl flex items-center justify-center gap-6 hover:bg-white transition-all transform active:scale-[0.98] shadow-[0_40px_100px_rgba(106,192,69,0.4)] disabled:opacity-50 italic tracking-tighter group">
                  {isUploading ? <Loader2 className="animate-spin" size={40} /> : <Sparkles className="group-hover:rotate-12 transition-transform" size={40} strokeWidth={3} />}
                  {isUploading ? 'SYNCHRONIZING RELEASES...' : 'DEPLOY ULTRA RELEASE'}
                </button>
              </div>
            </div>
          </form>
        )}

        {activeTab === 'manage' && (
          <div className="bg-[#111] border border-[#222] rounded-[4rem] overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom-12 duration-1000">
             <div className="p-10 bg-[#181818] border-b border-[#222] flex justify-between items-center">
                <h2 className="font-black text-3xl italic tracking-tighter">GLOBAL LIBRARY MANAGER</h2>
                <div className="bg-[#6ac045]/10 px-8 py-3 rounded-full text-[12px] font-black text-[#6ac045] uppercase tracking-[0.4em] border border-[#6ac045]/20">{movies.length} ACTIVE DEPLOYMENTS</div>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-[#0a0a0a] text-[11px] font-black text-gray-600 uppercase tracking-[0.4em]">
                   <tr>
                     <th className="px-10 py-8">Release Metadata</th>
                     <th className="px-10 py-8 text-center">Year</th>
                     <th className="px-10 py-8 text-center">Quality Tags</th>
                     <th className="px-10 py-8 text-right">Admin Control</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-[#222]">
                    {movies.map(m => (
                      <tr key={m.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-10 py-10">
                          <div className="flex items-center gap-8">
                            <div className="w-16 h-24 rounded-[1.25rem] overflow-hidden shadow-2xl border-2 border-[#222] group-hover:border-[#6ac045]/50 transition-all duration-500">
                               <img src={m.coverImage} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                               <div className="font-black group-hover:text-[#6ac045] transition-colors text-2xl italic tracking-tighter leading-none">{m.title}</div>
                               <div className="text-[11px] text-gray-600 font-bold uppercase tracking-[0.3em] mt-3">{m.language} / Ultra Encode</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-10 text-center text-gray-500 font-black italic text-3xl group-hover:text-white transition-colors">{m.year}</td>
                        <td className="px-10 py-10">
                          <div className="flex gap-3 justify-center">
                             {m.downloads.map(d => <span key={d.quality} className="text-[10px] bg-black border border-[#222] text-gray-500 px-3 py-1.5 rounded-xl font-black tracking-widest group-hover:border-[#6ac045]/40 group-hover:text-[#6ac045] transition-all">{d.quality}</span>)}
                          </div>
                        </td>
                        <td className="px-10 py-10 text-right">
                          <button onClick={() => handleDelete(m.id)} disabled={deletingId === m.id} className="w-16 h-16 bg-red-600/10 text-red-600 rounded-[1.5rem] hover:bg-red-600 hover:text-white transition-all transform hover:scale-110 active:scale-90 flex items-center justify-center disabled:opacity-50">
                            {deletingId === m.id ? <Loader2 size={24} className="animate-spin" /> : <Trash2 size={24} strokeWidth={3} />}
                          </button>
                        </td>
                      </tr>
                    ))}
                 </tbody>
               </table>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;