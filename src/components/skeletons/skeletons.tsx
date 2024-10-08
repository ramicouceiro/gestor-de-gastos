export const CardSkeleton = () => {
    return (
        <div className="p-6 flex flex-col h-full animate-pulse">
            <div className="flex flex-col justify-center gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400"></div>
                <div className="h-6 bg-gray-400 rounded w-3/4"></div>
            </div>
            <div className="mt-auto">
                <div className="h-12 bg-gray-400 rounded w-1/2 mb-1"></div>
                <div className="h-4 bg-gray-400 rounded w-3/4"></div>
            </div>
        </div>
    );
}

export const TransactionsSkeleton = () => {
    return(
        <div className="p-6 flex flex-col gap-4">
            <div className="h-4 bg-gray-400 rounded w-1/4 mb-4"></div>
            <div className="overflow-y-auto max-h-48 custom-scrollbar pr-4">
                <ul className="flex flex-col gap-3">
                    <li className="p-4 flex justify-between items-center rounded-lg shadow-neomorphicInset">
                        <div className="w-16 h-4 bg-gray-400 rounded"></div>
                        <div className="w-24 h-4 bg-gray-400 rounded"></div>
                        <div className="w-20 h-4 bg-gray-400 rounded"></div>
                    </li>
                    <li className="p-4 flex justify-between items-center rounded-lg shadow-neomorphicInset">
                        <div className="w-16 h-4 bg-gray-400 rounded"></div>
                        <div className="w-24 h-4 bg-gray-400 rounded"></div>
                        <div className="w-20 h-4 bg-gray-400 rounded"></div>
                    </li>
                </ul>
            </div>
        </div>
    )
}