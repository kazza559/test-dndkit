import React, { FC } from 'react';
import Scroller from '@enact/sandstone/Scroller';
import css from './Grid.module.less'

const Grid = ({ children }) => {
    return (
        <Scroller className={css.wrapper} hoverToScroll horizontalScrollbar="hidden" direction="horizontal">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px'
                }}
            >
                {children}
            </div>
        </Scroller>
    );
};

export default Grid;
