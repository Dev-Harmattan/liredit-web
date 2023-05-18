import { Flex, Box, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [{ data }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;
  // @ts-ignore
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

  // @ts-ignore
  if (data?.me?.username) {
    body = (
      <Flex>
        {/* @ts-ignore */}
        <Box mr={2}>{data.me.username}</Box>
        <Button
          isLoading={logoutFetching}
          // @ts-ignore
          onClick={() => logout()}
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      position={isSticky ? 'fixed' : 'static'}
      top={0}
      left={0}
      right={0}
      bg="tomato"
      p={4}
      zIndex={1}
      boxShadow={isSticky ? 'md' : 'none'}
    >
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
