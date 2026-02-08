// Global variables
let vcardData = null;
let photoDataURL = null;
let qrCode = null;

// Theme Management
function changeTheme() {
    const theme = document.getElementById('theme').value;
    document.body.className = `theme-${theme}`;
}

// Logo Upload
function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const logo = document.getElementById('custom-logo');
            logo.src = e.target.result;
            logo.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function removeLogo() {
    const logo = document.getElementById('custom-logo');
    logo.src = '';
    logo.style.display = 'none';
    document.getElementById('logo-upload').value = '';
}

// Photo Upload
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoDataURL = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Generate vCard Data
function generateVCardData() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const organization = document.getElementById('organization').value;
    const title = document.getElementById('title').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const website = document.getElementById('website').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    const linkedin = document.getElementById('linkedin').value;
    const twitter = document.getElementById('twitter').value;
    const note = document.getElementById('note').value;

    // Build vCard string
    let vcard = 'BEGIN:VCARD\n';
    vcard += 'VERSION:3.0\n';
    vcard += `FN:${firstName} ${lastName}\n`;
    vcard += `N:${lastName};${firstName};;;\n`;
    
    if (organization) vcard += `ORG:${organization}\n`;
    if (title) vcard += `TITLE:${title}\n`;
    if (email) vcard += `EMAIL;TYPE=INTERNET:${email}\n`;
    if (phone) vcard += `TEL;TYPE=CELL:${phone}\n`;
    if (website) vcard += `URL:${website}\n`;
    
    // Address
    if (street || city || state || zip || country) {
        vcard += `ADR;TYPE=WORK:;;${street};${city};${state};${zip};${country}\n`;
    }
    
    // Social Media
    if (linkedin) vcard += `X-SOCIALPROFILE;TYPE=linkedin:${linkedin}\n`;
    if (twitter) vcard += `X-SOCIALPROFILE;TYPE=twitter:${twitter}\n`;
    
    if (note) vcard += `NOTE:${note}\n`;
    
    // Photo
    if (photoDataURL) {
        const photoData = photoDataURL.split(',')[1]; // Remove data URL prefix
        vcard += `PHOTO;ENCODING=b;TYPE=JPEG:${photoData}\n`;
    }
    
    vcard += 'END:VCARD';
    
    return vcard;
}

// Generate QR Code
function generateQR() {
    // Validate required fields
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    if (!firstName || !lastName || !email) {
        alert('Please fill in all required fields (First Name, Last Name, and Email)');
        return;
    }

    // Generate vCard
    vcardData = generateVCardData();
    
    // Create data URL for vCard
    const vcardDataURL = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vcardData);
    
    // Generate landing page URL (for demo, we'll create a base64 encoded version)
    const landingPageURL = generateLandingPageURL();
    
    // Clear previous QR code
    const qrContainer = document.getElementById('qr-code-container');
    qrContainer.innerHTML = '';
    
    // Generate QR code
    qrCode = new QRCode(qrContainer, {
        text: landingPageURL,
        width: 256,
        height: 256,
        colorDark: getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim(),
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Show QR result section
    document.getElementById('qr-result').style.display = 'block';
    document.getElementById('landing-page-url').innerHTML = `
        <strong>Landing Page URL:</strong><br>
        <small>${landingPageURL}</small>
    `;
    
    // Generate and show preview
    generatePreview();
    
    // Scroll to QR code
    document.getElementById('qr-result').scrollIntoView({ behavior: 'smooth' });
}

// Generate Landing Page URL
function generateLandingPageURL() {
    // For a static site, we'll create a URL with encoded data
    // In production, this would be a proper route to a landing page
    const baseURL = window.location.origin + window.location.pathname.replace('index.html', '');
    const data = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        organization: document.getElementById('organization').value,
        title: document.getElementById('title').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        website: document.getElementById('website').value,
        street: document.getElementById('street').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        country: document.getElementById('country').value,
        linkedin: document.getElementById('linkedin').value,
        twitter: document.getElementById('twitter').value,
        note: document.getElementById('note').value,
        photo: photoDataURL,
        theme: document.getElementById('theme').value
    };
    
    // Encode data as base64
    const encodedData = btoa(JSON.stringify(data));
    return `${baseURL}card.html?data=${encodedData}`;
}

// Generate Preview
function generatePreview() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const organization = document.getElementById('organization').value;
    const title = document.getElementById('title').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const website = document.getElementById('website').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    const linkedin = document.getElementById('linkedin').value;
    const twitter = document.getElementById('twitter').value;
    const note = document.getElementById('note').value;

    let addressHTML = '';
    if (street || city || state || zip || country) {
        const addressParts = [street, city, state, zip, country].filter(p => p);
        addressHTML = `<p><strong>📍 Address:</strong> ${addressParts.join(', ')}</p>`;
    }

    const previewHTML = `
        <div class="preview-card">
            ${photoDataURL ? `<img src="${photoDataURL}" alt="Profile Photo">` : ''}
            <h3>${firstName} ${lastName}</h3>
            ${title ? `<p class="job-title">${title}</p>` : ''}
            ${organization ? `<p class="organization">${organization}</p>` : ''}
            
            <div class="preview-contact">
                <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
                ${phone ? `<p><strong>📱 Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
                ${website ? `<p><strong>🌐 Website:</strong> <a href="${website}" target="_blank">${website}</a></p>` : ''}
                ${addressHTML}
                ${linkedin ? `<p><strong>💼 LinkedIn:</strong> <a href="${linkedin}" target="_blank">View Profile</a></p>` : ''}
                ${twitter ? `<p><strong>🐦 Twitter:</strong> ${twitter}</p>` : ''}
                ${note ? `<p><strong>📝 Note:</strong> ${note}</p>` : ''}
            </div>
        </div>
    `;

    document.getElementById('preview-container').innerHTML = previewHTML;
    document.getElementById('preview-section').style.display = 'block';
}

// Download QR Code
function downloadQR() {
    const canvas = document.querySelector('#qr-code-container canvas');
    if (canvas) {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'business-card-qr.png';
        link.href = url;
        link.click();
    }
}

// Download vCard File
function downloadVCard() {
    if (!vcardData) {
        alert('Please generate QR code first');
        return;
    }
    
    const blob = new Blob([vcardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    link.download = `${firstName}_${lastName}.vcf`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

// Copy Landing Page URL
function copyLandingPageURL() {
    const landingPageURL = generateLandingPageURL();
    navigator.clipboard.writeText(landingPageURL).then(() => {
        const originalText = event.target.textContent;
        event.target.textContent = '✓ Copied!';
        setTimeout(() => {
            event.target.textContent = originalText;
        }, 2000);
    }).catch(err => {
        alert('Failed to copy URL: ' + err);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set default theme
    changeTheme();
});
