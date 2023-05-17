import { Box, Button, Flex } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPageContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { toErrorMap } from '../../utils/toErrorMap';
import { useChangePasswordMutation } from '../../generated/graphql';
import { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { createClientExchange } from '../../utils/createClientExchange';
import Link from 'next/link';

interface ChangePasswordProps {
  token: string;
}

const ChangePassword: NextPage<ChangePasswordProps> = ({ token }) => {
  const [tokenError, setTokenError] = useState('');
  const [{}, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            token: token,
            newPassword: values.newPassword,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              type="password"
              placeholder="New Password"
              label="New Password"
            />
            {tokenError && (
              <Flex>
                <Box mr={2} color="red">
                  {tokenError}
                </Box>
                <Link href="/forgot-password">Click here to get new one</Link>
              </Flex>
            )}
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }: NextPageContext) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createClientExchange)(ChangePassword);
