import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import * as PostsApi from 'api/posts';

const MotionHeading = motion.custom(Heading);
const MotionFlex = motion.custom(Flex);

const Post: NextPage = ({ post, morePosts, preview }) => {
  console.log(`post: ${post}`);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex h="100vh" w="100%" bg="gray.200">
        <MotionFlex
          direction="row"
          layoutId={`${router.query.slug}-container`}
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
            // layoutId={`${router.query.slug}-title`}
          >
            Hello World
          </MotionHeading>
          <MotionFlex
            layoutId={`${router.query.slug}-image`}
            transform="rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(2.5)"
            // background="red.200"
            w={20}
            h={40}
            position="absolute"
            right={5}
            top={5}
          >
            <Image src="/code.png" width="full" height="full" />
          </MotionFlex>
        </MotionFlex>
      </Flex>
    </div>
  );
};

// export async function getStaticProps({ params, preview = false }) {
//   const data = await PostsApi.getPostAndMorePosts(params.slug, preview);
//   return {
//     props: {
//       preview,
//       post: data?.post || null,
//       morePosts: data?.morePosts || null,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const allPosts = await PostsApi.getAllPostsWithSlug();
//   return {
//     paths:
//       allPosts?.map((post) => ({
//         params: {
//           slug: post.slug,
//         },
//       })) || [],
//     fallback: true,
//   };
// }

export default Post;
