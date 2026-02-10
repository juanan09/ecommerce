
import React from 'react';

type Variant = 'text' | 'rectangular' | 'circular';

interface SkeletonProps {
    variant?: Variant;
    width?: string | number;
    height?: string | number;
    className?: string; // Allow extending classes
}

export const Skeleton: React.FC<SkeletonProps> = ({
    variant = 'text',
    width,
    height,
    className = '',
}) => {
    const baseClasses = 'bg-gray-200 animate-pulse';

    let variantClasses = '';
    switch (variant) {
        case 'circular':
            variantClasses = 'rounded-full';
            break;
        case 'rectangular':
            variantClasses = 'rounded-none';
            break;
        case 'text':
        default:
            variantClasses = 'rounded';
            // Text variant often has a default height or mimics text line
            if (!height) {
                // height = '1em'; // Optional: default height for text? Or let consumer decide.
                // The test doesn't enforce default height for text, only 'rounded' class.
            }
            break;
    }

    const style: React.CSSProperties = {};
    if (width) style.width = width;
    if (height) style.height = height;

    return (
        <div
            role="status"
            aria-label="Loading..."
            className={`${baseClasses} ${variantClasses} ${className}`}
            style={style}
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};
