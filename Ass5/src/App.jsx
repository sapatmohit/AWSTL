import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (name, value) => {
    let error = '';
    if (name === 'username') {
      if (!value.trim()) error = 'Username is required';
      else if (value.length < 3) error = 'Username must be at least 3 characters';
      else if (!/^[a-zA-Z0-9]+$/.test(value)) error = 'Username can only contain letters and numbers (no spaces)';
    }
    if (name === 'email') {
      if (!value.trim()) error = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Email address is invalid';
    }
    if (name === 'password') {
      if (!value) error = 'Password is required';
      else if (value.length < 8) error = 'Password must be at least 8 characters';
      else if (!/(?=.*[a-z])/.test(value)) error = 'Password must contain at least one lowercase letter';
      else if (!/(?=.*[A-Z])/.test(value)) error = 'Password must contain at least one uppercase letter';
      else if (!/(?=.*\d)/.test(value)) error = 'Password must contain at least one number';
      else if (!/(?=.*[!@#$%^&*])/.test(value)) error = 'Password must contain at least one special character (!@#$%^&*)';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validate(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);

    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (Object.keys(newErrors).length === 0) {
      setTimeout(() => {
        setSuccess(true);
        setIsSubmitting(false);
        // Navigate to profile page and pass the user data
        setTimeout(() => {
          navigate('/profile', { state: { userData: formData } });
        }, 800);
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <div className="form-header">
          <h1>Create Account</h1>
          <p>Join us to explore the future.</p>
        </div>

        {success && (
          <div className="success-banner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Success! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className={`input-group ${errors.username && touched.username ? 'has-error' : ''} ${!errors.username && touched.username && formData.username ? 'is-valid' : ''}`}>
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <input type="text" id="username" name="username" placeholder="johndoe" value={formData.username} onChange={handleChange} onBlur={handleBlur} />
              <span className="validation-icon"></span>
            </div>
            {errors.username && touched.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className={`input-group ${errors.email && touched.email ? 'has-error' : ''} ${!errors.email && touched.email && formData.email ? 'is-valid' : ''}`}>
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input type="email" id="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} onBlur={handleBlur} />
              <span className="validation-icon"></span>
            </div>
            {errors.email && touched.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className={`input-group ${errors.password && touched.password ? 'has-error' : ''} ${!errors.password && touched.password && formData.password ? 'is-valid' : ''}`}>
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input type="password" id="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} onBlur={handleBlur} />
              <span className="validation-icon"></span>
            </div>
            {errors.password && touched.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className={`submit-btn ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting || success}>
            {isSubmitting ? <span className="spinner"></span> : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialData = location.state?.userData;

  // Profile State Setup (No dummy data)
  const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${initialData?.username || 'newuser'}`;

  const [profileData, setProfileData] = useState({
    username: initialData?.username || '',
    email: initialData?.email || '',
    bio: '',
    avatarUrl: defaultAvatar,
    displayName: initialData?.username || '',
    followers: 0,
    following: 0,
    title: '',
    location: '',
    website: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profileData);
  const [imageError, setImageError] = useState('');

  // Posts State
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');

  if (!initialData) {
    return (
      <div className="form-wrapper">
        <div className="form-card" style={{ textAlign: 'center' }}>
          <h2>No Data Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px' }}>Please complete the signup form first.</p>
          <button onClick={() => navigate('/')} className="submit-btn" style={{ marginTop: 0 }}>Return to Signup</button>
        </div>
      </div>
    );
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    // Enforce 250 char limit on bio
    if (name === 'bio' && value.length > 250) return;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setImageError('');
    const file = e.target.files[0];
    if (!file) return;

    // Validate Check Format
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setImageError('Only JPG, JPEG, and PNG files are allowed.');
      return;
    }

    // Validate Check Size (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError('Image size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditForm(prev => ({ ...prev, avatarUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = (e) => {
    e.preventDefault();
    setProfileData(editForm);
    setIsEditing(false);
    setImageError('');
  };

  const cancelEdit = () => {
    setEditForm(profileData);
    setIsEditing(false);
    setImageError('');
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: Date.now(),
      content: newPostContent,
      date: new Date().toISOString(),
      likes: 0
    };

    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
  };

  const handleDeletePost = (id) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="profile-container">
      {/* Profile Header Card */}
      <div className="form-card profile-card social-header">
        {isEditing ? (
          <form className="edit-profile-form" onSubmit={saveProfile}>
            <div className="edit-header">
              <h2>Edit Profile</h2>
            </div>

            <div className="input-group">
              <label>Display Name</label>
              <div className="input-wrapper">
                <input type="text" name="displayName" value={editForm.displayName} onChange={handleEditChange} required />
              </div>
            </div>

            <div className="input-group">
              <label>Profile Label / Job Title</label>
              <div className="input-wrapper">
                <input type="text" name="title" value={editForm.title} onChange={handleEditChange} placeholder="e.g. Independent Designer" />
              </div>
            </div>

            <div className="input-group">
              <label>Avatar Image (JPG, PNG)</label>
              <div className="input-wrapper">
                <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImageUpload} style={{ padding: '10px 16px' }} />
              </div>
              {imageError && <span className="error-text">{imageError}</span>}
              {!imageError && <small style={{ color: 'var(--text-secondary)', display: 'block', marginTop: '6px' }}>Max size 5MB.</small>}
            </div>

            <div className="input-group">
              <label>Location</label>
              <div className="input-wrapper">
                <input type="text" name="location" value={editForm.location} onChange={handleEditChange} placeholder="e.g. Seoul, Korea" />
              </div>
            </div>

            <div className="input-group">
              <label>Website URL</label>
              <div className="input-wrapper">
                <input type="url" name="website" value={editForm.website} onChange={handleEditChange} placeholder="e.g. https://example.com" />
              </div>
            </div>

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ marginBottom: 0 }}>Bio</label>
                <span style={{ fontSize: '0.85rem', color: editForm.bio?.length >= 250 ? 'var(--error-color)' : 'var(--text-secondary)' }}>
                  {editForm.bio?.length || 0}/250
                </span>
              </div>
              <div className="input-wrapper">
                <textarea name="bio" value={editForm.bio} onChange={handleEditChange} rows="4" className="social-textarea" placeholder="Write a little bit about yourself..."></textarea>
              </div>
            </div>

            <div className="edit-actions">
              <button type="button" onClick={cancelEdit} className="submit-btn outline-btn short-btn">Cancel</button>
              <button type="submit" className="submit-btn short-btn" style={{ marginTop: 0 }}>Save Changes</button>
            </div>
          </form>
        ) : (
          <div className="reference-profile-card">
            <div className="profile-banner">
              <div className="banner-bg">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                  <path d="M20 80 L80 20 M20 20 L20 80 L80 80 M80 20 L80 80" stroke="#fff" strokeWidth="8" fill="none" />
                </svg>
              </div>
            </div>

            <div className="profile-hero-content">
              <div className="avatar-section">
                <div className="avatar-wrapper-ref">
                  <img src={profileData.avatarUrl} alt="Avatar" className="social-avatar-ref" />
                  <div className="verified-badge">
                    <svg viewBox="0 0 24 24" fill="#007AFF" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM9.8 17.3L5.6 13.1L7 11.7L9.8 14.5L17 7.3L18.4 8.7L9.8 17.3Z" fill="#007AFF" />
                      <path d="M9.8 17.3L5.6 13.1L7 11.7L9.8 14.5L17 7.3L18.4 8.7L9.8 17.3Z" fill="#fff" />
                    </svg>
                  </div>
                </div>

                <div className="hero-actions">
                  <button className="icon-btn-ref">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  </button>
                  <button className="icon-btn-ref" onClick={() => setIsEditing(true)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  </button>
                </div>
              </div>

              <div className="profile-identity">
                <h1 className="ref-name">{profileData.displayName || profileData.username} <span className="star-icon">⭐</span></h1>

                {profileData.title && (
                  <p className="ref-title">{profileData.title}</p>
                )}

                {!profileData.title && !profileData.bio && (
                  <p className="ref-title" style={{ fontStyle: 'italic', opacity: 0.6 }}>New empty profile. Click edit to customize!</p>
                )}
              </div>

              {(profileData.followers > 0 || profileData.following > 0 || posts.length > 0) && (
                <div className="ref-stats">
                  <div className="ref-stat">
                    <span className="ref-stat-label">Followers</span>
                    <span className="ref-stat-val">{profileData.followers}</span>
                  </div>
                  <div className="ref-stat">
                    <span className="ref-stat-label">Following</span>
                    <span className="ref-stat-val">{profileData.following}</span>
                  </div>
                  <div className="ref-stat">
                    <span className="ref-stat-label">Posts</span>
                    <span className="ref-stat-val">{posts.length}</span>
                  </div>
                </div>
              )}

              <div className="ref-action-buttons">
                <button className="ref-btn primary-ref-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                  Follow
                </button>
                <button className="ref-btn secondary-ref-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  Message
                </button>
                <button className="ref-btn secondary-ref-btn dropdown-btn">
                  Save to list
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
              </div>

              {(profileData.bio || profileData.location || profileData.website) && (
                <>
                  <div className="ref-divider"></div>
                  <div className="ref-about-section">
                    {profileData.bio && (
                      <>
                        <h3 className="ref-about-title">About</h3>
                        <p className="ref-about-text">{profileData.bio}</p>
                      </>
                    )}

                    {(profileData.location || profileData.website) && (
                      <div className="ref-about-meta">
                        {profileData.location && (
                          <div className="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            {profileData.location}
                          </div>
                        )}
                        {profileData.website && (
                          <div className="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                            <a href={profileData.website.startsWith('http') ? profileData.website : `https://${profileData.website}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{profileData.website.replace(/^https?:\/\//, '')}</a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="social-feed">
        {/* Create Post Widget */}
        <div className="form-card create-post-card">
          <form onSubmit={handleCreatePost}>
            <div className="create-post-header">
              <img src={profileData.avatarUrl} alt="Avatar" className="mini-avatar" />
              <textarea
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="social-textarea compose-textarea"
                rows="2"
              ></textarea>
            </div>
            <div className="create-post-actions">
              <button type="submit" className="submit-btn short-btn post-btn" disabled={!newPostContent.trim()} style={{ marginTop: 0 }}>
                Post
              </button>
            </div>
          </form>
        </div>

        {/* Post Feed */}
        <div className="posts-list">
          {posts.length === 0 ? (
            <div className="empty-state">No posts yet. Share something above!</div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="form-card post-card">
                <div className="post-header">
                  <img src={profileData.avatarUrl} alt="Avatar" className="mini-avatar" />
                  <div className="post-meta">
                    <strong>{profileData.displayName}</strong>
                    <span className="post-date">{formatDate(post.date)}</span>
                  </div>
                  <button onClick={() => handleDeletePost(post.id)} className="delete-btn" title="Delete Post">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
                <div className="post-content">
                  {post.content}
                </div>
                <div className="post-actions">
                  <button className="action-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    Like
                  </button>
                  <button className="action-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    Comment
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="profile-footer">
        <button onClick={() => navigate('/')} className="submit-btn outline-btn short-btn">
          Sign Out
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
