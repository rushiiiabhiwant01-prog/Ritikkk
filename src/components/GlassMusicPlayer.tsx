import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  ListMusic, 
  ExternalLink, 
  Radio, 
  Sparkles, 
  ChevronUp, 
  ChevronDown,
  Music,
  Tv
} from 'lucide-react';
import { CHACHA_PLAYLIST, YOUTUBE_PLAYLIST_ID, Track } from '../data/playlist';

interface GlassMusicPlayerProps {
  onActionFeedback: (msg: string) => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const GlassMusicPlayer: React.FC<GlassMusicPlayerProps> = ({ onActionFeedback }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState(false);
  const [showIframeModal, setShowIframeModal] = useState(false);
  const [ytPlayerReady, setYtPlayerReady] = useState(false);

  const playerRef = useRef<any>(null);
  const track = CHACHA_PLAYLIST[currentTrackIndex];

  // Initialize YouTube Player
  useEffect(() => {
    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player('yt-player-container', {
          height: '200',
          width: '320',
          playerVars: {
            listType: 'playlist',
            list: YOUTUBE_PLAYLIST_ID,
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: () => {
              setYtPlayerReady(true);
            },
            onStateChange: (event: any) => {
              // 1 = Playing, 2 = Paused, 0 = Ended
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0) {
                handleNext();
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }
  }, []);

  // Update progress timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime && isPlaying) {
        const currentTime = playerRef.current.getCurrentTime() || 0;
        const totalDuration = playerRef.current.getDuration() || 240;
        setProgress(currentTime);
        setDuration(totalDuration);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle Play / Pause Toggle
  const togglePlay = () => {
    if (!playerRef.current || !ytPlayerReady) {
      setIsPlaying(!isPlaying);
      onActionFeedback(isPlaying ? "⏸️ Track Paused" : `▶️ Playing: ${track.title}`);
      return;
    }

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
        onActionFeedback("⏸️ Music Paused");
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
        onActionFeedback(`▶️ Playing: ${track.title}`);
      }
    } catch (e) {
      setIsPlaying(!isPlaying);
    }
  };

  // Next Track
  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % CHACHA_PLAYLIST.length;
    setCurrentTrackIndex(nextIdx);
    onActionFeedback(`⏭️ Next Track: ${CHACHA_PLAYLIST[nextIdx].title}`);

    if (playerRef.current && playerRef.current.nextVideo) {
      try {
        playerRef.current.nextVideo();
        setIsPlaying(true);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // Prev Track
  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + CHACHA_PLAYLIST.length) % CHACHA_PLAYLIST.length;
    setCurrentTrackIndex(prevIdx);
    onActionFeedback(`⏮️ Previous Track: ${CHACHA_PLAYLIST[prevIdx].title}`);

    if (playerRef.current && playerRef.current.previousVideo) {
      try {
        playerRef.current.previousVideo();
        setIsPlaying(true);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // Select Track by index
  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setShowPlaylistDrawer(false);
    onActionFeedback(`🎶 Selected: ${CHACHA_PLAYLIST[index].title}`);

    if (playerRef.current && playerRef.current.playVideoAt) {
      try {
        playerRef.current.playVideoAt(index);
        setIsPlaying(true);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // Handle Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseInt(e.target.value);
    setVolume(newVol);
    if (newVol === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }

    if (playerRef.current && playerRef.current.setVolume) {
      try {
        playerRef.current.setVolume(newVol);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (playerRef.current && playerRef.current.unMute) playerRef.current.unMute();
    } else {
      setIsMuted(true);
      if (playerRef.current && playerRef.current.mute) playerRef.current.mute();
    }
  };

  // Handle Timeline Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setProgress(seekTime);
    if (playerRef.current && playerRef.current.seekTo) {
      try {
        playerRef.current.seekTo(seekTime, true);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {/* Hidden container for YouTube iframe API */}
      <div className="fixed bottom-0 left-0 opacity-0 pointer-events-none z-0">
        <div id="yt-player-container" />
      </div>

      {/* Playlist Drawer Sheet */}
      {showPlaylistDrawer && (
        <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div className="relative w-full max-w-2xl max-h-[80vh] rounded-2xl bg-stone-900 border-2 border-amber-600/50 p-6 shadow-2xl flex flex-col overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-4">
              <div>
                <h3 className="font-yatra text-2xl text-amber-300 flex items-center gap-2">
                  <ListMusic className="w-6 h-6 text-amber-400" />
                  CHACHA'S RETRO RADIO PLAYLIST
                </h3>
                <span className="text-xs font-mono text-stone-400">
                  YouTube Playlist: PLbmMrWAisRjw • {CHACHA_PLAYLIST.length} Classic Hits
                </span>
              </div>

              <button
                onClick={() => setShowPlaylistDrawer(false)}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Song List Items */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {CHACHA_PLAYLIST.map((t, idx) => (
                <div
                  key={t.id}
                  onClick={() => selectTrack(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    currentTrackIndex === idx 
                      ? 'bg-amber-950/80 border-amber-500 text-amber-200 font-bold shadow-md' 
                      : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-center font-mono text-xs text-amber-400">
                      {idx === currentTrackIndex ? '▶' : idx + 1}
                    </span>
                    <img 
                      src={t.albumCover} 
                      alt={t.title} 
                      className="w-10 h-10 rounded-lg object-cover border border-amber-900/40"
                    />
                    <div>
                      <h4 className="text-sm font-semibold">{t.title}</h4>
                      <p className="text-xs text-stone-400">{t.artist} • {t.movie} ({t.year})</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-stone-400">{t.duration}</span>
                </div>
              ))}
            </div>

            <a
              href={`https://youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold text-center flex items-center justify-center gap-2 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Full Playlist on YouTube</span>
            </a>

          </div>
        </div>
      )}

      {/* YouTube Video Overlay Modal */}
      {showIframeModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl rounded-2xl bg-stone-900 border-2 border-amber-500 p-6 shadow-2xl">
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-yatra text-xl text-amber-300 flex items-center gap-2">
                <Tv className="w-5 h-5 text-amber-400" />
                Live Salone Radio Video Stream
              </h3>
              <button
                onClick={() => setShowIframeModal(false)}
                className="p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white"
              >
                ✕ Close
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden border border-amber-900/50 shadow-inner">
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}&autoplay=1`}
                title="Chacha Vibes Only Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

          </div>
        </div>
      )}

      {/* FIXED GLASSMORPHISM BOTTOM MUSIC PLAYER */}
      <div className="fixed bottom-0 left-0 right-0 z-30 px-3 sm:px-6 pb-3 pt-1">
        <div className="max-w-7xl mx-auto rounded-2xl glass-panel-gold p-3 sm:p-4 shadow-2xl">
          
          {/* Progress Timeline Slider */}
          <div className="relative w-full mb-2 flex items-center gap-3">
            <span className="text-[10px] font-mono text-amber-300/80 w-8 text-right">
              {formatTime(progress)}
            </span>
            <input 
              type="range"
              min="0"
              max={duration || 240}
              value={progress}
              onChange={handleSeek}
              className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <span className="text-[10px] font-mono text-amber-300/80 w-8">
              {formatTime(duration || 240)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Left: Album Cover & Track Title Info */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              
              {/* Spinning Vinyl Album Cover */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/80 shadow-md shrink-0">
                <img 
                  src={track.albumCover} 
                  alt={track.title}
                  className={`w-full h-full object-cover ${isPlaying ? 'animate-spin' : ''}`}
                  style={{ animationDuration: '8s' }}
                />
                <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-stone-900 border border-amber-400" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-amber-100 truncate">
                    {track.title}
                  </h4>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60 shrink-0">
                    {track.year}
                  </span>
                </div>
                <p className="text-xs text-stone-300 truncate">
                  {track.artist} • <span className="italic">{track.movie}</span>
                </p>
                <p className="text-[11px] font-caveat text-amber-300/90 truncate hidden md:block">
                  "{track.chachaCommentary}"
                </p>
              </div>

            </div>

            {/* Central: Playback Controls & Equalizer */}
            <div className="flex items-center gap-3">
              
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-stone-800/80 hover:bg-amber-900 text-stone-200 hover:text-amber-300 border border-stone-700 transition-all active:scale-90 cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="p-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer font-bold"
                title={isPlaying ? "Pause Music" : "Play Music"}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-stone-950" /> : <Play className="w-5 h-5 fill-stone-950 ml-0.5" />}
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-stone-800/80 hover:bg-amber-900 text-stone-200 hover:text-amber-300 border border-stone-700 transition-all active:scale-90 cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              {/* Animated Equalizer Bars */}
              <div className="hidden lg:flex items-end gap-1 h-6 px-2">
                <span className={`w-1 rounded-t bg-amber-400 ${isPlaying ? 'animate-bounce' : 'h-2'}`} style={{ animationDuration: '0.6s' }} />
                <span className={`w-1 rounded-t bg-amber-400 ${isPlaying ? 'animate-bounce delay-100' : 'h-3'}`} style={{ animationDuration: '0.8s' }} />
                <span className={`w-1 rounded-t bg-amber-400 ${isPlaying ? 'animate-bounce delay-200' : 'h-1.5'}`} style={{ animationDuration: '0.5s' }} />
                <span className={`w-1 rounded-t bg-amber-400 ${isPlaying ? 'animate-bounce delay-300' : 'h-4'}`} style={{ animationDuration: '0.7s' }} />
              </div>

            </div>

            {/* Right: Volume & Playlist Tools */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Volume Slider */}
              <div className="hidden sm:flex items-center gap-1.5 bg-stone-900/60 px-2 py-1 rounded-lg border border-stone-800">
                <button onClick={toggleMute} className="text-amber-400 hover:text-amber-300">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* View Playlist Button */}
              <button
                onClick={() => setShowPlaylistDrawer(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ListMusic className="w-4 h-4" />
                <span className="hidden md:inline">Songs ({CHACHA_PLAYLIST.length})</span>
              </button>

              {/* Watch Video Mode */}
              <button
                onClick={() => setShowIframeModal(true)}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-amber-900 text-stone-200 hover:text-amber-300 border border-stone-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Watch Video Stream"
              >
                <Tv className="w-4 h-4 text-amber-400" />
                <span className="hidden lg:inline">Video</span>
              </button>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};
