import React, { useRef, useEffect } from 'react';

function Track(props) {
  const songRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin around the root
      threshold: 0.5, // The element is considered in view when 50% or more of it is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          songRef.current.classList.add('in-view');
        } else {
          songRef.current.classList.remove('in-view');
        }
      }); 
    }, options);

    // Start observing the song element
    if (songRef.current) {
      observer.observe(songRef.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (songRef.current) {
        observer.unobserve(songRef.current);
      }
    };
  }, []);

  return (
    <div ref={songRef} className="Track">
      <img
        src={props.track.image} // Use the first image from the images array
        alt="Album Cover"
        className="Track-image"
      />
      <h3>{props.track.name}</h3>
      <p>
        {props.track.artist} | {props.track.album.name} {/* Use album.name for the album title */}
      </p>
      {props.isRemoval ? (
        <button className="Track-action" onClick={() => props.onRemove(props.track)}>
          -
        </button>
      ) : (
        <button className="Track-action" onClick={() => props.onAdd(props.track)}>
          +
        </button>
      )}
    </div>
  );
}

export default Track;
