import { motion } from 'framer-motion';
import type { GetStaticProps, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import * as PostsApi from '@/api/posts';
import { Head, OverflowHidden, PostCard, VideoAvatar } from '@/components';

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
      <div>
        <div>
          <section
            style={{
              alignItems: 'center',
              display: 'flex',
              fontSize: '1rem',
              width: '100%',
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
                  initial={{ opacity: 0.7, y: '1em' }}
                  animate={{ opacity: 1, y: 0 }}
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
