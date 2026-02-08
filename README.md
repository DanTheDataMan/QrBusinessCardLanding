# QR Business Card Generator

A professional QR code generator that creates URLs for digital business cards with full vCard support. Users can customize their landing page with logos, themes, and branding, then generate QR codes that link to beautiful digital business cards.

## Features

### ✨ Core Functionality
- **Complete vCard Generation**: Support for all vCard fields including:
  - Personal information (name, title, organization)
  - Contact details (email, phone, website)
  - Physical address
  - Social media links (LinkedIn, Twitter)
  - Profile photos
  - Custom notes
- **QR Code Generation**: High-quality QR codes with customizable colors based on theme
- **Landing Page**: Beautiful, responsive digital business card display

### 🎨 Customization Options
- **5 Professional Themes**:
  - Professional Blue (Default)
  - Modern Dark
  - Elegant Purple
  - Fresh Green
  - Warm Orange
- **Logo Upload**: Add your company logo to the header
- **Profile Photos**: Include profile pictures in your digital card
- **Live Preview**: See how your card will look before generating the QR code

### 📱 User Experience
- Fully responsive design (mobile, tablet, desktop)
- One-click download of QR codes
- Direct vCard file download (.vcf) for easy contact saving
- Share functionality with native Web Share API
- Copy landing page URL to clipboard

### ☁️ Azure Deployment
- Optimized for Azure Static Web Apps (Free Tier)
- GitHub Actions workflow included for CI/CD
- No build process required - pure HTML/CSS/JavaScript
- Minimal hosting costs (free tier is sufficient)

## Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/DanTheDataMan/QrBusinessCardLanding.git
cd QrBusinessCardLanding
```

2. Open in a local web server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Or simply open index.html in your browser
```

3. Navigate to `http://localhost:8000` in your browser

### Azure Static Web Apps Deployment

#### Prerequisites
- Azure account with an active subscription
- GitHub account

#### Setup Steps

1. **Create an Azure Static Web App**:
   - Go to the [Azure Portal](https://portal.azure.com)
   - Click "Create a resource" → Search for "Static Web App"
   - Click "Create"
   - Fill in the details:
     - Subscription: Choose your subscription
     - Resource Group: Create new or use existing
     - Name: Choose a unique name (e.g., `qr-business-cards`)
     - Plan type: Free
     - Region: Choose the closest region
     - Source: GitHub
     - GitHub account: Authorize Azure to access your GitHub
     - Organization: Your GitHub username/org
     - Repository: `QrBusinessCardLanding`
     - Branch: `main`
     - Build Presets: Custom
     - App location: `/`
     - Api location: (leave empty)
     - Output location: (leave empty)

2. **Configure Secrets**:
   - Azure will automatically create a GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - This is used by the GitHub Actions workflow for deployment

3. **Deploy**:
   - Push your code to the `main` branch
   - GitHub Actions will automatically build and deploy
   - Your site will be available at: `https://[your-app-name].azurestaticapps.net`

4. **Custom Domain (Optional)**:
   - In Azure Portal, go to your Static Web App
   - Click "Custom domains" → "Add"
   - Follow instructions to add your custom domain

## Usage

### Creating a Digital Business Card

1. **Choose Your Theme**: Select from 5 professional color schemes
2. **Upload Your Logo** (Optional): Add branding to your landing page
3. **Fill in Contact Information**:
   - Required: First Name, Last Name, Email
   - Optional: All other fields including phone, address, social media, etc.
4. **Add Profile Photo** (Optional): Upload a professional headshot
5. **Generate QR Code**: Click the button to create your QR code
6. **Preview**: Review how your landing page will appear
7. **Download & Share**:
   - Download the QR code image
   - Download the vCard file (.vcf)
   - Copy the landing page URL
   - Share via social media or messaging

### Scanning the QR Code

When someone scans your QR code:
1. They're directed to a beautiful landing page with your information
2. They can add you to contacts with one click (downloads .vcf file)
3. They can share your card with others
4. All your contact info is displayed in an organized, professional format

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **QR Code Library**: QRCode.js (CDN)
- **Hosting**: Azure Static Web Apps
- **CI/CD**: GitHub Actions
- **Standards**: vCard 3.0 specification

## File Structure

```
QrBusinessCardLanding/
├── index.html                 # Main application (QR generator)
├── card.html                  # Landing page (digital business card)
├── styles.css                 # Styling for generator page
├── app.js                     # Application logic
├── staticwebapp.config.json   # Azure Static Web Apps configuration
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml  # Deployment workflow
└── README.md                  # This file
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security & Privacy

- All data processing happens client-side (in the browser)
- No data is sent to external servers
- Landing page URLs contain encoded data but no sensitive information is exposed
- Content Security Policy headers included
- HTTPS enforced on Azure Static Web Apps

## Cost Estimation

Using Azure Static Web Apps Free Tier:
- **Bandwidth**: 100 GB/month (free)
- **Storage**: Included
- **Custom domains**: Supported
- **SSL certificates**: Automatic and free
- **Estimated monthly cost**: **$0** (within free tier limits)

The free tier is sufficient for:
- Small to medium businesses
- Individual professionals
- Event organizers
- Up to thousands of card views per month

## Customization

### Adding New Themes

Edit `styles.css` to add new theme variables:

```css
body.theme-yourtheme {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
    --bg-color: #your-color;
    /* ... other theme variables */
}
```

Then add the theme option to the select dropdown in `index.html`.

### Modifying vCard Fields

To add new fields:
1. Add input fields in `index.html`
2. Update `generateVCardData()` function in `app.js`
3. Update landing page generation in both `app.js` (preview) and `card.html`

## Troubleshooting

### QR Code Not Generating
- Ensure all required fields are filled (First Name, Last Name, Email)
- Check browser console for JavaScript errors

### Landing Page Not Loading
- Verify the URL contains the `?data=` parameter
- Check that the encoded data is valid base64

### Azure Deployment Issues
- Ensure `AZURE_STATIC_WEB_APPS_API_TOKEN` secret is properly set
- Check GitHub Actions logs for deployment errors
- Verify staticwebapp.config.json is valid JSON

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Roadmap

Future enhancements may include:
- [ ] Backend API for persistent card storage
- [ ] Analytics dashboard
- [ ] QR code customization (colors, logos)
- [ ] Multiple card management
- [ ] CSV import for bulk card creation
- [ ] Integration with CRM systems

---

**Built with ❤️ for professionals who want to share their contact information in style**
