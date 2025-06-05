const express = require('express')
const multer = require('multer')
const path = require('path')
const { fileFilter, limits } = require('../middleware/validateFile')
const { v4: uuidv4 } = require('uuid')

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const safeName = uuidv4() + ext
    cb(null, safeName)
  }
})

const upload = multer({ storage, fileFilter, limits })

// POST /upload
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ error: 'No file uploaded or invalid file type.' })
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    filename: req.file.filename
  })
})

// GET /files/:filename
router.get('/files/:filename', (req, res) => {
  const fileName = path.basename(req.params.filename)
  const filePath = path.join(__dirname, '../uploads', fileName)

  res.sendFile(filePath, err => {
    if (err) {
      return res.status(404).json({ error: 'File not found' })
    }
  })
})

module.exports = router
