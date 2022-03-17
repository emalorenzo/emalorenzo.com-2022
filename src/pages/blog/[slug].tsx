import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import hydrate from 'next-mdx-remote/hydrate';
import React from 'react';

import * as PostsApi from '@/api/posts';
import { Fallback, MXDComponents } from '@/components';
import { useHeader } from '@/hooks';
import { BlogPostLayout, MainLayout } from '@/layouts';
import type { NextPageWithLayout } from '@/types';

const BlogPostPage: NextPageWithLayout = ({ post = {}, preview }: any) => {
  const { mdxContent, title = '', ...rest } = post;

  const router = useRouter();
  // const { setTitle } = useHeader();

  // React.useEffect(() => {
  //   setTitle(title);

  //   return () => {
  //     setTitle('');
  //   };
  // }, [setTitle, title]);

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
      <BlogPostLayout preview={preview} post={{ content, ...rest }} />
    </>
  );
};

BlogPostPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export async function getStaticPaths() {
  const posts = await PostsApi.getAllPostsWithSlug();
  return {
    fallback: true,
    paths:
      posts?.map((p) => ({
        params: {
          slug: p.slug,
        },
      })) || [],
  };
}

export async function getStaticProps({ params, preview = false }) {
  const post = await PostsApi.getPost(params.slug, preview);

  return {
    props: { post, preview },
  };
}

export default BlogPostPage;
