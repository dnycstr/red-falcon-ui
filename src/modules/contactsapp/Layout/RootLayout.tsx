/* eslint-disable prettier/prettier */

import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'


export default function RootLayout() {
    return (
        <div className="root-layout">
            <header>
                <nav>
                    <h1>PhoneBook</h1>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/help">Help</NavLink>
                    <NavLink to="/careers">Careers</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}