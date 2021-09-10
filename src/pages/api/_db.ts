import { createClient } from '@supabase/supabase-js'
import { Users, Images } from '../../types/supabase'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export const createAnonUser = (uuid) => {
  return supabase.from<Users>('users').insert([{ id: uuid }])
}

export const createImages = (images: Images[]) => {
  // bulk create of images for guesswho deck
  return supabase.from<Images>('images').insert([...images])
}
