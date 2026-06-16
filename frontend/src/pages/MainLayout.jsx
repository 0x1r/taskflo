import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header'

export default function MainLayout() {
  return (
    <>
    <Header/>
    <div>MainLayout</div>
    <Outlet></Outlet>
    </>
  )
}
