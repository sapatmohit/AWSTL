import { useState, useEffect } from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function App() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users')
                setUsers(response.data)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    if (loading) return <div className="loading-container">Loading users...</div>
    if (error) return <div className="error-container">Error: {error}</div>

    return (
        <div className="app-container">
            <h1>User Directory</h1>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                className="user-swiper"
                style={{ paddingBottom: '50px' }}
            >
                {users.map(user => (
                    <SwiperSlide key={user.id} style={{ height: 'auto', display: 'flex' }}>
                        <div className="user-card">
                            <div className="user-photo-container">
                                <img
                                    src={`https://robohash.org/${user.id}?set=set4&size=150x150`}
                                    alt={user.name}
                                    className="user-photo"
                                />
                            </div>
                            <h2>{user.name}</h2>
                            <span className="username">@{user.username}</span>
                            <div className="info-group">
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>
                                <p><strong>Website:</strong> {user.website}</p>
                                <p><strong>Company:</strong> {user.company.name}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default App
