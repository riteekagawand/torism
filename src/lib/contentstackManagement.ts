import axios from 'axios';

type CreateTourInput = {
  title: string;
  description: string;
  country: string;
  duration: string;
  price: number;
  tags?: string[];
};

function getBaseUrl() {
  const region = (process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || 'eu').toLowerCase();
  // Map common regions to base domains
  if (region === 'us') return 'https://api.contentstack.io';
  if (region === 'eu') return 'https://eu-api.contentstack.com';
  if (region === 'azure-na') return 'https://azure-na-api.contentstack.com';
  if (region === 'azure-eu') return 'https://azure-eu-api.contentstack.com';
  if (region === 'gcp-na') return 'https://gcp-na-api.contentstack.com';
  if (region === 'gcp-eu') return 'https://gcp-eu-api.contentstack.com';
  return 'https://eu-api.contentstack.com';
}

export async function createTourEntry(input: CreateTourInput) {
  const environment = process.env.CONTENTSTACK_ENVIRONMENT;
  if (!environment) {
    throw new Error('CONTENTSTACK_ENVIRONMENT is required');
  }

  const apiKey = process.env.CONTENTSTACK_API_KEY;
  const managementToken = process.env.CONTENTSTACK_MANAGEMENT_TOKEN;
  if (!apiKey || !managementToken) {
    throw new Error('Missing CONTENTSTACK_API_KEY or CONTENTSTACK_MANAGEMENT_TOKEN');
  }

  const baseUrl = getBaseUrl();
  const headers = {
    'Content-Type': 'application/json',
    api_key: apiKey,
    authorization: managementToken,
  } as const;

  // Create entry
  const createRes = await axios.post(
    `${baseUrl}/v3/content_types/tour/entries`,
    {
      entry: {
        title: input.title,
        description: input.description,
        country: input.country,
        duration: input.duration,
        price: input.price,
        tags: input.tags || [],
      },
    },
    { headers }
  );

  const entry = createRes.data?.entry;
  const uid: string = entry?.uid;
  if (!uid) {
    throw new Error('Entry creation did not return a UID');
  }

  // Publish entry
  await axios.post(
    `${baseUrl}/v3/content_types/tour/entries/${uid}/publish`,
    {
      entry: {
        environments: [environment],
        locales: ['en-us'],
      },
    },
    { headers }
  );

  return entry;
}


