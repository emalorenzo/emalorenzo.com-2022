import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Post: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{router.query.slug}</h1>
    </div>
  );
};

// Post.getInitialProps = async (context) => {
//   // It's important to default the slug so that it doesn't return "undefined"
//   const { slug = '' } = context.query;
//   // return await client.fetch(
//   //   `
//   //   *[_type == "post" && slug.current == $slug][0]
//   // `,
//   //   { slug }
//   // );
// };

export default Post;
