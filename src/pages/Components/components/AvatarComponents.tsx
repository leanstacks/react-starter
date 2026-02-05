import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import avatarPicture from './avatar-picture.png';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Avatar from 'common/components/Icon/Avatar';
import Heading from 'common/components/Text/Heading';

/**
 * Properties for the `AvatarComponents` React component.
 * @see {@link BaseComponentProps}
 */
interface AvatarComponentsProps extends BaseComponentProps {}

/**
 * The `AvatarComponents` React component renders a set of examples illustrating
 * the use of the `Avatar` component.
 * @param {AvatarComponentsProps} props - Component properties.
 */
const AvatarComponents = ({ className, testId = 'components-avatar' }: AvatarComponentsProps) => {
  const data: ComponentProperty[] = [
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'picture',
      description: 'The URL or base64 encoded image source.',
    },
    {
      name: 'testId',
      description: 'Optional. Identifier for testing.',
    },
    {
      name: 'value',
      description:
        'The short name to associate with the Avatar. Displayed as alternative text for the image or when hovered.',
    },
  ];
  const columnHelper = createColumnHelper<ComponentProperty>();
  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => <span className="font-mono text-sky-700 dark:text-sky-500">{info.getValue()}</span>,
      header: () => 'Name',
    }),
    columnHelper.accessor('description', {
      cell: (info) => info.renderValue(),
      header: () => 'Description',
    }),
  ] as ColumnDef<ComponentProperty>[];

  return (
    <section className={className} data-testid={testId}>
      <Heading level={2} className="mb-4">
        Avatar Component
      </Heading>

      <div className="my-8">
        The <span className="font-mono font-bold">Avatar</span> component displays a circular image or placeholder.
        Usually used to represent a user, group, or team, but may be used to represent any named object.
      </div>

      <div className="my-8">
        <Heading level={3} className="mb-2">
          Properties
        </Heading>
        <Table<ComponentProperty> data={data} columns={columns} />
      </div>

      <Heading level={3}>Examples</Heading>
      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Avatar value="John Smith" />
        </div>
        <CodeSnippet className="my-2" code={`<Avatar value="John Smith" />`} />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Avatar value="Alexander Johnson" className="rounded-full" />
        </div>
        <CodeSnippet className="my-2" code={`<Avatar value="Alexander Johnson" className="rounded-full" />`} />
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Avatar picture={avatarPicture} value="Jane Jones" className="rounded-full" testId="my-avatar" />
        </div>
        <CodeSnippet
          className="my-2"
          code={`import avatarPicture from './avatar-picture.png';

<Avatar
  picture={avatarPicture}
  value="Jane Jones"
  className="rounded-full"
  testId="my-avatar"
/>`}
        />
      </div>
    </section>
  );
};

export default AvatarComponents;
