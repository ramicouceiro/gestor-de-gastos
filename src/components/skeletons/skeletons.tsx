export function CardSkeleton() {
    return (
        <div className="p-7 flex flex-col h-full">
            <div className="flex flex-col justify-center gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300">
                    <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
            <div className="mt-auto">
                <div className="h-8 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
    );
}