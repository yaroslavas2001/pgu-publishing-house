let PaymentStatus: { Id: number; Name: string }[] = [
    { Id: 0, Name: "Не проведенные" },
    { Id: 1, Name: "Проведенные" },
    { Id: 2, Name: "Отмененные" },
    { Id: 3, Name: "Обнаружена оплата фальшивыми деньгами" },
    { Id: 4, Name: "Оплаченные субагентом" },
    { Id: 5, Name: "Непрошедшие проверку в оффлайне" },
    { Id: 6, Name: "Оплаченые, но не проведенные" },

];
export default PaymentStatus
