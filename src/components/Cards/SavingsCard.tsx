import { KeyIcon } from "@heroicons/react/24/outline";
import Card from "./Card";

interface DashboardCardProps {
    className?: string;
}

interface DashboardSavingsCardCategoryProps {
    icon: React.ElementType;
    title: string;
    amount: number;
    total: number;
}

interface UserSaving {
    saving_id: number;
    user_id: number;
    category: string;
    actual: number;
    target: number;
}


export function SavingsCard({ className } : DashboardCardProps) {
    const userSavings: UserSaving[] = new Array<UserSaving>();
    userSavings.push({
        saving_id: 1,
        user_id: 1,
        category: "Travel",
        actual: 1000,
        target: 2000
    });
    userSavings.push({
        saving_id: 2,
        user_id: 1,
        category: "Food",
        actual: 50,
        target: 100
    });
    userSavings.push({
        saving_id: 3,
        user_id: 1,
        category: "Clothes",
        actual: 200,
        target: 500
    });
    if(userSavings.length === 0){
        return(
            <Card className={`${className} h-fit`}>
                <div className="p-6 flex flex-col gap-4">
                    <div className="flex flex-col justify-center gap-4 mb-4">
                        <h3 className="text-lg font-semibold">Savings</h3>
                    </div>
                    <div className="flex flex-col justify-center gap-4 mb-4">
                        <p className="text-gray-500">You don't have savings configured.</p>
                    </div>
                </div>
            </Card>
        )
    }
    return(
        <Card className={`${className} h-fit`}>
            <div className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[40rem] custom-scrollbar pr-4">
                <div className="flex flex-col justify-center gap-4 mb-4">
                    <h3 className="text-lg font-semibold">Savings</h3>
                </div>
                {
                    userSavings?.map((saving) => (
                        <SavingsCardCategory
                            key={saving.saving_id}
                            icon={KeyIcon}
                            title={saving.category}
                            amount={saving.actual}
                            total={saving.target}
                        />
                    ))
                }
            </div>
        </Card>
    )
}

export function SavingsCardCategory({ icon: Icon, title, amount, total }: DashboardSavingsCardCategoryProps) {
    return(
        <div className="flex flex-col justify-around text-center w-full shadow-neomorphicInset rounded-xl p-4 gap-4">
            <div className="flex justify-between">
                <div className="flex justify-center items-center gap-4">
                    <div className="bg-primary text-white rounded-full p-2">
                        <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                        <p className="text-md font-semibold text-primary">{title}</p>
                    </div>
                </div>
            </div>
            <div className="flex-grow ml-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{width: `${((amount / total) * 100) > 100 ? 100 : (amount / total) * 100}%`}} 
                    />
                </div>
                <p className="text-xs mt-1 text-right"><b>${amount?.toLocaleString()} / ${total?.toLocaleString()} </b></p>
            </div>
        </div>
    )
}