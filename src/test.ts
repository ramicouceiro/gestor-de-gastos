export const getArsTotalAmount = () =>{
    let totalAmount : number;
    return new Promise((resolve) => {
        setTimeout(() => {
            totalAmount = 1000000;
            resolve(totalAmount);
        }, 2000);
    });
}