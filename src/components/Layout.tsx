import { ReactNode } from 'react';
import { NavBar } from './NavBar';
import Wrapper, { VariantProps } from './Wrapper';

interface LayoutProps {
  variant: VariantProps;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
