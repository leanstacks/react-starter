import Page from '@react-starter/shared/components/Content/Page';
import Container from '@react-starter/shared/components/Content/Container';
import Heading from '@react-starter/shared/components/Text/Heading';

import SigninForm from '@/pages/Auth/Signin/components/SigninForm';

/**
 * The `SigninPage` component renders the content for a user authentication
 * page.
 */
const SigninPage = () => {
  return (
    <Page testId="page-signin">
      <Container size="sm" className="min-h-[50vh]">
        <Heading level={1} className="my-4">
          Sign In
        </Heading>

        <SigninForm />
      </Container>
    </Page>
  );
};

export default SigninPage;
