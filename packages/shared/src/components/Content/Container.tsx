import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@react-starter/shared/utils/css';

/**
 * Defines the `Container` component base and variant styles.
 */
const containerVariants = cva('mx-auto container', {
  variants: {
    size: {
      default: '',
      sm: 'max-w-[40rem]',
      md: 'max-w-[48rem]',
      lg: 'max-w-[64rem]',
      xl: 'max-w-[80rem]',
      '2xl': 'max-w-[96rem]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

/**
 * The `Container` component renders a block which fixes the maximum width
 * of content to a breakpoint and centers the content within the viewport.
 * By default, a `Container` sets the maximum width of the content to the
 * minimum width of the current breakpoint.
 * 
 * Use the `size` property to specify a fixed maximum width for all viewport
 * sizes.
 * 
 * **Example:**
 * ```
  <Page>
    <Container size="lg">
      <Heading level={1}>Page Title</Heading>
      <div>lorem ipsum</div>
    </Container>
  </Page>
 * ```
 */
const Container = ({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof containerVariants>) => {
  return <div className={cn(containerVariants({ size, className }))} {...props} />;
};

export { Container };
