# Ara Animal Health Centre Website

A modern, responsive single-page website for Ara Animal Health Centre featuring a clean design with pink and purple branding.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, minimalistic design with smooth animations
- **Interactive Gallery**: Touch-friendly image slider with auto-play
- **Contact Integration**: WhatsApp floating button and social media links
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## Sections

1. **Home**: Hero section with logo, tagline, and call-to-action
2. **Services**: Grid of veterinary services offered
3. **Gallery**: Image carousel showcasing clinic facilities
4. **Our Team**: Staff profiles with photos and roles
5. **Client Reviews**: Customer testimonials with star ratings
6. **Location & Contact**: Contact information and embedded map

## File Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── logo.jpg            # Clinic logo
└── README.md           # This file
```

## Customization

### Updating Contact Information

Edit the following in `index.html`:

- **WhatsApp Number**: Replace `+1234567890` with your actual WhatsApp number
- **Phone**: Update phone number in the contact section
- **Address**: Change the clinic address
- **Email**: Update the email address
- **Social Media**: Update Facebook and Instagram links

### Updating Content

1. **Services**: Modify the services grid in the services section
2. **Team Members**: Update team member information, photos, and roles
3. **Reviews**: Change customer testimonials
4. **Gallery Images**: Replace Unsplash placeholder images with actual clinic photos

### Customizing Colors

The main brand colors are defined in `styles.css`:
- **Primary Pink**: `#EC4899`
- **Primary Purple**: `#8B5CF6`
- **Background**: `#FAFAFA`

To change colors, search and replace these hex codes throughout the CSS file.

### Adding Google Maps

Replace the placeholder Google Maps embed in the contact section:

1. Go to [Google Maps](https://maps.google.com)
2. Search for your clinic location
3. Click "Share" → "Embed a map"
4. Copy the iframe code and replace the existing one

## Performance Optimization

- Images are optimized for web
- CSS and JavaScript are minified-ready
- Lazy loading implemented for better performance
- Mobile-first responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Local Development

1. Download all files to a folder
2. Open `index.html` in a web browser
3. For best results, serve through a local web server

### Using Python (if installed):
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

### Using Node.js (if installed):
```bash
npx serve .
```

## Deployment

The website is a static site and can be deployed to:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Traditional web hosting**

Simply upload all files to your web server's public directory.

## SEO Checklist

- [ ] Update meta title and description
- [ ] Add proper alt text to all images
- [ ] Submit to Google Search Console
- [ ] Create and submit sitemap.xml
- [ ] Add Google Analytics (optional)

## Maintenance

- Regularly update team member information
- Keep service offerings current
- Update gallery images periodically
- Monitor and respond to contact form submissions (if added)

## Future Enhancements

Potential additions for the future:
- Online appointment booking system
- Blog section for pet care tips
- Client portal
- Contact form with backend processing
- Multi-language support

## Support

For technical support or customization requests, please contact your web developer.

---

© 2024 Ara Animal Health Centre. All rights reserved.
