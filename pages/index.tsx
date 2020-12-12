import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import Image from 'next/image';
import * as PostsApi from 'api/posts';
import { Flex, Heading, Text, Button, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Layout } from 'components';

const MotionHeading = motion.custom(Heading);
const MotionFlex = motion.custom(Flex);

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const Post = ({ post }) => {
  const { title = '', slug = '', _updatedAt = '' } = post;
  return (
    <MotionFlex
      direction="row"
      overflow="hidden"
      bg="white"
      borderRadius="0.5rem"
      m="1rem"
      boxShadow="base"
      cursor="pointer"
      height="auto"
      alignItems="stretch"
      p={0}
      flexBasis={['auto', '45%']}
      // href={`blog/${slug}`}
      layoutId={`${slug}-container`}
      // transition={{
      //   type: 'spring',
      //   stiffness: 500,
      //   damping: 100,
      // }}
      variants={sidebar}
    >
      <NextLink href={`blog/${slug}`}>
        <Flex direction="column" flex={1} p={8}>
          <MotionHeading
            as="h3"
            fontWeight="500"
            fontSize="2rem"
            // layoutId={`${slug}-title`}
          >
            Hello World
          </MotionHeading>
          <Text>({new Date(_updatedAt).toDateString()})</Text>
        </Flex>
      </NextLink>{' '}
      <MotionFlex
        layoutId={`${slug}-image`}
        transform="rotateX(19deg) rotateY(37deg) rotateZ(366deg) scale(2.5)"
        // background="red.200"
        w={20}
        h={20}
      >
        <Image src="/code.png" width="5rem" height="5rem" />
      </MotionFlex>
    </MotionFlex>
  );
};

const Home: NextPage = ({ allPosts, preview }: any) => {
  return (
    <Layout preview={preview}>
      <Head>
        <title>Ema Lorenzo</title>
      </Head>
      <Flex direction="column" bg="gray.100" w="100%">
        <Heading>Ema Lorenzo</Heading>
        {allPosts.map((post) => {
          console.log(`post: ${JSON.stringify(post, null, 2)}`);
          return post.slug && <Post key={post.slug} post={post} />;
        })}
      </Flex>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await PostsApi.getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
    revalidate: 1, // In seconds
  };
};
