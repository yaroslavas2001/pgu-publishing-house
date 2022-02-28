import entityIdNumber from "../common/entityIdNumber"

export default class LocalizationUpsertItem {
    Id?: number
    Key?: string
    Value?: string
    Culture?: entityIdNumber
    Service?: entityIdNumber
}