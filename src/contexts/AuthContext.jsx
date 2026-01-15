import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // Simplified auth - for now, we'll use a basic admin check
  // In the future, this can be replaced with proper JWT authentication
  useEffect(() => {
    // Check if user is logged in (localStorage for now)
    const savedUser = localStorage.getItem('admin_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email, password) => {
    // Simple admin login - replace with proper authentication later
    if (email === 'admin@imcsonline.online' && password === 'admin123') {
      const userData = { email, id: '1', role: 'admin' }
      setUser(userData)
      localStorage.setItem('admin_user', JSON.stringify(userData))
      return { user: userData }
    } else {
      throw new Error('Invalid credentials')
    }
  }

  const signUp = async (email, password) => {
    throw new Error('Sign up not implemented yet')
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem('admin_user')
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
