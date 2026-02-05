import { PrismLight as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';

import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';

import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/a11y-dark';

import { BaseComponentProps } from 'common/utils/types';
import { useSettings } from 'common/hooks/useSettings';

/**
 * Register the TSX language for syntax highlighting.
 * To add more languages, import them above and register them here.
 */
SyntaxHighlighter.registerLanguage('tsx', tsx);

/**
 * Properties for the `CodeSnippet` React component.
 * @see {@link BaseComponentProps}
 * @see {@link SyntaxHighlighterProps}
 */
export interface CodeSnippetProps extends BaseComponentProps, SyntaxHighlighterProps {}

/**
 * The `CodeSnippet` component renders a read only block which highlights
 * a small amount of application code such as JavaScript, JSX, or CSS.
 * @param {CodeSnippetProps} props - Component properties.
 */
const CodeSnippet = ({ children, className, testId = 'code-snippet', ...highlighterProps }: CodeSnippetProps) => {
  const { theme } = useSettings();

  const style = theme === 'light' ? light : dark;

  return (
    <div className={className} data-testid={testId}>
      <SyntaxHighlighter style={style} {...highlighterProps}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
