import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Flex, Heading, Text, Box } from '@chakra-ui/react';

const ErrorPage: NextPage = () => {
  return (
    <Flex as="main" justify="center" align="center">
      <Head>
        <title>Ema Lorenzo</title>
      </Head>

      <Heading>ese link no lleva a ningun lado.. 🤷🏻‍♂️ </Heading>
    </Flex>
  );
};

export default ErrorPage;
