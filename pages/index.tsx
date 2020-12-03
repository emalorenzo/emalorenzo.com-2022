import Head from 'next/head';
import NextLink from 'next/link';
import * as PostsApi from 'api/posts';
import { Layout } from 'components';

const Home: React.FC = ({ allPosts, preview }) => {
  console.log(allPosts, preview);
  return (
    <Layout preview={preview}>
      <Head>
        <title>Ema Lorenzo</title>
      </Head>
      {allPosts.map(
        ({ _id, title = '', slug = '', _updatedAt = '' }) =>
          slug && (
            <li key={_id}>
              <NextLink href={`blog/${slug}`}>
                <a>{title}</a>
              </NextLink>{' '}
              ({new Date(_updatedAt).toDateString()})
            </li>
          )
      )}
    </Layout>
  );
};

export default Home;

export async function getStaticProps({ preview = false }) {
  const allPosts = await PostsApi.getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
  };
}
