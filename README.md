# Travel Booking Website

A modern travel booking website built with Next.js, TypeScript, Tailwind CSS, and Contentstack CMS.

## Features

- 🏖️ **Tour Listings**: Browse and search through available tours
- 📋 **Booking System**: Complete booking flow with form validation
- ❓ **FAQ Section**: Frequently asked questions with search functionality
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🎨 **Modern UI**: Clean and intuitive user interface
- 🔍 **Search & Filters**: Advanced filtering and search capabilities
- 📞 **Contact Page**: Contact form and company information

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Contentstack
- **Icons**: Heroicons
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Contentstack account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd travel-booking
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with your Contentstack credentials:

```env
CONTENTSTACK_API_KEY=your_api_key_here
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
CONTENTSTACK_ENVIRONMENT=your_environment_here
CONTENTSTACK_REGION=eu
```

For the client-side chatbot component, also add the public variables so the browser can read them:

```env
NEXT_PUBLIC_CONTENTSTACK_API_KEY=your_api_key_here
NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=your_environment_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contentstack Setup

### Content Types

The application expects two content types in Contentstack:

#### 1. Tour Content Type
- `title` (Single Line Textbox)
- `description` (Rich Text Editor)
- `country` (Single Line Textbox)
- `duration` (Single Line Textbox)
- `price` (Number)
- `tags` (Tags)

#### 2. FAQ Content Type
- `title` (Single Line Textbox)
- `question` (Single Line Textbox)
- `answers` (Rich Text Editor)
- `tags` (Tags)

### Sample Data

The application comes with sample data that matches the provided Contentstack structure:

**Tours:**
- Swiss Alps Adventure (Switzerland, 10 Days, $1800)
- Italy Explorer (Italy, 7 Days, $1200)
- French Riviera Escape (France, 5 Days, $1500)

**FAQs:**
- Booking process
- Payment methods
- Cancellation policy
- Travel insurance
- Accommodation details
- Support contact

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── tours/         # Tour-related endpoints
│   │   └── faqs/          # FAQ endpoints
│   ├── contact/           # Contact page
│   ├── faq/               # FAQ page
│   ├── tours/             # Tours listing page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── BookingForm.tsx    # Booking modal form
│   ├── FAQItem.tsx        # FAQ accordion item
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Site header
│   └── TourCard.tsx       # Tour display card
├── lib/                   # Utility functions
│   └── contentstack.ts    # Contentstack SDK setup
└── types/                 # TypeScript type definitions
    └── index.ts           # Type definitions
```

## API Endpoints

- `GET /api/tours` - Fetch all tours
- `GET /api/tours/[uid]` - Fetch specific tour by UID
- `GET /api/faqs` - Fetch all FAQs

## Features in Detail

### Home Page
- Hero section with call-to-action
- Featured tours showcase
- Why choose us section
- FAQ preview
- Newsletter signup

### Tours Page
- Grid layout of all available tours
- Search functionality
- Filter by country and price range
- Sort by various criteria
- Responsive design

### FAQ Page
- Searchable FAQ section
- Accordion-style display
- Contact information
- Social media links

### Booking Flow
- Modal-based booking form
- Form validation
- Tour details display
- Contact information collection
- Special requests handling

## Customization

### Styling
The application uses Tailwind CSS with custom utility classes defined in `globals.css`. You can customize:
- Color scheme in `tailwind.config.js`
- Component styles in `globals.css`
- Individual component styles

### Content
All content is managed through Contentstack CMS. To add new tours or FAQs:
1. Log into your Contentstack dashboard
2. Navigate to the respective content type
3. Create new entries
4. Publish the content

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `CONTENTSTACK_API_KEY` | Your Contentstack API key | Yes |
| `CONTENTSTACK_DELIVERY_TOKEN` | Your Contentstack delivery token | Yes |
| `CONTENTSTACK_ENVIRONMENT` | Your Contentstack environment | Yes |
| `CONTENTSTACK_REGION` | Contentstack region (default: eu) | No |
| `NEXT_PUBLIC_CONTENTSTACK_API_KEY` | Public API key for chatbot (client) | Yes (for chatbot) |
| `NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN` | Public delivery token for chatbot (client) | Yes (for chatbot) |
| `NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT` | Public environment for chatbot (client) | Yes (for chatbot) |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@travelbooking.com or create an issue in the repository.