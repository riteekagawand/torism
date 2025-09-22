# Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with your Contentstack credentials:

```env
CONTENTSTACK_API_KEY=your_api_key_here
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
CONTENTSTACK_ENVIRONMENT=your_environment_here
CONTENTSTACK_REGION=eu
```

If you want the client-side chatbot to work, also expose read-only credentials to the browser using public vars:

```env
NEXT_PUBLIC_CONTENTSTACK_API_KEY=your_api_key_here
NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=your_environment_here
```

For creating content (server), add management credentials and an admin secret:

```env
# Server-side management
CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token
CONTENTSTACK_API_KEY=your_stack_api_key
CONTENTSTACK_ENVIRONMENT=your_environment_name
ADMIN_SHARED_SECRET=some-long-random-secret
# Optional: expose matching admin key to the browser admin page
NEXT_PUBLIC_ADMIN_SHARED_SECRET=some-long-random-secret
```

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file with your Contentstack credentials:
```bash
# Copy the example and fill in your actual values
cp .env.local.example .env.local
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contentstack Integration

The application is now configured to fetch data directly from your Contentstack instance. Make sure you have:

1. **API Key**: Your Contentstack API key
2. **Delivery Token**: Your Contentstack delivery token  
3. **Environment**: Your Contentstack environment name
4. **Region**: Your Contentstack region (default: us)

## Content Types Required

The application expects these content types in your Contentstack:

### Tour Content Type
- `title` (Single Line Textbox)
- `description` (Rich Text Editor)
- `country` (Single Line Textbox)
- `duration` (Single Line Textbox)
- `price` (Number)
- `tags` (Tags)

### FAQ Content Type
- `title` (Single Line Textbox)
- `question` (Single Line Textbox)
- `answers` (Rich Text Editor)
- `tags` (Tags)

## Features

- ✅ Home page with hero section and featured tours
- ✅ Tours listing page with search and filters
- ✅ FAQ page with search functionality
- ✅ Contact page with form
- ✅ Booking modal with form validation
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript support
- ✅ Real Contentstack integration (no mock data)
