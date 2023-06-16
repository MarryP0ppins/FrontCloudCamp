import React, { useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';
import { PreloaderArrowsIcon } from 'assets';
import { useAppSelector } from 'store/store';

import { PageLoaderProps } from 'components/PageLoader/PageLoader.types';

import './PageLoader.scss';

const CnPageLoader = cn('pageLoader');

export const PageLoader: React.FC<PageLoaderProps> = React.memo(({ showLoading, zIndex }) => {
    const { isLoading } = useAppSelector((store) => store.loader);

    const [isShow, setIsShow] = useState(true);

    useEffect(() => {
        setIsShow(true);

        const setTimeoutId = setTimeout(() => {
            setIsShow(false);
        }, 1000);

        return () => {
            clearTimeout(setTimeoutId);
        };
    }, [isLoading, showLoading]);

    if (isShow || isLoading || showLoading) {
        return (
            <div className={CnPageLoader()} style={{ zIndex }}>
                <div className={CnPageLoader('animation')}>
                    <PreloaderArrowsIcon />
                </div>
            </div>
        );
    }

    return null;
});
