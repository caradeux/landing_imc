import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudnZ5ZWdxdW5icGlsY2NybnRvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDcxMjMxNSwiZXhwIjoyMDUwMjg4MzE1fQ.Jk5S3WA_rxLc-5hW_KI-pFZMVn6Wb47R0mJGAQCg-n8'

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdmin() {
  console.log('Creando usuario administrador...')
  console.log('Proyecto:', supabaseUrl)

  const { data, error } = await supabase.auth.admin.createUser({
    email: 'caradeux2010@gmail.com',
    password: 'Karadox8..',
    email_confirm: true
  })

  if (error) {
    console.error('Error al crear usuario:', error.message)
    return
  }

  console.log('Usuario creado exitosamente!')
  console.log('Email:', data.user.email)
  console.log('ID:', data.user.id)
  console.log('Confirmado:', data.user.email_confirmed_at ? 'Sí' : 'No')
}

createAdmin()
