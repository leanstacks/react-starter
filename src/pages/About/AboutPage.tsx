import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { config } from 'common/utils/config';
import Page from 'common/components/Content/Page';
import Container from 'common/components/Content/Container';
import Heading from 'common/components/Text/Heading';
import Card from 'common/components/Card/Card';
import Table from 'common/components/Table/Table';
import { DateFormat } from 'common/utils/constants';

/**
 * Represents a build info attribute entry.
 */
interface BuildInfoAttribute {
  label: string;
  value: string;
}

/**
 * The `AboutPage` component renders the About page which displays information
 * about the application, including a description and build attributes.
 *
 * This page is publicly available and does not require authentication.
 */
const AboutPage = () => {
  const { t } = useTranslation();

  // Build info data
  const buildInfoData: BuildInfoAttribute[] = [
    {
      label: t('buildDate', { ns: 'common' }),
      value: dayjs(config.VITE_BUILD_DATE).format(DateFormat.DATE),
    },
    {
      label: t('buildTime', { ns: 'common' }),
      value: config.VITE_BUILD_TIME,
    },
    {
      label: t('buildTimestamp', { ns: 'common' }),
      value: dayjs(config.VITE_BUILD_TS).format(DateFormat.TIMESTAMP),
    },
    {
      label: t('commitSha', { ns: 'common' }),
      value: config.VITE_BUILD_COMMIT_SHA,
    },
    {
      label: t('environment', { ns: 'common' }),
      value: config.VITE_BUILD_ENV_CODE,
    },
    {
      label: t('workflowName', { ns: 'common' }),
      value: config.VITE_BUILD_WORKFLOW_NAME,
    },
    {
      label: t('workflowRunNumber', { ns: 'common' }),
      value: config.VITE_BUILD_WORKFLOW_RUN_NUMBER.toString(),
    },
    {
      label: t('workflowRunAttempt', { ns: 'common' }),
      value: config.VITE_BUILD_WORKFLOW_RUN_ATTEMPT.toString(),
    },
  ];

  // Define table columns
  const columns: ColumnDef<BuildInfoAttribute>[] = [
    {
      accessorKey: 'label',
      header: t('attribute', { ns: 'common' }),
    },
    {
      accessorKey: 'value',
      header: t('value', { ns: 'common' }),
    },
  ];

  return (
    <Page testId="page-about">
      <Container size="md">
        <div className="space-y-8 py-8">
          {/* Page Header */}
          <div className="space-y-4">
            <Heading level={1} className="text-4xl font-normal">
              {t('about', { ns: 'common' })}
            </Heading>
            <p className="text-lg opacity-75">{t('aboutDescription', { ns: 'common' })}</p>
          </div>

          {/* Build Information Section */}
          <div className="space-y-4">
            <Heading level={2} className="text-2xl font-normal">
              {t('buildInformation', { ns: 'common' })}
            </Heading>
            <Card>
              <Card.Body>
                <Table data={buildInfoData} columns={columns} testId="table-build-info" />
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </Page>
  );
};

export default AboutPage;
