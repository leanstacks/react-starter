import { Link2, Mail, Phone } from 'lucide-react';

import type { BaseComponentProps } from '@react-starter/shared/types/components';
import { Card, CardContent } from '@react-starter/shared/components/shadcn/card';
import { Avatar, AvatarFallback } from '@react-starter/shared/components/shadcn/avatar';
import { Skeleton } from '@react-starter/shared/components/shadcn/skeleton';

import { useGetUser } from '@/common/api/useGetUser';

/**
 * Properties for the `UserInfo` component.
 * @param userId - A `User` identifier.
 * @see {@link BaseComponentProps}
 */
interface UserInfoProps extends BaseComponentProps {
  userId: number;
}

/**
 * The `UserInfo` component renders a block containing summary attributes
 * about a user such as their name, email address, phone number, and website.
 * @param {UserInfoProps} props - Component properties.
 */
const UserInfo = ({ className, testId = 'user-info', userId }: UserInfoProps) => {
  const { data: user, isLoading } = useGetUser({ userId });

  return (
    <Card className={className} data-testid={testId}>
      {isLoading && (
        <CardContent data-testid={`${testId}-loading`}>
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex-1">
              <Skeleton className="mb-2 h-5 w-1/2 sm:w-1/4" />
              <Skeleton className="h-4 w-full md:w-3/5" />
            </div>
          </div>
        </CardContent>
      )}

      {user && (
        <CardContent data-testid={`${testId}-content`}>
          <div className="flex items-center gap-2">
            <Avatar data-testid={`${testId}-avatar`}>
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
              <div className="font-bold">{user.name}</div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs opacity-75">
                <div className="flex items-center gap-1">
                  <Mail size={16} />
                  {user.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone size={16} />
                  {user.phone}
                </div>
                <div className="flex items-center gap-1">
                  <Link2 size={16} />
                  {user.website}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default UserInfo;
