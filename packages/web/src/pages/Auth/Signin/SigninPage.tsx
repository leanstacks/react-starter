import Page from '@react-starter/shared/components/Content/Page';
import Container from '@react-starter/shared/components/Content/Container';
import Heading from '@react-starter/shared/components/Text/Heading';
import SigninForm from './components/SigninForm';

/**
 * The `SigninPage` component renders the content for a user authentication
 * page.
 */
const SigninPage = () => {
  return (
    <Page testId="page-signin">
      <Container className="my-6 min-h-[50vh]">
        <Heading level={1} className="mb-4 border-b border-neutral-500/50 pb-2">
          Sign In
        </Heading>
        <SigninForm />
      </Container>
    </Page>
  );
};

export default SigninPage;
