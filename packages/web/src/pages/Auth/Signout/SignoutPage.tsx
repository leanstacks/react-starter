import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Page from '@react-starter/shared/components/Content/Page';
import Container from '@react-starter/shared/components/Content/Container';
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from '@react-starter/shared/components/shadcn/empty';
import { Spinner } from '@react-starter/shared/components/shadcn/spinner';

import { useSignout } from '@/pages/Auth/Signout/api/useSignout';

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
      <Container size="sm" className="h-[75vh]">
        <div className="flex h-full items-center justify-center gap-4 text-2xl">
          <Empty>
            <EmptyMedia>
              <Spinner className="size-16" />
            </EmptyMedia>
            <EmptyTitle>Signing out...</EmptyTitle>
            <EmptyDescription>Please wait. You will be redirected shortly.</EmptyDescription>
          </Empty>
        </div>
      </Container>
    </Page>
  );
};

export default SignoutPage;
