import PageResponse from "../component-models/PageResponse";

export default interface ISearchResponse{
    Items: Array<any>;
    Page: PageResponse;
}