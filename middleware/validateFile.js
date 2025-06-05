const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'))
  }
}

const limits = {
  fileSize: 5 * 1024 * 1024 // 5MB limit
}

module.exports = { fileFilter, limits }