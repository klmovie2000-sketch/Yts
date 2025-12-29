import { Movie } from './types';

export const INITIAL_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Fackham Hall',
    year: 2025,
    rating: 6.4,
    genres: ['Comedy'],
    coverImage: 'https://picsum.photos/seed/fackham/210/315',
    backgroundImage: 'https://picsum.photos/seed/fackham-bg/1280/720',
    language: 'English',
    description: 'In a world where laughter is the only medicine, Fackham Hall stands as the ultimate clinic of comedy. A hilarious journey through the halls of an eccentric estate.',
    downloads: [
      { quality: '720p', magnet: 'magnet:?xt=urn:btih:EX1_720', size: '840 MB', type: 'WEB', seeds: 124, peers: 45 },
      { quality: '1080p', magnet: 'magnet:?xt=urn:btih:EX1_1080', size: '1.4 GB', type: 'WEB', seeds: 350, peers: 82 }
    ],
    dateAdded: '2025-01-20',
    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'Eternity',
    year: 2025,
    rating: 7.1,
    genres: ['Comedy', 'Drama'],
    coverImage: 'https://picsum.photos/seed/eternity/210/315',
    backgroundImage: 'https://picsum.photos/seed/eternity-bg/1280/720',
    language: 'English',
    description: 'A thought-provoking look at the concept of forever and how human relationships evolve over vast stretches of time.',
    downloads: [
      { quality: '1080p', magnet: 'magnet:?xt=urn:btih:EX2_1080', size: '1.6 GB', type: 'WEB', seeds: 842, peers: 120 },
      { quality: '2160p', magnet: 'magnet:?xt=urn:btih:EX2_2160', size: '4.2 GB', type: 'WEB', seeds: 215, peers: 54 }
    ],
    dateAdded: '2025-01-19',
    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
];

export const GENRES = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 
  'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir', 'History', 
  'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 
  'Sport', 'Thriller', 'War', 'Western'
];

export const QUALITIES = ['720p', '1080p', '2160p', '3D'];