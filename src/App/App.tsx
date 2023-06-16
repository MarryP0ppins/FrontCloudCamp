import React, { Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CUSTOMS_THEMES } from 'themes';

import { PageLoader } from 'components/PageLoader';

const CreatePage = React.lazy(() => import('pages/CreatePage'));
const MainPage = React.lazy(() => import('pages/MainPage'));

export const App: React.FC = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<MainPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </>,
        ),
    );
    return (
        <ThemeProvider theme={CUSTOMS_THEMES}>
            <Suspense fallback={<PageLoader showLoading />}>
                <RouterProvider router={router} />
            </Suspense>
        </ThemeProvider>
    );
};
