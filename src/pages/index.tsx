import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { PostCard, VideoAvatar, OverflowHidden, Head } from '@/components';

import * as PostsApi from 'src/api/posts';

const MotionText = styled(motion.h1)`
  font-size: 5rem;
  line-height: 1;
  margin-right: 0.3em;
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
      <Head />

      {/* hero */}
      <div>
        <div>
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

          <section
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              fontSize: '1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginRight: '4em',
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
              <OverflowHidden>
                <p>
                  Soy
                  <span style={{ fontSize: '2em' }}>Emanuel Lorenzo</span>
                </p>
              </OverflowHidden>
              <p>Frontend Developer de Argentina 🇦🇷</p>
            </div>
            <VideoAvatar />
          </section>
        </div>
      </div>

      {/* posts */}
      <section>
        {allPosts.map((post) => {
          return post.slug && <PostCard key={post.slug} post={post} />;
        })}
      </section>
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
