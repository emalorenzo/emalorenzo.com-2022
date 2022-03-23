import { Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import * as PostsApi from '@/api/posts';
import { Head, OverflowHidden, PostCard, VideoAvatar } from '@/components';
import { MainLayout } from '@/layouts';
import { useStore } from '@/lib/store';
import { HomeScene } from '@/scenes';
import type { NextPageWithLayout, Scene } from '@/types';

const MotionText = styled(motion.h1)`
  font-size: 5rem;
  line-height: 1;
  margin-right: 0.3em;
`;

const HtmlScene: Scene = () => (
  <Html>
    <h1>Hey</h1>
    <p>This are my examples</p>
  </Html>
);

const Wrapper = styled.main`
  display: grid;
  place-items: center;
  /* justify-content: center; */
  height: 100%;
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: black;
  display: grid;
  place-content: center;

  &:hover {
    background-color: #020202;
  }
`;

const HomePage: NextPageWithLayout = ({ allPosts }: any) => {
  return (
    <>
      <Wrapper>
        <Head />
        {/* <section
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
      </section> */}
        {/* posts */}
        {/* <section>
        {allPosts.map((post) => {
          return post.slug && <PostCard key={post.slug} post={post} />;
        })}
      </section> */}
        <BoxWrapper>
          {[1, 2, 3, 4, 5].map((i) => (
            <Box
              key={i}
              style={{
                zIndex: i % 2 === 0 ? 1 : 0,
              }}
            >
              i
            </Box>
          ))}
        </BoxWrapper>
        {/* @ts-ignore */}
        {/* <div
          style={{
            padding: '5rem',
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
            backgroundColor: 'black',
            height: '150vh',
            // position: 'relative',
            left: '30%',
          }}
        >
          <Link href="/basic-scene" passHref>
            <a>
              <span style={{ color: 'white' }}>Basic Scene</span>
            </a>
          </Link>
          <Link href="/follow-path" passHref>
            <a>
              <span style={{ color: 'white' }}>Follow Path</span>
            </a>
          </Link>
        </div> */}
      </Wrapper>
      <HomeScene r3f />
      <HtmlScene r3f />
    </>
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
