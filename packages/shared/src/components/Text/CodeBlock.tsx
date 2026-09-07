import { PrismLight as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';

import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';

import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/a11y-dark';

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
interface CodeBlockProps extends SyntaxHighlighterProps {
  theme?: 'light' | 'dark';
}

/**
 * The `CodeBlock` component renders a read only block which highlights
 * a small amount of application code such as JavaScript, JSX, or CSS.
 * @param {CodeBlockProps} props - Component properties.
 */
const CodeBlock = ({ className, theme, 'data-testid': dataTestId = 'code-snippet', ...props }: CodeBlockProps) => {
  const style = theme === 'light' ? light : dark;

  return (
    <div className={className} data-testid={dataTestId}>
      <SyntaxHighlighter style={style} {...props} />
    </div>
  );
};

export { CodeBlock };
