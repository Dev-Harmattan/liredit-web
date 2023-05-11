import { Flex, Box, Link, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const [{ data }] = useMeQuery();
  let body = null;

  if (!data?.me?.username) {
    body = (
      <>
        <Box display={'inline-block'} mr={2}>
          <NextLink href="/register">Register</NextLink>
        </Box>
        <Box display={'inline-block'}>
          <NextLink href="/login">Login</NextLink>
        </Box>
      </>
    );
  }

  if (data?.me?.username) {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button variant="link">Logout</Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tomato" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
