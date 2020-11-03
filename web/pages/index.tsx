import Head from 'next/head';
import NextLink from 'next/link';
import Api from 'api';
import styles from '../styles/Home.module.css';

const Home: React.FC = ({ posts }: any) => {
  console.log('posts', posts);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {posts.map(
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
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    ...,
    'slug': slug.current,
    'categories': categories[]->.title
  }`;
  const posts = await Api.fetch(query);
  return {
    props: {
      posts,
    },
    revalidate: 1, // In seconds
  };
}
