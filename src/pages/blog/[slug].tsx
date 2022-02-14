import { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import hydrate from 'next-mdx-remote/hydrate';

import * as PostsApi from 'src/api/posts';
import { useHeader } from 'src/hooks';
import { Fallback, MXDComponents } from 'src/components';
import { PostLayout } from 'src/layouts';

const Post: NextPage = ({ post = {}, preview }: any) => {
  const { mdxContent, title = '', ...rest } = post;

  const router = useRouter();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle(title);

    return () => {
      setTitle('');
    };
  }, [setTitle, title]);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  if (router.isFallback) {
    return <Fallback />;
  }

  const content = hydrate(mdxContent, {
    components: MXDComponents,
  });

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostLayout preview={preview} post={{ content, ...rest }} />
    </>
  );
};

export async function getStaticPaths() {
  const posts = await PostsApi.getAllPostsWithSlug();
  return {
    paths:
      posts?.map((p) => ({
        params: {
          slug: p.slug,
        },
      })) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const post = await PostsApi.getPost(params.slug, preview);

  return {
    props: { preview, post },
  };
}

export default Post;
