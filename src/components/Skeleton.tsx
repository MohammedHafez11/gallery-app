import React from 'react';
import '../assets/styles/Skeleton.scss';

const Skeleton: React.FC<{ width?: string; height?: string }> = ({ width = '100%', height = '200px' }) => {
    return (
        <div
            className={`skeleton`}
            style={{ width, height }}
        ></div>
    );
};

export default Skeleton;