import { type JSX, useMemo, useState } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { filter } from 'lodash';
import { map } from 'lodash';

import { BaseComponentProps } from 'common/utils/types';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import SearchInput from 'common/components/Form/SearchInput';
import SearchResult from 'common/components/Form/SearchResult';
import Heading from 'common/components/Text/Heading';

/**
 * The `SearchInputComponents` React component renders a set of examples illustrating
 * the use of the `SearchField` component.
 * @param {BaseComponentProps} props - Component properties.
 */
const SearchInputComponents = ({ className, testId = 'components-search-input' }: BaseComponentProps) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

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
      name: 'errorText',
      description: 'Optional. Error text.',
    },
    {
      name: 'isLoading',
      description: 'Optional. Indicates if the results are loading. Default: false',
    },
    {
      name: 'onChange',
      description: 'Function invoked when the input value changes.',
    },
    {
      name: 'searchResults',
      description: 'Optioanl. An array of SearchResult components.',
    },
    {
      name: 'supportingText',
      description: 'Optional. Help text.',
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

  const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];

  const searchResults: JSX.Element[] | undefined = useMemo(() => {
    if (value && value.length > 0) {
      const filteredColors = filter(colors, (color) => {
        return color.toLowerCase().includes(value.toLowerCase());
      });
      const searchResults = map(filteredColors, (color) => (
        <SearchResult
          key={`search-result-${color}`}
          testId={`search-result-${color}`}
          onClick={() => {
            setSelectedValue(color);
          }}
        >
          {color}
        </SearchResult>
      ));
      if (searchResults.length > 0) {
        setError('');
        return searchResults;
      } else {
        setError('No colors found.');
      }
    }
    return undefined;
  }, [value]);

  return (
    <section className={className} data-testid={testId}>
      <Heading level={2} className="mb-4">
        Search Input Component
      </Heading>

      <div className="my-8">
        The <span className="font-mono font-bold">SearchInput</span> component displays a search input field which may
        be used for a typeahead style search and permits API calls to asynchronously fetch search results.
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

      <div className="my-8">
        {!!selectedValue && (
          <div className="mb-4" data-testid={`${testId}-value-selected`}>
            You selected: {selectedValue}
          </div>
        )}

        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <SearchInput
            className="w-full"
            errorText={error}
            onChange={(val) => setValue(val)}
            searchResults={searchResults}
            supportingText="Start typing any color, e.g. blue."
          />
        </div>

        <CodeSnippet className="my-2" language="tsx">
          {`<SearchInput
  className="w-full"
  errorText={error}
  onChange={(val) => setValue(val)}
  searchResults={searchResults}
  supportingText="Start typing any color, e.g. blue."
/>`}
        </CodeSnippet>
      </div>
    </section>
  );
};

export default SearchInputComponents;
