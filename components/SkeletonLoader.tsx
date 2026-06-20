'use client';

export function SkeletonCard() {
    return (
        <div className="bg-zinc-900/40 border border-zinc-900/80 p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-start">
                <div className="h-6 w-1/3 shimmer-effect rounded-lg"></div>
                <div className="flex gap-2">
                    <div className="h-10 w-10 shimmer-effect rounded-xl"></div>
                    <div className="h-10 w-10 shimmer-effect rounded-xl"></div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-4 w-full shimmer-effect rounded-md"></div>
                <div className="h-4 w-5/6 shimmer-effect rounded-md"></div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
                <div className="h-6 w-12 shimmer-effect rounded-md"></div>
                <div className="h-6 w-16 shimmer-effect rounded-md"></div>
                <div className="h-6 w-14 shimmer-effect rounded-md"></div>
            </div>
        </div>
    );
}

export function SkeletonBadge() {
    return (
        <div className="bg-zinc-900/40 border border-zinc-900/80 p-4 rounded-2xl flex justify-between items-center">
            <div className="h-4 w-24 shimmer-effect rounded-md"></div>
            <div className="flex gap-2">
                <div className="h-8 w-8 shimmer-effect rounded-lg"></div>
                <div className="h-8 w-8 shimmer-effect rounded-lg"></div>
            </div>
        </div>
    );
}

export function SkeletonTimelineItem() {
    return (
        <div className="bg-zinc-900/40 border border-zinc-900/80 p-6 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="w-full sm:w-auto">
                    <div className="h-6 w-32 shimmer-effect rounded-lg mb-2"></div>
                    <div className="h-4 w-40 shimmer-effect rounded-md"></div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-6 w-24 shimmer-effect rounded-md"></div>
                    <div className="flex gap-2">
                        <div className="h-8 w-8 shimmer-effect rounded-lg"></div>
                        <div className="h-8 w-8 shimmer-effect rounded-lg"></div>
                    </div>
                </div>
            </div>
            <div className="h-4 w-full shimmer-effect rounded-md"></div>
        </div>
    );
}

export function SkeletonForm() {
    return (
        <div className="bg-zinc-900/20 border border-zinc-900 p-8 rounded-3xl space-y-6">
            <div className="flex justify-between items-center">
                <div className="h-6 w-1/4 shimmer-effect rounded-lg"></div>
                <div className="h-8 w-28 shimmer-effect rounded-full"></div>
            </div>
        </div>
    );
}
