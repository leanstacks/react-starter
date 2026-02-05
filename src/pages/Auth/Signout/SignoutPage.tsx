import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignout } from './api/useSignout';
import Spinner from 'common/components/Loader/Spinner';
import Page from 'common/components/Content/Page';
import Container from 'common/components/Content/Container';

/**
 * The `SignoutPage` component deauthenticates the current user and redirects
 * to the base URL.
 */
const SignoutPage = () => {
  const navigate = useNavigate();
  const { mutate: signout } = useSignout();

  useEffect(() => {
    signout(undefined, {
      onSuccess: () => {
        // setTimeout to simulate network latency or OAuth IdP redirect
        setTimeout(() => {
          navigate('/');
        }, 1000);
      },
    });
  }, [signout, navigate]);

  return (
    <Page testId="page-signout">
      <Container className="h-[50vh]">
        <div className="flex h-full items-center justify-center text-2xl">
          <Spinner>
            <Spinner.Text>Signing out...</Spinner.Text>
          </Spinner>
        </div>
      </Container>
    </Page>
  );
};

export default SignoutPage;
