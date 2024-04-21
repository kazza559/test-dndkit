import React, { forwardRef } from 'react';
import IconItem from '@enact/sandstone/IconItem'

const Item = forwardRef(({ id, withOpacity, isDragging, style, ...props }, ref) => {
    const inlineStyles = {
        opacity: '1',
        transformOrigin: '50% 50%',
        height: '80px',
        with: '104px',
        // borderRadius: '10px',
        // cursor: isDragging ? 'grabbing' : 'grab',
        // backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // visibility: isDragging ? 'hidden' : 'normal' ,
        // boxShadow: isDragging ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px' : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
        // transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        ...style,
    };

    return <div ref={ref} style={inlineStyles} {...props}>
        <IconItem background='#1b1b1b' bordered label={id} labelColor="light"
            labelOn="render" style={{
                height: 80,
                // position: 'absolute',
                width: 104
              }}
        />
    </div>;
});

export default Item;