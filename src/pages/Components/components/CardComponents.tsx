import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Card from 'common/components/Card/Card';
import MessageCard from 'common/components/Card/MessageCard';
import Heading from 'common/components/Text/Heading';
import Button from 'common/components/Button/Button';

/**
 * Properties for the `CardComponents` React component.
 * @see {@link BaseComponentProps}
 */
interface CardComponentsProps extends BaseComponentProps {}

/**
 * The `CardComponents` React component renders a set of examples illustrating
 * the use of the `Card` family of components.
 * @param {CardComponentsProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const CardComponents = ({ className, testId = 'components-card' }: CardComponentsProps): JSX.Element => {
  const columnHelper = createColumnHelper<ComponentProperty>();
  const cardData: ComponentProperty[] = [
    {
      name: 'children',
      description: 'The content to be displayed.',
    },
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'testId',
      description: 'Optional. Identifier for testing.',
    },
  ];
  const messageCardData: ComponentProperty[] = [
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'iconProps',
      description: 'Optional. Icon properties object.',
    },
    {
      name: 'message',
      description: 'Messasge text.',
    },
    {
      name: 'testId',
      description: 'Optional. Identifier for testing.',
    },
    {
      name: 'title',
      description: 'Optional. Title text.',
    },
  ];
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
      <div className="mb-16">
        <Heading level={2} className="mb-4">
          Card Component
        </Heading>

        <div className="my-8">
          The <span className="font-mono font-bold">Card</span> component displays block container for a group of
          related content.
        </div>

        <div className="my-8">
          <Heading level={3} className="mb-2">
            Properties
          </Heading>
          <Table<ComponentProperty> data={cardData} columns={columns} />
        </div>

        <Heading level={3} className="mb-2">
          Examples
        </Heading>

        <Heading level={4} className="mb-2">
          Card components
        </Heading>
        <div className="text-sm opacity-85">
          The Card component is a compound component. It has component properties which allow you to compose Card
          content. Those components include: Header, Title, Subtitle, Body, Footer, Separator, and Image.
        </div>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Card className="w-100">
              <Card.Body>I am a simple Card with only a Body.</Card.Body>
            </Card>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Card className="w-100">
  <Card.Body>I am a simple Card with only a Body.</Card.Body>
</Card>`}
          />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Card className="w-100">
              <Card.Header>
                <Card.Title>I am a title</Card.Title>
                <Card.Subtitle>There can be subtitles too</Card.Subtitle>
              </Card.Header>
              <Card.Separator />
              <Card.Body>And of course, we have the body of the card.</Card.Body>
              <Card.Separator />
              <Card.Footer>And a footer for things at the bottom</Card.Footer>
            </Card>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Card className="w-100">
  <Card.Header>
    <Card.Title>I am a title</Card.Title>
    <Card.Subtitle>There can be subtitles too</Card.Subtitle>
  </Card.Header>
  <Card.Separator />
  <Card.Body>And of course, we have the body of the card.</Card.Body>
  <Card.Separator />
  <Card.Footer>And a footer for things at the bottom</Card.Footer>
</Card>`}
          />
        </div>

        <Heading level={4} className="mb-2">
          Card images
        </Heading>
        <div className="text-sm opacity-85">
          Card images may be used anywhere within a Card. If the image is the first or last child of the Card component,
          the image will be flush to the top or bottom and the corners rounded.
        </div>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Card className="w-100">
              <Card.Image src="https://placehold.co/400x200" alt="placeholder" />
              <Card.Header>
                <Card.Title>Title</Card.Title>
                <Card.Subtitle>with a subtitle</Card.Subtitle>
              </Card.Header>
              <Card.Body>
                A sapien vel facilisis enim minim. Arcu sunt nostrud bibendum nul id cras dolor. Posuere justo minim dui
                aliquip laboris et aenean. Fermentum et velit duis bibendum ea commodo. Ullamco excepteur officia id
                ornare minim. Voluptate amet dolor magna nostrud posuere ornare. Cras enim ex ex quam aute proident mi.
                Commodo sapien aliqua minim id adipiscing dolor ero incididunt.
              </Card.Body>
              <Card.Footer className="flex items-center justify-end">
                <Button variant="text" className="text-sm font-bold text-blue-600">
                  View
                </Button>
              </Card.Footer>
            </Card>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Card className="w-100">
  <Card.Image src="https://placehold.co/400x200" alt="placeholder" />
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Subtitle>with a subtitle</Card.Subtitle>
  </Card.Header>
  <Card.Body>
    A sapien vel facilisis enim minim. Arcu sunt nostrud bibendum nul id cras dolor.
    Posuere justo minim dui aliquip laboris et aenean. Fermentum et velit duis bibendum
    ea commodo. Ullamco excepteur officia id ornare minim. Voluptate amet dolor magna
    nostrud posuere ornare. Cras enim ex ex quam aute proident mi. Commodo sapien aliqua
    minim id adipiscing dolor ero incididunt.
  </Card.Body>
  <Card.Footer className="flex items-center justify-end">
    <Button variant="text" className="text-sm font-bold text-blue-600">
      View
    </Button>
  </Card.Footer>
</Card>`}
          />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Card className="w-100">
              <Card.Header>
                <Card.Title>Title</Card.Title>
                <Card.Subtitle>with a subtitle</Card.Subtitle>
              </Card.Header>
              <Card.Body>
                A sapien vel facilisis enim minim. Arcu sunt nostrud bibendum nul id cras dolor. Posuere justo minim dui
                aliquip laboris et aenean. Fermentum et velit duis bibendum ea commodo. Ullamco excepteur officia id
                ornare minim. Voluptate amet dolor magna nostrud posuere ornare. Cras enim ex ex quam aute proident mi.
                Commodo sapien aliqua minim id adipiscing dolor ero incididunt.
              </Card.Body>
              <Card.Footer className="flex items-center justify-end">
                <Button variant="text" className="text-sm font-bold text-blue-600">
                  View
                </Button>
              </Card.Footer>
              <Card.Image src="https://placehold.co/400x200" alt="placeholder" />
            </Card>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Card className="w-100">
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Subtitle>with a subtitle</Card.Subtitle>
  </Card.Header>
  <Card.Body>
    A sapien vel facilisis enim minim. Arcu sunt nostrud bibendum nul id cras dolor.
    Posuere justo minim dui aliquip laboris et aenean. Fermentum et velit duis bibendum
    ea commodo. Ullamco excepteur officia id ornare minim. Voluptate amet dolor magna
    nostrud posuere ornare. Cras enim ex ex quam aute proident mi. Commodo sapien aliqua
    minim id adipiscing dolor ero incididunt.
  </Card.Body>
  <Card.Footer className="flex items-center justify-end">
    <Button variant="text" className="text-sm font-bold text-blue-600">
      View
    </Button>
  </Card.Footer>
  <Card.Image src="https://placehold.co/400x200" alt="placeholder" />
</Card>`}
          />
        </div>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Card className="w-100">
              <Card.Header>
                <Card.Title>Title</Card.Title>
                <Card.Subtitle>with a subtitle</Card.Subtitle>
              </Card.Header>
              <Card.Image src="https://placehold.co/400x200" alt="placeholder" />
              <Card.Body>
                A sapien vel facilisis enim minim. Arcu sunt nostrud bibendum nul id cras dolor. Posuere justo minim dui
                aliquip laboris et aenean. Fermentum et velit duis bibendum ea commodo. Ullamco excepteur officia id
                ornare minim. Voluptate amet dolor magna nostrud posuere ornare. Cras enim ex ex quam aute proident mi.
                Commodo sapien aliqua minim id adipiscing dolor ero incididunt.
              </Card.Body>
              <Card.Footer className="flex items-center justify-end">
                <Button variant="text" className="text-sm font-bold text-blue-600" data-testid="card-button-view">
                  View
                </Button>
              </Card.Footer>
            </Card>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Card className="w-100">
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Subtitle>with a subtitle</Card.Subtitle>
  </Card.Header>
  <Card.Image src="https://placehold.co/400x200" alt="placeholder" />
  <Card.Body>
    A sapien vel facilisis enim minim. Arcu sunt nostrud bibendum nul id cras dolor.
    Posuere justo minim dui aliquip laboris et aenean. Fermentum et velit duis bibendum
    ea commodo. Ullamco excepteur officia id ornare minim. Voluptate amet dolor magna
    nostrud posuere ornare. Cras enim ex ex quam aute proident mi. Commodo sapien aliqua
    minim id adipiscing dolor ero incididunt.
  </Card.Body>
  <Card.Footer className="flex items-center justify-end">
    <Button variant="text" className="text-sm font-bold text-blue-600">
      View
    </Button>
  </Card.Footer>
</Card>`}
          />
        </div>
      </div>

      <div className="mb-16">
        <Heading level={2} className="mb-4">
          MessageCard Component
        </Heading>

        <div className="my-8">
          The <span className="font-mono font-bold">MessageCard</span> component is a bespoke Card layout for displaying
          messages.
        </div>

        <div className="my-8">
          <Heading level={3} className="mb-2">
            Properties
          </Heading>
          <Table<ComponentProperty> data={messageCardData} columns={columns} />
        </div>

        <Heading level={3}>Examples</Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <MessageCard className="w-100" message="Hello world! &#128075;" />
          </div>
          <CodeSnippet className="my-2" code={`<MessageCard className="w-100" message="Hello world! &#128075;" />`} />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <MessageCard
              className="w-100"
              iconProps={{ icon: 'circleInfo', size: '2x' }}
              message="Here is a tip to help you with this page."
            />
          </div>
          <CodeSnippet
            className="my-2"
            code={`<MessageCard
  className="w-100"
  iconProps={{ icon: 'circleInfo', size: '2x' }}
  message="Here is a tip to help you with this page."
/>`}
          />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <MessageCard
              className="w-100 bg-red-800"
              iconProps={{ icon: 'circleExclamation', size: 'xl' }}
              message="What you are about to do... It is permanent and we will not be able to recover the data afterward."
              title="Read this first!"
            />
          </div>
          <CodeSnippet
            className="my-2"
            code={`<MessageCard
  className="w-100 bg-red-800"
  iconProps={{ icon: 'circleExclamation', size: 'xl' }}
  message="What you are about to do... It is permanent and we will not be able to recover the data afterward."
  title="Read this first!"
/>`}
          />
        </div>
      </div>
    </section>
  );
};

export default CardComponents;
