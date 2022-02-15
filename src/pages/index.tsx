import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { Flex, Heading, Box, HStack } from '@chakra-ui/react';
import DrawBlob, { BlobType } from 'blob-animated';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { chatData } from '@/data/chat';
import {
  PostCard,
  MotionFlex,
  Chat,
  VideoAvatar,
  OverflowHidden,
} from '@/components';

import * as PostsApi from 'src/api/posts';

const MotionText = styled(motion.h1)`
  font-size: 5rem;
  line-height: 1;
  margin-right: 0.2em;
  /* background: -webkit-linear-gradient(
    0,
    hsl(180 100% 50%),
    hsl(0 0% 90%),
    hsl(180 100% 50%)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
`;

const Wrapper = styled.main`
  display: grid;
  place-items: center;
  height: 100%;
`;

const Home: NextPage = ({ allPosts, preview }: any) => {
  return (
    <Wrapper>
      <Head>
        <title>Ema Lorenzo</title>
      </Head>

      {/* hero */}
      <Flex
        direction="row"
        justify="center"
        align="center"
        py={160}
        px={20}
        bg="gray.900"
        position="relative"
        overflow="hidden"
      >
        <Flex
          h="full"
          w="full"
          position="relative"
          zIndex="1"
          justify="center"
          align="stretch"
        >
          {/* chat */}
          {/* <MotionFlex
            direction="column"
            p={4}
            borderWidth={1}
            borderRadius={16}
            bg="white"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2 }}
          >
            <Text as="h1" fontSize="2rem">
              Hey,
            </Text>
            <Box display="inline">
              <Text fontSize="1rem">
                Soy Ema, un fullstack dev de 🇦🇷. <br />
                Este es mi espacio donde comparto lo que aprendo
              </Text>
            </Box>
          </MotionFlex> */}

          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <OverflowHidden>
              <MotionText
                initial={{ y: '1em', opacity: 0.7 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Hey!
              </MotionText>
            </OverflowHidden>
            <VideoAvatar />
          </div>

          {/* <Chat w={500} chatData={chatData} />

          <Box
            as="svg"
            w="400px"
            h="400px"
            viewBox="0 0 170 170"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="user-space" clipPathUnits="userSpaceOnUse">
                <path
                  fill="#FF0066"
                  d="M49.5,-65.4C58.2,-51.8,55.1,-30.5,54.2,-12.9C53.4,4.7,54.7,18.5,49.1,28.6C43.6,38.6,31.1,44.8,17.6,50.9C4.1,57,-10.5,62.8,-22.5,59.5C-34.5,56.1,-44.1,43.5,-53.7,29.7C-63.3,15.8,-73,0.6,-73.4,-15.7C-73.8,-32,-65,-49.4,-51.2,-62.2C-37.4,-75,-18.7,-83.1,0.9,-84.1C20.4,-85.2,40.9,-79.1,49.5,-65.4Z"
                  transform="translate(100 100)"
                />
              </clipPath>
            </defs>

            <image
              width="100%"
              height="100%"
              // preserveAspectRatio="xMinYMin slice"
              href="/images/ema.png"
              clipPath="url(#user-space)"
            />
          </Box> */}
        </Flex>
      </Flex>

      {/* posts */}
      {/* <Flex direction="column" p={32}>
        <Heading as="h2" mt={20}>
          Mas popular
        </Heading>
        <HStack spacing={5} my={5}>
          {allPosts.map((post) => {
            return post.slug && <PostCard key={post.slug} post={post} />;
          })}
        </HStack>
      </Flex> */}
    </Wrapper>
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
