import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const AudioPlayer = () => {
  const[audios, setAudios] = useState([]);
  const[currentAudio, setCurrentAudio] = useState(null);
  const[isPlaying, setIsPlaying] = useState(false);
  const[error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() =>{
    fetch('http://localhost:3001/audios')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => setAudios(data))
    .catch(error => setError(error.message));
  }, []);
  console.log(audios)
  console.log(audioRef)
  

  const playAudio = (filename) => {
    setCurrentAudio(`http://localhost:3001/audios/${filename}`);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if(isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return(
    <div>
      <h1>Lista de Áudios</h1>
      <ul>
        {audios.map((audio, index) => 
          <li key={index}>
            <p>{audio}</p>
            <button onClick={() => playAudio(audio)}>
              {audio}
            </button>
          </li>
        )}
      </ul>
      {currentAudio && (
        <div>
          <audio 
          ref={audioRef}
          src={currentAudio}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls
          />
          <button onClick={togglePlay}>
            {isPlaying? 'Pausar' : 'Reproduzir'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer
