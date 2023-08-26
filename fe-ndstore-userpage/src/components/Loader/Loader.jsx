import React from 'react'
import './Loader.css'

export const Loader = () => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, zIndex: '10000',
            width: '100vw', height: '100vh', display: 'flex',
            justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.349)'
        }}>
            <span class="loader"></span>
        </div>
    )
}