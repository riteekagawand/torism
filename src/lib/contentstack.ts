import contentstack from '@contentstack/delivery-sdk';

// Check if required environment variables are present
const hasValidConfig = () => {
  return !!(
    process.env.CONTENTSTACK_API_KEY &&
    process.env.CONTENTSTACK_DELIVERY_TOKEN &&
    process.env.CONTENTSTACK_ENVIRONMENT
  );
};

// Initialize Contentstack Stack only if config is valid
let Stack: any = null;

if (hasValidConfig()) {
  try {
    Stack = contentstack.stack({
      apiKey: process.env.CONTENTSTACK_API_KEY!,
      deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
      environment: process.env.CONTENTSTACK_ENVIRONMENT!,
      region: (process.env.CONTENTSTACK_REGION as any) || 'eu',
    });
  } catch (error) {
    console.error('Failed to initialize Contentstack:', error);
  }
}

export default Stack;

// Helper function to test Contentstack connection and list content types
export async function testContentstackConnection() {
  try {
    if (!hasValidConfig() || !Stack) {
      throw new Error('Contentstack configuration is missing or invalid');
    }
    
    console.log('Testing Contentstack connection...');
    console.log('Stack configuration:', {
      apiKey: process.env.CONTENTSTACK_API_KEY ? 'Set' : 'Missing',
      deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN ? 'Set' : 'Missing',
      environment: process.env.CONTENTSTACK_ENVIRONMENT,
      region: process.env.CONTENTSTACK_REGION || 'eu'
    });
    
    // Try to fetch content types using the correct method
    const result = await Stack.contentType().query().find();
    console.log('Available content types:', result);
    return result;
  } catch (error: any) {
    console.error('Contentstack connection test failed:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
}

// Helper function to fetch tours
export async function fetchTours() {
  try {
    if (!hasValidConfig() || !Stack) {
      console.log('Contentstack configuration check:', {
        hasValidConfig: hasValidConfig(),
        stackExists: !!Stack,
        apiKey: process.env.CONTENTSTACK_API_KEY ? 'Set' : 'Missing',
        deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN ? 'Set' : 'Missing',
        environment: process.env.CONTENTSTACK_ENVIRONMENT ? 'Set' : 'Missing'
      });
      throw new Error('Contentstack configuration is missing or invalid');
    }
    
    console.log('Attempting to fetch tours from Contentstack...');
    const result = await Stack.contentType('tour').entry().query().find();
    console.log('Tours fetched successfully:', result);
    return { entries: result.items || result.entries || [] }; // Returns the result which contains entries array
  } catch (error: any) {
    console.error('Error fetching tours:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return { entries: [] };
  }
}

// Helper function to fetch FAQs
export async function fetchFAQs() {
  try {
    if (!hasValidConfig() || !Stack) {
      throw new Error('Contentstack configuration is missing or invalid');
    }
    
    const result = await Stack.contentType('faqs').entry().query().find();
    console.log('FAQs fetched successfully:', result);
    return { entries: result.items || result.entries || [] }; // Returns the result which contains entries array
  } catch (error: any) {
    console.error('Error fetching FAQs:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return { entries: [] };
  }
}

// Helper function to fetch a single tour by UID
export async function fetchTourByUID(uid: string) {
  try {
    if (!hasValidConfig() || !Stack) {
      throw new Error('Contentstack configuration is missing or invalid');
    }
    
    const result = await Stack.contentType('tour').entry().query().where('uid', uid).find();
    return result.items?.[0] || null;
  } catch (error: any) {
    console.error('Error fetching tour by UID:', error);
    return null;
  }
}
