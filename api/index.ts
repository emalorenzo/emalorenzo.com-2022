import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_DATASET,
  useCdn: false, // `false` if you want to ensure fresh data
});
