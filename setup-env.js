#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envTemplate = `# Contentstack Configuration
# Replace these with your actual Contentstack credentials
CONTENTSTACK_API_KEY=your_api_key_here
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=your_environment_here
CONTENTSTACK_REGION=eu

# Client-side (public) variables for the chatbot component
NEXT_PUBLIC_CONTENTSTACK_API_KEY=your_api_key_here
NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
NEXT_PUBLIC_NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=your_environment_here
`;

const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Created .env.local file with template');
  console.log('📝 Please update the file with your actual Contentstack credentials');
} else {
  console.log('⚠️  .env.local file already exists');
  console.log('📝 Please check your Contentstack credentials in the file');
}

console.log('\n🔧 Required Contentstack credentials:');
console.log('   - API Key');
console.log('   - Delivery Token');
console.log('   - Environment Name');
console.log('   - Region (optional, defaults to "eu")');
console.log('\n🌐 Public vars for client chatbot:');
console.log('   - NEXT_PUBLIC_CONTENTSTACK_API_KEY');
console.log('   - NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN');
console.log('   - NEXT_PUBLIC_NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT');
console.log('\n📖 See SETUP.md for detailed instructions');
