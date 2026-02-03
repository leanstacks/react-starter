import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Accordion from 'common/components/Accordion/Accordion';

/**
 * The `AccordionComponents` component renders a set of examples illustrating
 * the use of the `Accordion` component.
 */
const AccordionComponents = ({ className, testId = 'components-accordion' }: BaseComponentProps): JSX.Element => {
  const data: ComponentProperty[] = [
    {
      name: 'children',
      description: 'The content to be displayed.',
    },
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'defaultValue',
      description: 'Optional. An array of default (or initial) active items.',
    },
    {
      name: 'multiple',
      description: 'Optional. Whether or not multiple items can be open at the same time.',
    },
    {
      name: 'testId',
      description: 'Optional. Identifier for testing.',
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
        Accordion Component
      </Heading>

      <div className="my-8">
        <div>
          The <span className="font-mono font-bold">Accordion</span> component organizes content into vertically stacked
          sections. Each section has a heading which, when clicked, reveals the content.
        </div>
        <div className="my-8">
          <Heading level={3} className="mb-2">
            Properties
          </Heading>
          <Table<ComponentProperty> data={data} columns={columns} />
        </div>

        <Heading level={3} className="mb-2">
          Examples
        </Heading>

        <Heading level={4} className="mb-2">
          Basic
        </Heading>
        <div className="mb-4 opacity-85">This is the most basic use of the Accordion component.</div>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Accordion className="w-full">
              <Accordion.Item value="section-1">
                <Accordion.Trigger>Section 1</Accordion.Trigger>
                <Accordion.Content>Content for section 1.</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="section-2">
                <Accordion.Trigger>Section 2</Accordion.Trigger>
                <Accordion.Content>Content for section 2.</Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Accordion className="w-full">
  <Accordion.Item value="section-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content for section 1.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="section-2">
    <Accordion.Trigger>Section 2</Accordion.Trigger>
    <Accordion.Content>Content for section 2.</Accordion.Content>
  </Accordion.Item>
</Accordion>`}
          />
        </div>

        <Heading level={4} className="mb-2">
          Multiple
        </Heading>
        <div className="mb-4 opacity-85">
          Using the "multiple" property, you can allow multiple sections to be open at the same time.
        </div>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Accordion className="w-full" multiple>
              <Accordion.Item value="section-1">
                <Accordion.Trigger>Section 1</Accordion.Trigger>
                <Accordion.Content>Content for section 1.</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="section-2">
                <Accordion.Trigger>Section 2</Accordion.Trigger>
                <Accordion.Content>Content for section 2.</Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Accordion className="w-full" multiple>
  <Accordion.Item value="section-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content for section 1.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="section-2">
    <Accordion.Trigger>Section 2</Accordion.Trigger>
    <Accordion.Content>Content for section 2.</Accordion.Content>
  </Accordion.Item>
</Accordion>`}
          />
        </div>

        <Heading level={4} className="mb-2">
          Default Active Item
        </Heading>
        <div className="mb-4 opacity-85">
          Using the "defaultValue" property, you can specify which section should be active by default.
        </div>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Accordion className="w-full" defaultValue={['section-2']} multiple>
              <Accordion.Item value="section-1">
                <Accordion.Trigger>Section 1</Accordion.Trigger>
                <Accordion.Content>Content for section 1.</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="section-2">
                <Accordion.Trigger>Section 2</Accordion.Trigger>
                <Accordion.Content>Content for section 2.</Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Accordion className="w-full" defaultValue="section-2" multiple>
  <Accordion.Item value="section-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content for section 1.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="section-2">
    <Accordion.Trigger>Section 2</Accordion.Trigger>
    <Accordion.Content>Content for section 2.</Accordion.Content>
  </Accordion.Item>
</Accordion>`}
          />
        </div>

        <Heading level={4} className="mb-2">
          Content
        </Heading>
        <div className="mb-4 opacity-85">
          The Accordion content may contain anything, such as text, images, forms, etc. There is no limitation on the
          what may be placed inside the contennt of an Accordion.
        </div>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Accordion className="w-full">
              <Accordion.Item value="prologue">
                <Accordion.Trigger>Prologue</Accordion.Trigger>
                <Accordion.Content>
                  <div className="mb-4 text-sm font-semibold">
                    <span className="text-2xl">O</span>rnare occaecat aliquip voluptate esse est occaecat cillum nam.
                    Eiusmod aliquip magna dapibus ut ut deserunt. Justo nisi mi nunc nunc cras. Ipsum quam officia
                    dapibus et aenean enim. Bibendum do convallis donec eiusmod elit arcu est. Quam ero ea massa culpa
                    adipiscing. Justo neque aute qui nisi. Convallis nisi et irure mollit dui aliqua fugait laoreet.
                  </div>
                  <div className="mb-4 text-sm">
                    Mollit urna ut ut pulvinar ullamco. Ero enim eiusmod qui in velit. Posuere dapibus cras culpa ligula
                    magna. Do neque urna nostrud tempus officia. Consequat condimentum a eiusmod cillum. Pulvinar elit
                    qui pulvinar donec non aute dolor. Sunt aliquip dapibus mi vitae labore.
                  </div>
                  <div className="text-sm">
                    Irure laoreet ligula justo sapien magna ea vel. Proident mollit aenean aliquip magna ullamco ipsum
                    tempus incididunt. Do aenean eiusmod amet dolor ipsum sunt sit. Irure reprehenderit ad cupidatat
                    labore bibendum convallis. Tempor deserunt nam lorem cras excepteur a bibendum egestas. Donec labore
                    duis esse quam. Dui culpa cupidatat cras cillum vel ornare pulvinar dui. Duis donec aenean vel
                    adipiscing ligula.
                  </div>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="chapter-1">
                <Accordion.Trigger>Chapter 1</Accordion.Trigger>
                <Accordion.Content>
                  <div className="mb-4 text-sm font-semibold">
                    <span className="text-2xl">E</span>gestas justo donec laboris justo id laborum aliqua. Nulla dapibus
                    aute aenean donec vitae enim pulvinar donec. Neque cupidatat facilisis sint laboris magna ea. Anim
                    ero proident laboris fugait. Tempus labore dui vel laborum esse donec pariatur. Consequat id laoreet
                    mollit fugait id cillum anim.
                  </div>
                  <img src="https://placehold.co/400x600" alt="Placeholder" className="mb-4" />
                  <div className="text-sm">
                    Pulvinar e nibh veniam arcu at aliqua pariatur. Enim cillum cupidatat elit elit occaecat
                    reprehenderit. Nibh sed justo quam convallis fermentum e aute. Incididunt ero in ornare anim
                    voluptate incididunt nul. Do exercitation bibendum nulla lorem est nul. Irure labore ligula dui qos
                    culpa aliquip condimentum. Proin excepteur incididunt do commodo deserunt egestas.
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Accordion className="w-full">
  <Accordion.Item value="prologue">
    <Accordion.Trigger>Prologue</Accordion.Trigger>
    <Accordion.Content>
      <div className="mb-4 text-sm font-semibold">
        <span className="text-2xl">O</span>rnare occaecat aliquip voluptate esse...
      </div>
      <div className="mb-4 text-sm">
        Mollit urna ut ut pulvinar ullamco. Ero enim eiusmod qui in velit. Posuere...
      <div className="mb-4 text-sm">
        Irure laoreet ligula justo sapien magna ea vel. Proident mollit aenean...
      </div>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="chapter-1">
    <Accordion.Trigger>Chapter 1</Accordion.Trigger>
    <Accordion.Content>
      <div className="mb-4 text-sm font-semibold">
        <span className="text-2xl">E</span>gestas justo donec laboris justo id...
      </div>
      <img src="https://placehold.co/400x200" alt="Placeholder" className="mb-4" />
      <div className="mb-4 text-sm">
        Pulvinar e nibh veniam arcu at aliqua pariatur. Enim cillum cupidatat...
      </div>
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`}
          />
        </div>
      </div>
    </section>
  );
};

export default AccordionComponents;
