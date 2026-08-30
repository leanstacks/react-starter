import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import Page from '@react-starter/shared/components/Content/Page';
import Container from '@react-starter/shared/components/Content/Container';
import Heading from '@react-starter/shared/components/Text/Heading';
import { Card, CardContent } from '@react-starter/shared/components/shadcn/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@react-starter/shared/components/shadcn/table';
import { DateFormat } from '@react-starter/shared/utils/constants';

import { config } from '@/common/utils/config';

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

  return (
    <Page testId="page-about">
      <Container size="md">
        <div className="space-y-8 py-8">
          {/* Page Header */}
          <div className="space-y-4">
            <Heading level={1} className="text-4xl font-normal">
              {t('about', { ns: 'common' })}
            </Heading>
            <p className="text-muted-foreground text-lg">{t('aboutDescription', { ns: 'common' })}</p>
          </div>

          {/* Build Information Section */}
          <div className="space-y-4">
            <Heading level={2} className="text-2xl font-normal">
              {t('buildInformation', { ns: 'common' })}
            </Heading>
            <Card>
              <CardContent>
                <Table data-testid="table-build-info">
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('attribute', { ns: 'common' })}</TableHead>
                      <TableHead className="text-right">{t('value', { ns: 'common' })}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {buildInfoData.map((item) => (
                      <TableRow key={item.label}>
                        <TableCell>{item.label}</TableCell>
                        <TableCell className="text-right">{item.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Page>
  );
};

export default AboutPage;
