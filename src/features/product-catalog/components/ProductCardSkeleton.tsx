import { Skeleton } from '@/shared/components/Skeleton';

export const ProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-100">
            {/* Image Placeholder */}
            <div className="relative">
                <Skeleton variant="rectangular" height="12rem" className="w-full" />
            </div>

            {/* Content Placeholder */}
            <div className="p-4 flex flex-col flex-grow space-y-4">
                {/* Title and Price Row */}
                <div className="flex justify-between items-start gap-4">
                    <Skeleton variant="text" height="1.75rem" width="60%" className="rounded" />
                    <Skeleton variant="text" height="1.75rem" width="20%" className="rounded" />
                </div>

                {/* Description Placeholder (2 lines) */}
                <div className="space-y-2 flex-grow">
                    <Skeleton variant="text" height="1rem" width="100%" className="rounded" />
                    <Skeleton variant="text" height="1rem" width="85%" className="rounded" />
                </div>

                {/* Button Placeholder */}
                <div className="pt-2">
                    <Skeleton variant="rectangular" height="2.75rem" className="w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
};
