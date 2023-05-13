import { NavBar } from '../components/NavBar';
import { withUrqlClient } from 'next-urql';
import { createClientExchange } from '../utils/createClientExchange';
import { usePostsQuery } from '../generated/graphql';

const Index = () => {
  const [{ data, fetching }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>Home page</div>
      <br />
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.posts.map((post) => <div key={post.id}>{post.title}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createClientExchange, { ssr: true })(Index);
