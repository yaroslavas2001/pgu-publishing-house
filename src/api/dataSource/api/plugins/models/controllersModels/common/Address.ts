import Region from "../../mapModel/mapCommon/Region"
import Street from "../../mapModel/mapCommon/Street"
import Apartment from "./Apartment"
import Building from "./Building"
import Settlement from "./Settlement"

export default class Address {
    Region?: Region
    Territory?: string
    District?: string
    Settlement?: Settlement
    Street?: Street
    Building?: Building
    Apartment?: Apartment
    Zip?: string
}