# Zephyr clean deploy package

This zip is safe for Cloudflare Pages direct upload.

Contents:
- index.html (includes Google Analytics G-01D25C63QH)
- functions/api/contact.js (Resend-powered contact endpoint)
- Assets/ (empty – paste your assets here)

Required Cloudflare Pages env vars:
- RESEND_API_KEY
- CONTACT_TO=info@zephyrcreative.co.uk
- FROM_EMAIL=info@zephyrcreative.co.uk (after Resend domain verification)
