import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@react-starter/shared/components/shadcn/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@react-starter/shared/components/shadcn/tooltip';

/**
 * The `AddTaskButton` component renders a button for adding a new task. It includes a tooltip and an icon.
 * @param props - The properties passed to the button component.
 * @returns The rendered add task button component.
 */
const AddTaskButton = ({ ...props }: React.ComponentProps<typeof Button>) => {
  const { t } = useTranslation();

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button variant="outline" size="icon" aria-label={t('addTask', { ns: 'tasks' })} asChild {...props}>
          <Link to="/app/tasks/add">
            <Plus />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t('addTask', { ns: 'tasks' })}</TooltipContent>
    </Tooltip>
  );
};

export { AddTaskButton };
