import { lazy } from 'react';
import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';

import { withSuspense } from '@/common/utils/suspense';
import StandardLayout from '@/common/components/Layout/StandardLayout';
import ErrorPage from '@/pages/Error/ErrorPage';
import PrivateOutlet from '@/common/components/Router/PrivateOutlet';

// Landing Page Family
import LandingPage from '@/pages/Landing/LandingPage';

// Auth Page Family
const SigninPage = lazy(() => import('@/pages/Auth/Signin/SigninPage'));
const SignoutPage = lazy(() => import('@/pages/Auth/Signout/SignoutPage'));

// Settings Page Family
const SettingsPage = lazy(() => import('@/pages/Settings/SettingsPage'));
const AppearanceSettings = lazy(() => import('@/pages/Settings/components/AppearanceSettings'));

// About Page Family
const AboutPage = lazy(() => import('@/pages/About/AboutPage'));

// Tasks Page Family
const TasksPage = lazy(() => import('@/pages/Tasks/TasksPage'));
const TaskListLayout = lazy(() => import('@/pages/Tasks/components/TaskListLayout'));
const TaskDetailLayout = lazy(() => import('@/pages/Tasks/components/TaskDetailLayout'));
const TaskAdd = lazy(() => import('@/pages/Tasks/components/Add/TaskAdd'));
const TaskEdit = lazy(() => import('@/pages/Tasks/components/Edit/TaskEdit'));

/**
 * The React Router configuration. An array of `RouteObject`.
 * @see {@link RouteObject}
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <StandardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'auth',
        children: [
          { index: true, element: <Navigate to="signin" replace /> },
          {
            path: 'signin',
            element: withSuspense(<SigninPage />),
          },
          {
            path: 'signout',
            element: withSuspense(<SignoutPage />),
          },
        ],
      },
      {
        path: 'pub',
        children: [
          { index: true, element: <Navigate to="about" replace /> },
          {
            path: 'about',
            element: withSuspense(<AboutPage />),
          },
        ],
      },
      {
        path: 'app',
        element: <PrivateOutlet />,
        children: [
          { index: true, element: <Navigate to="tasks" replace /> },
          {
            path: 'settings',
            element: withSuspense(<SettingsPage />),
            children: [
              {
                index: true,
                element: <Navigate to="appearance" replace />,
              },
              {
                path: 'appearance',
                element: withSuspense(<AppearanceSettings />),
              },
            ],
          },
          {
            path: 'tasks',
            element: withSuspense(<TasksPage />),
            children: [
              {
                index: true,
                element: withSuspense(<TaskListLayout />),
              },
              {
                path: 'add',
                element: withSuspense(<TaskAdd />),
              },
              {
                path: ':taskId',
                children: [
                  {
                    index: true,
                    element: withSuspense(<TaskDetailLayout />),
                  },
                  {
                    path: 'edit',
                    element: withSuspense(<TaskEdit />),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/**
 * The application `Router`. A React Router instance.
 */
export const router = createBrowserRouter(routes);
