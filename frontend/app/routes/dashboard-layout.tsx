// src/app/layouts/DashboardLayout.tsx
import React from 'react'
import { useAuth } from '@/app/contexts/auth/auth-context'
import { Navigate, Outlet } from 'react-router'
import SideBarComponent from '@/app/components/shared/sidebar-component'

export default function DashboardLayout() {
  const { user, loading } = useAuth()

  if (loading) {
    return null
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div>
      <div className="flex pt-16">
        <SideBarComponent />

        <main className="flex-2 ml-55 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
