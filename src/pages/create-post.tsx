import { Form, Formik } from 'formik';
import { Button, Box } from '@chakra-ui/react';
import InputField from '../components/InputField';
import { useCreatePostMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createClientExchange } from '../utils/createClientExchange';
import Layout from '../components/Layout';
import useAuth from '../hooks/isAuth';

const CreatePost: React.FC<{}> = () => {
  const [_, createPost] = useCreatePostMutation();
  const router = useRouter();
  useAuth();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values, _) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              type="text"
              placeholder="title"
              label="Title"
            />
            <Box mt={4}>
              <InputField
                textField
                name="text"
                type="text"
                placeholder="text"
                label="Text"
              />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createClientExchange)(CreatePost);
