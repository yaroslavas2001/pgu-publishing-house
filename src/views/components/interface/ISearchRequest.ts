import PageRequest from "../component-models/PageRequest";

export default interface ISearchRequest{
    Search?: string;
    Page: PageRequest;
}