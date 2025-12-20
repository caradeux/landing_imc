import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

const defaultTheme = {
  primary_color: '#1e40af',
  secondary_color: '#0f172a',
  accent_color: '#667eea',
  text_color: '#333333',
  text_light: '#666666',
  background_color: '#ffffff',
  card_background: '#ffffff',
  border_color: '#e1e5e9',
  hover_color: '#3b82f6',
  gradient_start: '#1e40af',
  gradient_end: '#0f172a'
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadActiveTheme()
  }, [])

  const loadActiveTheme = async () => {
    try {
      const { data, error } = await supabase
        .from('color_schemes')
        .select('*')
        .eq('is_active', true)
        .maybeSingle()

      if (error) throw error

      if (data) {
        setTheme(data)
        applyThemeToCSS(data)
      } else {
        applyThemeToCSS(defaultTheme)
      }
    } catch (error) {
      console.error('Error loading theme:', error)
      applyThemeToCSS(defaultTheme)
    } finally {
      setLoading(false)
    }
  }

  const applyThemeToCSS = (themeData) => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', themeData.primary_color)
    root.style.setProperty('--color-secondary', themeData.secondary_color)
    root.style.setProperty('--color-accent', themeData.accent_color)
    root.style.setProperty('--color-text', themeData.text_color)
    root.style.setProperty('--color-text-light', themeData.text_light)
    root.style.setProperty('--color-background', themeData.background_color)
    root.style.setProperty('--color-card-bg', themeData.card_background)
    root.style.setProperty('--color-border', themeData.border_color)
    root.style.setProperty('--color-hover', themeData.hover_color)
    root.style.setProperty('--gradient-start', themeData.gradient_start)
    root.style.setProperty('--gradient-end', themeData.gradient_end)
  }

  const refreshTheme = async () => {
    await loadActiveTheme()
  }

  const value = {
    theme,
    loading,
    refreshTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
