import { Flex, Box, Link, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const [{ data }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;
  console.log(data?.me?.username);
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
        <Button
          isLoading={logoutFetching}
          onClick={() => logout()}
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
