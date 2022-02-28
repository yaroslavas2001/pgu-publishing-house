import entityIdNumber from "../common/entityIdNumber"

export default class LocalizationListRequest {
    Id?: number
    Key?: string
    Value?: string
    Culture?: entityIdNumber
    Service?: entityIdNumber
}