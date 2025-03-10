// pages/tracks.js
import { useState, useEffect } from 'react';
import { fetchSheetData } from '../lib/sheets';

export default function TracksPage({ initialTracks }) {
  const [tracks, setTracks] = useState(initialTracks);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tracks</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track) => (
          <div 
            key={track.id} 
            className="border border-gray-200 p-4 rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold">{track.title}</h2>
            <p className="mt-2 text-gray-600">{track.description}</p>
            
            {track.audioUrl && (
              <div className="mt-4">
                <audio 
                  controls 
                  src={track.audioUrl}
                  className="w-full"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const tracks = await fetchSheetData();
  
  return {
    props: {
      initialTracks: tracks,
    },
    // Regenerate the page every 60 seconds if a request comes in
    revalidate: 60,
  };
}
