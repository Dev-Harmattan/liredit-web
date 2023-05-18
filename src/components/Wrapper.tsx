import { Box } from '@chakra-ui/react';
import React from 'react';

export type VariantProps = 'regular' | 'small';

interface WrapperProps {
  variant?: VariantProps;
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <Box mt={8} mx="auto" maxW={variant === 'regular' ? '800px' : '400px'}>
      {children}
    </Box>
  );
};
export default Wrapper;
