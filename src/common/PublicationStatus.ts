import IdNameModel from "@/models/general/IdNameModel";

const PublicationStatus: Array<IdNameModel> = [
    { Id: 0, Name: "Новое" },

    { Id: 1, Name: "Вернуть на доработку" },
    { Id: 2, Name: "На проверке у рецензента" },
    { Id: 3, Name: "На проверке у издаельства" },
    { Id: 4, Name: "На печать" },
    { Id: 5, Name: "Не рекомендовано к печати" },
    { Id: 5, Name: "На архивацию" },
]
export default PublicationStatus