import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { WindowSizeContext } from 'context/WindowSizeContext';
import { useWindowSize } from 'hooks';
import { CreatePage } from 'pages/CreatePage';
import { MainPage } from 'pages/MainPage';
import { CUSTOMS_THEMES } from 'themes';

export const App: React.FC = () => {
    const { width, height } = useWindowSize();

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
        <WindowSizeContext.Provider value={{ width, height }}>
            <ThemeProvider theme={CUSTOMS_THEMES}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </WindowSizeContext.Provider>
    );
};
