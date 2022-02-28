import entityIdNumber from "../common/entityIdNumber"
import FullName from "../common/FullName"

export default class LocalizationDetailItem {
    Id?: number
    Key?: string
    Value?: string
    Culture?: entityIdNumber
    Service?: entityIdNumber
    Editor?:FullName
    DateAdd?:Date
    DateChange?:Date
}