import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2024-03-01',
  useCdn: false, // Important: Set to false for real-time writing
  token: import.meta.env.VITE_SANITY_API_TOKEN, // <--- The token allows write access
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};