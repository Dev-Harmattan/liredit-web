import { withUrqlClient } from 'next-urql';
import { createClientExchange } from '../utils/createClientExchange';
import { usePostsQuery } from '../generated/graphql';
import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout variant="small">
      <Link href="/create-post">Create Post</Link>
      <br />
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.posts.map((post) => <div key={post.id}>{post.title}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createClientExchange, { ssr: true })(Index);
