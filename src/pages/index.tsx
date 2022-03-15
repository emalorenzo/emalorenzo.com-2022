import { motion } from 'framer-motion';
import type { GetStaticProps } from 'next';
import React from 'react';
import styled from 'styled-components';

import * as PostsApi from '@/api/posts';
import { Head, OverflowHidden, PostCard, VideoAvatar } from '@/components';
import { MainLayout } from '@/layouts';
import type { NextPageWithLayout } from '@/types';

const MotionText = styled(motion.h1)`
  font-size: 5rem;
  line-height: 1;
  margin-right: 0.3em;
`;

const Wrapper = styled.main`
  display: grid;
  place-items: center;
  justify-content: center;
  height: 100%;
`;

const HomePage: NextPageWithLayout = ({ allPosts }: any) => {
  return (
    <Wrapper>
      <Head />
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

      {/* posts */}
      <section>
        {allPosts.map((post) => {
          return post.slug && <PostCard key={post.slug} post={post} />;
        })}
      </section>
    </Wrapper>
  );
};

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await PostsApi.getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
    revalidate: 1, // In seconds
  };
};

export default HomePage;
