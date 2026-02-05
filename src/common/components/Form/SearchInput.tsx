import { ChangeEvent, type JSX, useEffect, useRef } from 'react';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import FAIcon from 'common/components/Icon/FAIcon';

/**
 * Properties for the `SearchInput` React component.
 * @param {string} [errorText] - Optional. Error message.
 * @param {boolean} [isLoading] - Optional. Indicates if the results are loading.
 * Default: `false`
 * @param {function} onChange - Function invoked when the input value changes.
 * @param {JSX.Element[]} [searchResults] - Optional. An array of `SearchResult`
 * components.
 * @param {string} [supportingText] - Optional. Help text.
 * @see {@link BaseComponentProps}
 */
export interface SearchInputProps extends BaseComponentProps {
  errorText?: string;
  isLoading?: boolean;
  onChange: (value: string) => void;
  searchResults?: JSX.Element[];
  supportingText?: string;
}

/**
 * The `SearchINput` component renders a search input field. The
 * component consists of a leading icon, a trailing icon, and an input field.
 *
 * The component invokes the supplied `onChange` function as the value of
 * the input field changes. This allows the parent component to load data
 * using the input field value.
 *
 * The parent component may optioanally set `isLoading` to `true` when
 * search results are loaded asynchronously to display a loading state
 * indicator.
 *
 * The parent component supplies the rendered search results in the
 * `searchResults` property.  It is recommended to use the `SearchResult`
 * component.
 *
 * @param {SearchInputProps} props - Component properties.
 */
const SearchInput = ({
  className,
  errorText,
  isLoading = false,
  onChange,
  searchResults,
  supportingText,
  testId = 'input-search',
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Handle input field value changes.
   * @param e - The change event for the input field.
   */
  const doOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  /**
   * Focus the cursor within the input field.
   */
  const doFocus = () => {
    inputRef.current?.focus();
  };

  /**
   * Focus on initial render.
   */
  useEffect(() => {
    doFocus();
  }, []);

  return (
    <div className={className} onClick={doFocus} data-testid={testId}>
      <div className="mb-1 flex items-center gap-2 border-b border-neutral-500/50 px-1 py-0.5 has-focus:border-blue-600">
        <FAIcon icon="magnifyingGlass" data-testid={`${testId}-icon-leading`} />
        <input
          name={`${testId}-input`}
          onChange={doOnChange}
          className="grow appearance-none bg-transparent focus-visible:outline-hidden"
          autoComplete="off"
          ref={inputRef}
          data-testid={`${testId}-input`}
        />
        <FAIcon
          icon="circleNotch"
          className={cn({
            invisible: !isLoading,
          })}
          spin
          data-testid={`${testId}-icon-trailing`}
        />
      </div>

      <div className="flex gap-1 px-1 py-0.5">
        {!!errorText && (
          <div className="text-sm text-red-600" data-testid={`${testId}-error`}>
            {errorText}
          </div>
        )}
        {!!supportingText && (
          <div className="text-sm font-light" data-testid={`${testId}-supporting-text`}>
            {supportingText}
          </div>
        )}
      </div>

      <div className="max-h-64 overflow-y-auto rounded-lg bg-neutral-500/10">{searchResults}</div>
    </div>
  );
};

export default SearchInput;
