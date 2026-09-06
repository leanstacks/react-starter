import { PrismLight as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';

import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';

import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/a11y-dark';

import { BaseComponentProps } from '@react-starter/shared/types/components';

/**
 * Register the TSX language for syntax highlighting.
 * To add more languages, import them above and register them here.
 */
SyntaxHighlighter.registerLanguage('tsx', tsx);

/**
 * Properties for the `CodeBlock` React component.
 * @see {@link BaseComponentProps}
 * @see {@link SyntaxHighlighterProps}
 */
export interface CodeBlockProps extends BaseComponentProps, SyntaxHighlighterProps {
  theme?: 'light' | 'dark';
}

/**
 * The `CodeBlock` component renders a read only block which highlights
 * a small amount of application code such as JavaScript, JSX, or CSS.
 * @param {CodeBlockProps} props - Component properties.
 */
export const CodeBlock = ({
  children,
  className,
  testId = 'code-snippet',
  theme,
  ...highlighterProps
}: CodeBlockProps) => {
  const style = theme === 'light' ? light : dark;

  return (
    <div className={className} data-testid={testId}>
      <SyntaxHighlighter style={style} {...highlighterProps}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
