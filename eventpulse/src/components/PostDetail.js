import React, { useEffect, useState } from 'react';
import api from '../api'; // Axios instance
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.error('Failed to fetch post details:', err);
      }
    };
    fetchPost();
  }, [postId]);

  const handleApprove = async (claimId) => {
    try {
      await api.post(`/claims/${claimId}/approve`);
      alert('Approved successfully!');
      refreshPost(); // re-fetch post data
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };

  const handleReject = async (claimId) => {
    try {
      await api.post(`/claims/${claimId}/reject`);
      alert('Rejected successfully!');
      refreshPost(); // re-fetch post data
    } catch (err) {
      console.error('Rejection failed:', err);
    }
  };

  const refreshPost = async () => {
    const res = await api.get(`/posts/${postId}`);
    setPost(res.data);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      {post.isOwner && (
        <div className="claim-requests">
          <h3>Claim Requests</h3>
          {post.claimRequests.length === 0 ? (
            <p>No claim requests.</p>
          ) : (
            post.claimRequests.map((claim) => (
              <div key={claim.id} className="claim-card">
                <p>User: {claim.userEmail} | Status: {claim.status}</p>
                {claim.status === 'PENDING' && (
                  <>
                    <button onClick={() => handleApprove(claim.id)}>Approve</button>
                    <button onClick={() => handleReject(claim.id)}>Reject</button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
