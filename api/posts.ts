import client, { previewClient } from '../lib/sanity';

const getUniquePosts = (posts) => {
  const slugs = new Set();
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false;
    }
    slugs.add(post.slug);
    return true;
  });
};

const postFields = `
  name,
  title,
  date,
  excerpt,
  'slug': slug.current,
  'coverImage': coverImage.asset->url,
  'categories': categories[]->.title,
`;

const getClient = (preview) => (preview ? previewClient : client);

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(date desc){
      ${postFields}
      content
    }`,
    { slug }
  );
  return data[0];
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`);
  return data;
}

export async function getAllPostsForHome(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(_createdAt desc, _updatedAt desc){
      ${postFields}
    }`);
  console.log('results', results);
  return getUniquePosts(results);
}

export async function getPostAndMorePosts(slug, preview) {
  console.log(slug, preview);
  const curClient = getClient(preview);

  const [post] = await curClient.fetch(
    `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
      ${postFields}
      content,
    }`,
    { slug }
  );

  const nextPosts = await curClient.fetch(
    `*[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc){
          ${postFields}
          content,
        }[0...2]`,
    { slug }
  );

  console.log(`post: ${post} - nextPosts: ${nextPosts}`);

  return { post, nextPosts: getUniquePosts(nextPosts) };
}