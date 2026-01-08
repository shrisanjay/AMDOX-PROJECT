const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { protect, authorize } = require('../middleware/auth');
const Certificate = require('../models/Certificate');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @desc    Upload bulk certificates (Excel)
// @route   POST /api/certificates/upload
// @access  Private (Admin only)
router.post('/upload', protect, authorize('admin'), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an Excel file' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    if (data.length === 0) {
      return res.status(400).json({ success: false, message: 'Excel file is empty' });
    }

    const certificates = [];
    const errors = [];

    for (const [index, row] of data.entries()) {
      try {
        // Validate required fields
        if (!row.studentName || !row.studentEmail || !row.certificateID || !row.courseName) {
           errors.push(`Row ${index + 2}: Missing required fields`);
           continue;
        }
        
        // Prepare certificate object
        const certData = {
          studentName: row.studentName,
          studentEmail: row.studentEmail,
          certificateID: String(row.certificateID), // Ensure it's a string
          courseName: row.courseName,
          grade: row.grade || 'N/A',
          issueDate: row.issueDate ? new Date(row.issueDate) : Date.now()
        };

        // Check for duplicates in DB (optional, but good for integrity)
        const exists = await Certificate.findOne({ certificateID: certData.certificateID });
        if (exists) {
            errors.push(`Row ${index + 2}: Certificate ID ${certData.certificateID} already exists`);
            continue;
        }

        certificates.push(certData);
      } catch (err) {
        errors.push(`Row ${index + 2}: ${err.message}`);
      }
    }

    if (certificates.length > 0) {
      await Certificate.insertMany(certificates);
    }

    res.status(201).json({
      success: true,
      count: certificates.length,
      errors: errors,
      message: `Successfully uploaded ${certificates.length} certificates. ${errors.length} failed.`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @desc    Search certificate by ID
// @route   GET /api/certificates/search
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Please provide a Certificate ID' });
    }

    const certificate = await Certificate.findOne({ certificateID: id });

    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    res.status(200).json({ success: true, data: certificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @desc    Download certificate as PDF
// @route   GET /api/certificates/download/:id
// @access  Public
router.get('/download/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateID: req.params.id });

    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    // Create a PDF document
    const doc = new PDFDocument({ layout: 'landscape', size: 'A4' });

    // Stream the PDF to the client
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=certificate-${certificate.certificateID}.pdf`);

    doc.pipe(res);

    // Add content to PDF
    // Background border
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();

    // Header
    doc.fontSize(30).text('Certificate of Completion', { align: 'center' });
    doc.moveDown();
    doc.fontSize(15).text('This is to certify that', { align: 'center' });
    doc.moveDown();

    // Student Name
    doc.fontSize(25).font('Helvetica-Bold').text(certificate.studentName, { align: 'center' });
    doc.moveDown();

    // Course Info
    doc.fontSize(15).font('Helvetica').text('has successfully completed the course', { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).font('Helvetica-Bold').text(certificate.courseName, { align: 'center' });
    doc.moveDown();

    // Grade and Date
    doc.fontSize(12).font('Helvetica').text(`Grade: ${certificate.grade}`, { align: 'center' });
    doc.text(`Date of Issue: ${new Date(certificate.issueDate).toLocaleDateString()}`, { align: 'center' });

    // Footer / ID
    doc.moveDown(4);
    doc.fontSize(10).text(`Certificate ID: ${certificate.certificateID}`, { align: 'center' });

    doc.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
