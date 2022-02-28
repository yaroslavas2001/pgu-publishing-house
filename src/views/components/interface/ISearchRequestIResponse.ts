import PageRequest from "../component-models/PageRequest";

export default interface ISearchRequestIResponse {
    Search?: string;
    Page?: PageRequest;
    Items?: Array<any>;
}