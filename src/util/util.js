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
