import { withUrqlClient } from 'next-urql';
import { createClientExchange } from '../utils/createClientExchange';
import { usePostsQuery } from '../generated/graphql';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!data && !fetching) {
    return <div>Something went wrong.</div>;
  }
  return (
    <Layout variant="regular">
      <Flex align="center">
        <Heading>LiReddit</Heading>
        <Box ml="auto">
          <Link href="/create-post">Create Post</Link>
        </Box>
      </Flex>

      <br />
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {data?.posts.posts.map((post) => (
            <Box key={post.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data && (
        <Flex mt={8}>
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor:
                  data?.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
            m="auto"
            isLoading={fetching}
            disabled={!data.posts.hasMore}
          >
            {data.posts.hasMore ? 'Load More' : 'No More Data'}
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createClientExchange, { ssr: true })(Index);
