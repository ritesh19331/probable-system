import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Mocked post data
const posts = [
  { id: 1, title: 'Post 1', lat: 28.6139, lng: 77.2090, description: 'This is post 1' },
  { id: 2, title: 'Post 2', lat: 19.0760, lng: 72.8777, description: 'This is post 2' },
  { id: 3, title: 'Post 3', lat: 13.0827, lng: 80.2707, description: 'This is post 3' },
  { id: 4, title: 'Post 4', lat: 22.9734, lng: 78.6569, description: 'This is post 4' },
];

// Utility function to calculate distance between two points (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const PostMapView = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [userLocation, setUserLocation] = useState({ lat: 28.7041, lng: 77.1025 }); // Mocked current user location (Delhi)

  // Filter posts by distance
  const filterPostsByDistance = (distance) => {
    const filtered = posts.filter((post) =>
      calculateDistance(userLocation.lat, userLocation.lng, post.lat, post.lng) <= distance
    );
    setFilteredPosts(filtered);
  };

  // Effect to simulate distance filtering when distance is changed
  useEffect(() => {
    // Mocked distance: 2000 km
    filterPostsByDistance(2000);
  }, []);

  return (
    <div>
      <MapContainer center={userLocation} zoom={5} style={{ height: '600px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {filteredPosts.map(post => (
          <Marker key={post.id} position={[post.lat, post.lng]} eventHandlers={{ click: () => setSelectedPost(post) }}>
            <Popup>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedPost && (
        <div className="post-details">
          <h3>Post Details</h3>
          <p><strong>Title:</strong> {selectedPost.title}</p>
          <p><strong>Description:</strong> {selectedPost.description}</p>
          <p><strong>Location:</strong> Lat: {selectedPost.lat}, Lng: {selectedPost.lng}</p>
        </div>
      )}
    </div>
  );
};

export default PostMapView;
