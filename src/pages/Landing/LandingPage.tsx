import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from 'common/hooks/useAuth';
import Page from 'common/components/Content/Page';
import Container from 'common/components/Content/Container';
import Heading from 'common/components/Text/Heading';

/**
 * The `LandingPage` component renders the content of the landing page
 * for unauthenticated users. This is the public landing page.
 *
 * If an authenticated user navigates to this page, they are redirected to
 * the `DashboardPage`.
 */
const LandingPage = () => {
  const { t } = useTranslation();
  const authContext = useAuth();

  if (authContext.isAuthenticated) {
    return <Navigate to="/app/tasks" replace />;
  }

  return (
    <Page testId="page-landing">
      <Container className="min-h-[50vh]">
        <Heading level={1} className="mt-32 mb-4 text-4xl font-normal md:mb-8 md:text-8xl">
          {t('letsGetStarted', { ns: 'common' })}
        </Heading>

        <div className="opacity-60 md:text-2xl">{t('creatingReactApps', { ns: 'common' })}</div>
      </Container>
    </Page>
  );
};

export default LandingPage;
