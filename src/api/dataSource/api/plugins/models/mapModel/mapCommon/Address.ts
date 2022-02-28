import Apartment from "./Apartment"
import Building from "./Building"
import Region from "./Region"
import Settlement from "./Settlement"
import Street from "./Street"

export default class Address {
    Region: Region = new Region()
    Territory: string = ""
    District: string = ""
    Settlement: Settlement = new Settlement()
    Street: Street = new Street()
    Building: Building = new Building()
    Apartment: Apartment = new Apartment()
    Zip: string = ""
}