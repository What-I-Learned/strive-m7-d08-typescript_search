interface Artist {
  id: number;
  name: string;
  link: string;
  picture_medium: string;
  tracklist: string;
  picture_big: string;
}

interface Album {
  id: number;
  title: string;
  cover_medium: string;
  tracklist: string;
}

interface MusicEl {
  id: number;
  title: string;
  title_short: string;
  link: string;
  duration: number;
  rank: number;
  artist: Artist;
  album: Album;
}

// interface Book {
//     description: string
//     id: number
//     imageUrl: string
//     price: string
//     title: string
//     //   writers: Writer[]
//     // feel free to expand your interfaces to make room for more objects, arrays, etc.
//   }

export default MusicEl;
