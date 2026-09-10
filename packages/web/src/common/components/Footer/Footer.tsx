import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cn } from 'cn';

/**
 * The `Footer` React component renders the standard page footer content used
 * throughout the application.
 * @param {React.ComponentProps<'footer'>} props - Component properties, including `className` and other
 * standard footer attributes.
 */
const Footer = ({ className, ...props }: React.ComponentProps<'footer'>) => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={cn('px-4 pt-16 pb-8', className)} {...props}>
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
        <div>&copy; {year} LeanStacks</div>
        <div>
          <Link
            to="https://leanstacks.net/privacy.html"
            title={t('privacyPolicy', { ns: 'common' })}
            target="_blank"
            className="text-inherit"
          >
            {t('privacy', { ns: 'common' })}
          </Link>
        </div>
        <div>
          <Link
            to="https://leanstacks.net/terms.html"
            title={t('termsAndConditions', { ns: 'common' })}
            target="_blank"
            className="text-inherit"
          >
            {t('terms', { ns: 'common' })}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
