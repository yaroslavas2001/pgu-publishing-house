export default class GetListRequest<T>{
    
    public _filters?: T//{"Name":"Ent_Name"}
    public _page?: number
    public _perPage?: number
    public _sortDir?: string = 'ASC'//DESC
    public _sortField?: string
    //_filters={"Name":"Ent_Name"}&_page=1&_perPage=25&_sortDir=ASC&_sortField=Name


    public toQueryParams?(): string{
        let params = [];
        
        if(this._filters)
            params.push('_filters='+JSON.stringify(this._filters));
        
        if(this._page!=undefined)
            params.push('_page='+this._page);

        if(this._perPage!=undefined)
            params.push('_perPage='+this._perPage);

        if(this._sortDir!=undefined)
            params.push('_sortDir='+this._sortDir);

        if(this._sortField!=undefined)
            params.push('_sortField='+this._sortField);
        
        let result = params.join('&');

        return result;
    }
}