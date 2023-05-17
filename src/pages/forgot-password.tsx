import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { createClientExchange } from '../utils/createClientExchange';
import { Flex, Button, Box } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import router from 'next/router';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [_, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, _) => {
          await forgotPassword(values);
          setIsComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          isComplete ? (
            <Flex flexDirection="column">
              <Box>If your email exist, we sent you an email.</Box>
              <Button
                mt={4}
                type="button"
                colorScheme="teal"
                onClick={() => router.push('/login')}
              >
                Back to Login Page
              </Button>
            </Flex>
          ) : (
            <Form>
              <InputField
                name="email"
                type="email"
                placeholder="Email"
                label="Email"
              />

              <Button
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                Forgot Password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createClientExchange)(ForgotPassword);
