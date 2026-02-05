import { useGetUser } from 'common/api/useGetUser';
import { BaseComponentProps } from 'common/utils/types';
import Avatar from 'common/components/Icon/Avatar';
import Skeleton from 'common/components/Loader/Skeleton';
import FAIcon from 'common/components/Icon/FAIcon';

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
    <div className={className} data-testid={testId}>
      {isLoading && (
        <div data-testid={`${testId}-loading`}>
          <Skeleton className="mb-2 h-6 w-80" />
          <Skeleton className="h-4 w-full" />
        </div>
      )}

      {user && (
        <div data-testid={`${testId}-content`}>
          <div className="flex items-center gap-2">
            <Avatar value={user.name} className="shrink-0 rounded-full" testId={`${testId}-avatar`} />

            <div className="flex flex-col gap-1">
              <div className="font-bold">{user.name}</div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs opacity-75">
                <div className="flex items-center gap-1">
                  <FAIcon icon="envelope" />
                  {user.email}
                </div>
                <div className="flex items-center gap-1">
                  <FAIcon icon="phone" />
                  {user.phone}
                </div>
                <div className="flex items-center gap-1">
                  <FAIcon icon="link" />
                  {user.website}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
