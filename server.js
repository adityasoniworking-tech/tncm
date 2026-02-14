const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Define MIME types for serving different file formats
const MIMETYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webmanifest': 'application/manifest+json',
    '.xml': 'application/xml'
};

// Define your Clean URL Rewrites here
const REWRITES = {
    '/menu': '/html/menu.html',
    '/about': '/html/about.html',
    '/contact': '/html/contact.html',
    '/tracking': '/html/tracking.html',
    '/whatsapp': '/html/whatsapp_select.html',
    '/offline': '/html/offline.html',
};

const server = http.createServer((req, res) => {
    // Remove query parameters to find the file correctly
    let url = req.url.split('?')[0];

    // 1. Check for Rewrites (Clean URLs)
    if (REWRITES[url]) {
        url = REWRITES[url];
    }
    
    // 2. Default Route (Home)
    if (url === '/') {
        url = '/index.html';
    }

    // 3. Construct file path
    let filePath = path.join(__dirname, url);
    let ext = path.extname(filePath).toLowerCase();

    // 4. Serve File
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found (404)
                console.log(`404 Not Found: ${req.url}`);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404: Page Not Found</h1><p>Check your URL or server.js configuration.</p>', 'utf-8');
            } else {
                // Server error (500)
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success (200)
            const contentType = MIMETYPES[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 Local Server Running!`);
    console.log(`👉 Open: http://127.0.0.1:${PORT}`);
    console.log(`✨ Clean URLs enabled (e.g., /menu works instead of /html/menu.html)\n`);
});
