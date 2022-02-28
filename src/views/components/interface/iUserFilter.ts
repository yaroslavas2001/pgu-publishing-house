export default interface IUserFilter{
    search?: string;
    state?: string;
    // age? : EnumAgeInterval;
    age? : number;

    gender?: string;
}