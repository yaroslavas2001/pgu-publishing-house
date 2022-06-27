import AuthService from "./services/authService";
import Cookies from "js-cookie";
import HttpResponseResult from "./models/httpResponseResult";
import { StringLiteralLike } from "typescript";

export class WebApiService {
  TAG: string = 'WebApiService';
  baseUrl: string
  constructor(baseUrl?: string) {
    if (!baseUrl)
      baseUrl = '';

    if (baseUrl.endsWith('/') && baseUrl.length > 0)
      baseUrl = baseUrl.substr(0, baseUrl.length - 1);
    this.baseUrl = baseUrl;
  }
  test(key: any, data: any, dopPath?: string) {
    return (dopPath ? dopPath + "." + key : key) + '=' + data
  }
  public sendXHR<T>(url: string, method: string, data?: any, callback?: (res: HttpResponseResult<T>) => void): void {

    var self = this;
    if (!url)
      url = ''
    if (!url.startsWith('http')) {
      if (!url.startsWith('/'))
        url = '/' + url;
      url = this.baseUrl + url;
      // console.log("url", url, data)
      if (data && !url.includes("UploadFileForPublication")) {
        // url = url +"?"
        let params: string = ""
        let array: Array<string> = []
        for (let i = 0; i < Object.keys(data).length; i++) {
          let key = Object.keys(data)[i]
          if (typeof data[key] == "object") {
            let testkey = key
            let el = data[key]
            Object.keys(el).map(key => {
              if (el[key] != "")
                array.push(this.test(key, el[key], testkey))
            })
          } else if (data[key] != "") array.push(this.test(key, data[key]))
        }
        params = array.join("&")
        // console.log("params", params)
        url = url + "?" + params
      }

      //   console.log("body",body)
    }


    let xhr = new XMLHttpRequest();
    xhr.onload = function () {


      let resp: HttpResponseResult<T>;
      try {
        resp = JSON.parse(xhr.response)
      }
      catch {
        resp = xhr.response
      }
      let res: HttpResponseResult<T> = {
        isSuccess: resp.isSuccess,
        TypeName: resp.TypeName,
        // errorMessage: xhr.status,
        data: resp.data || null,
        errorMessage: resp.errorMessage,
        stackTrace: resp.stackTrace
        // ResponseHeaders: {}
      }
      if (xhr.status != 200 && xhr.status != 201) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        console.error(self.TAG, 'Request:', url, xhr.status, xhr.statusText);
        if (xhr.status === 401) {
          Cookies.set(AuthService.AdminAuthTokenName, '')
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
        // res.errorMessage = resp;

        if (callback)
          callback(res);
      } else { // если всё прошло гладко, выводим результат        

        let headers = {}
        xhr.getAllResponseHeaders().split('\r\n').forEach(x => {
          let header = x.split(':').map(x => x.trim());
          headers[header[0]] = header[1];
        })
        if (callback)
          callback(res);
      }

    };

    xhr.onerror = function (e) { // происходит, только когда запрос совсем не получилось выполнить
      // alert(`Ошибка соединения`);    
      let res: HttpResponseResult<T> = {
        isSuccess: false,
        errorMessage: "Ошибка при отправке запроса",
        // StatusCode: 1,
        data: null,
        stackTrace: ""
        // ResponseHeaders: {}
      }
      if (callback)
        callback(res);
    };

    xhr.onprogress = function (event) { // запускается периодически
      // event.loaded - количество загруженных байт
      // event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
      // event.total - количество байт всего (только если lengthComputable равно true)
      //alert(`Загружено ${event.loaded} из ${event.total}`);
    };

    xhr.open(method, url, true);
    // xhr.withCredentials = true;

    let jwtoken = Cookies.get(AuthService.AdminAuthTokenName);
    if (jwtoken)
      xhr.setRequestHeader('Authorization', 'Bearer ' + jwtoken);
    let body

    if (typeof data === 'string') {
      body = data;
    }
    else if (data) {
      body = new FormData();
      this.buildFormData(body, data);
      // console.log("build", this.buildFormData(body, data))
      body = JSON.stringify(data)
    }
    // console.log("body",body,data,)
    // console.log(xhr.pa)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);

  }

  setResponseCookies(headers: any) {
    let header = headers['set-cookie'];
    if (header) {
      let split = headers.split(';');
      let splitCookie = split[0].split('=');
      let name = splitCookie[0];
      let value = splitCookie[1];
    }
  }
  buildFormData(formData: FormData, data: any, parentKey?: string) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      let value = data === null ? '' : data;

      formData.append(parentKey, value);
    }
  }
  // test(obj, path = [], result = []) {
  //   Object.entries(obj).reduce((acc, [k, v]) => {
  //     path.push(k);

  //     if (v instanceof Object) {
  //       this.test(v, path, acc);
  //     } else {
  //       acc.push(`${path.map((n, i) => i ? `[${n}]` : n).join('')}=${v}`);
  //     }

  //     path.pop();

  //     return acc;
  //   }
  // }
}