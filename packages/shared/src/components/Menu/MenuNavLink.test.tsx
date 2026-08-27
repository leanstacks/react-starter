import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import MenuNavLink from './MenuNavLink';
import { MemoryRouter } from 'react-router-dom';

describe('MenuNavLink', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>;

  it('should render successfully', async () => {
    // ARRANGE
    render(<MenuNavLink to="/">LinkText</MenuNavLink>, { wrapper });
    await screen.findByTestId('menu-navlink');

    // ASSERT
    expect(screen.getByTestId('menu-navlink')).toBeDefined();
    expect(screen.getByTestId('menu-navlink').textContent).toBe('LinkText');
    expect(screen.getByTestId('menu-navlink').getAttribute('href')).toBe('/');
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<MenuNavLink to="/" testId="custom-menu-navlink" />, { wrapper });
    await screen.findByTestId('custom-menu-navlink');

    // ASSERT
    expect(screen.getByTestId('custom-menu-navlink')).toBeDefined();
  });

  it('should use custom classes when provided', async () => {
    // ARRANGE
    render(<MenuNavLink to="/" className="custom-class" />, { wrapper });
    await screen.findByTestId('menu-navlink');

    // ASSERT
    expect(screen.getByTestId('menu-navlink').classList).toContain('custom-class');
  });

  it('should render Icon when iconName provided', async () => {
    // ARRANGE
    render(<MenuNavLink to="/" icon="bars" />, { wrapper });
    await screen.findByTestId('menu-navlink-icon');

    // ASSERT
    expect(screen.getByTestId('menu-navlink-icon')).toBeDefined();
    expect(screen.getByTestId('menu-navlink-icon')).toHaveAttribute('data-icon', 'bars');
  });

  it('should not render Icon when iconName omitted', async () => {
    // ARRANGE
    render(<MenuNavLink to="/">LinkText</MenuNavLink>, { wrapper });
    await screen.findByTestId('menu-navlink');

    // ASSERT
    expect(screen.queryByTestId('menu-navlink-icon')).toBeNull();
  });

  it('should use custom icon classes when provided', async () => {
    // ARRANGE
    render(<MenuNavLink to="/" icon="bars" iconClassName="custom-class" />, { wrapper });
    await screen.findByTestId('menu-navlink-icon');

    // ASSERT
    expect(screen.getByTestId('menu-navlink-icon')).toBeDefined();
    expect(screen.getByTestId('menu-navlink-icon').classList).toContain('custom-class');
  });

  it('should use active styles', async () => {
    // ARRANGE
    render(
      <MenuNavLink to="/" styleActive>
        LinkText
      </MenuNavLink>,
      { wrapper },
    );
    await screen.findByTestId('menu-navlink');

    // ASSERT
    expect(screen.getByTestId('menu-navlink')).toBeDefined();
    expect(screen.getByTestId('menu-navlink').classList).toContain('bg-neutral-500/10');
  });

  it('should only use active styles on active route', async () => {
    // ARRANGE
    render(
      <MenuNavLink to="/not/active" styleActive>
        LinkText
      </MenuNavLink>,
      { wrapper },
    );
    await screen.findByTestId('menu-navlink');

    // ASSERT
    expect(screen.getByTestId('menu-navlink')).toBeDefined();
    expect(screen.getByTestId('menu-navlink').classList).not.toContain('bg-neutral-500/10');
  });

  it('should use className function', async () => {
    // ARRANGE
    render(
      <MenuNavLink to="/" styleActive className={({ isActive }) => [isActive ? 'some-active-class' : ''].join(' ')}>
        LinkText
      </MenuNavLink>,
      { wrapper },
    );
    await screen.findByTestId('menu-navlink');

    // ASSERT
    expect(screen.getByTestId('menu-navlink')).toBeDefined();
    expect(screen.getByTestId('menu-navlink').classList).toContain('some-active-class');
  });
});
