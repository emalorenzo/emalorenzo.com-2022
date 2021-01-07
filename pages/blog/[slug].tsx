import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Flex, Heading, Text } from '@chakra-ui/react';
import BlockContent from '@sanity/block-content-to-react';

import * as PostsApi from 'api/posts';
import { Fallback, PreviewAlert } from 'components';

const MotionHeading = motion.custom(Heading);
const MotionFlex = motion.custom(Flex);

const Post: NextPage = ({ post, morePosts, preview }: any) => {
  console.log(`post: ${post}`);
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  if (router.isFallback) {
    return <Fallback />;
  }

  console.log('content', post.content);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex bg="gray.200">
        {preview && <PreviewAlert />}
        <MotionFlex
          as="article"
          direction="row"
          borderRadius="0.5rem"
          boxShadow="base"
          bg="white"
          h="80vh"
          w="80%"
          // transition={{
          //   type: 'spring',
          //   stiffness: 500,
          //   damping: 100,
          // }}
        >
          <MotionHeading
            as="h3"
            fontWeight="500"
            fontSize="2rem"
            // layoutId={router.query.slug}
          >
            {post.title}
          </MotionHeading>
          <MotionFlex
            // background="red.200"
            w={20}
            h={40}
            position="absolute"
            right={5}
            top={5}
          >
            <Image src="/code.png" width="full" height="full" />
          </MotionFlex>
          <BlockContent blocks={post.content} />
        </MotionFlex>
      </Flex>
    </div>
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
  const data = await PostsApi.getPostAndMorePosts(params.slug, preview);
  return {
    props: {
      preview,
      post: data?.post || null,
      morePosts: data?.nextPosts || null,
    },
  };
}

export default Post;
