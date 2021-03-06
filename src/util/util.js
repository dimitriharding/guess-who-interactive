import { uuid } from 'uuidv4'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON
)

export function apiRequest(path, method = 'GET', data) {
  return fetch(`/api/${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((response) => response.json())
}

// Create an Error with custom message and code
export function CustomError(code, message) {
  const error = new Error(message)
  error.code = code
  return error
}

export const fileSize = (size) => {
  var i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  )
}

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result.toString())
    reader.onerror = (error) => reject(error)
  })
}

const makeBlackPhoto = async (photo) => {
  const canvas = document.createElement('canvas')
  const img = document.createElement('img')

  img.src = await new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.readAsDataURL(photo)
  })
  await new Promise((resolve) => {
    img.onload = resolve
  })

  // draw image in canvas element
  canvas.width = img.width
  canvas.height = img.height

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  return canvas
}

export const imageMaskUrl = async (file) => {
  const blackCanvas = await makeBlackPhoto(file)
  return new Promise((resolve, reject) => {
    blackCanvas.toBlob(function (blob) {
      resolve(URL.createObjectURL(blob))
    })
  })
}

export const createUserId = () => {
  const userId = uuid()
  return userId
}

export const creatDeckId = () => {
  const deckId = uuid()
  return deckId
}

export const removeBackground = (file) => {
  const formData = new FormData()
  formData.append('image_file', file)
  return fetch(process.env.NEXT_PUBLIC_PHOTOROOM_URL, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_PHOTOROOM_API_KEY,
    },
    body: formData,
  }).then(async (response) => {
    const fileBlob = await response.blob()
    const file_name_png = file.name.split('.')[0] + '.png'
    const new_file = new File([fileBlob], file_name_png, {
      type: 'image/png',
    })
    return new_file
  })
}

export const removeBackgroundTest = (file) => {
  const blob = new Blob([file], { type: file.type })
  const newFile = new File([blob], file.name, {
    type: file.type,
  })
  return newFile
}

export const uploadImage = async ({ file, deckId, noBg = false }) => {
  const { data, error } = await supabase.storage
    .from('guess-who-images')
    .upload(`public/${deckId}/${noBg ? 'no-bg-' : ''}${file.name}`, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (data) {
    return `https://qsqbzqshutqqrdjoplay.supabase.in/storage/v1/object/public/${data.Key}`
  }

  if (error) {
    return ''
  }
}

export const signInWithGoogle = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google',
  })
  return { user, session, error }
}

export const signUpWithEmail = async ({ email, password }) => {
  const { user, session, error } = await supabase.auth.signUp({
    provider: 'email',
    email,
    password,
  })
  return { user, session, error }
}

export const singInWithEmail = async ({ email, password }) => {
  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  })
  return { user, session, error }
}

export const getUser = async () => {
  const user = supabase.auth.user()
  return user
}

export const transformFiles = async (files) => {
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const filesUrl = await Promise.all(
    files.map(async (file) => {
      if (!file?.fileName) {
        file['url'] = await getBase64(file)
        file['fileName'] = file.name
        file['fileType'] = file.type
      }

      return file
    })
  )
  window.localStorage.setItem('gw:UploadedFiles', JSON.stringify(filesUrl))
  return filesUrl
}

export const createFilesFromLocalStorage = (_localFiles) => {
  const localFiles = JSON.parse(_localFiles)
  const files = localFiles.map((fileData) => {
    const file = new File([fileData?.url], fileData?.fileName, {
      type: file?.fileType,
    })
    file['url'] = fileData.url
    return file
  })
  return files
}
