export class Events<T> {
  private _handlers = new Array<((res: T) => any)>();
  private _onceHandlers = new Array<((res: T) => any)>();
  get handlers(){
    return this._handlers.concat(this._onceHandlers);
  }
  once(callback: ((res: T) => any)) {
    if (this._onceHandlers.indexOf(callback) === -1) {
      this._onceHandlers.push(callback)
    }
  }
  on(callback: ((res: T) => any)) {
    if (this.handlers.indexOf(callback) === -1) {
      this._handlers.push(callback)
    }
  }
  removeListener(callback: ((res: T) => any)) {
    let idx = this._handlers.indexOf(callback);
    if (idx !== -1) {
      this._handlers.splice(idx, 1);
    }else {
      idx = this._onceHandlers.indexOf(callback);
      this._onceHandlers.splice(idx, 1);      
    }
  }
  trigger(args: T) {
    // копируем, чтобы не очищать все onceHandlers, т.к. возможно что в обработчике кто-то подпишется на них
    const onceHandlersCopy = this._onceHandlers.slice();
    this.handlers.forEach(x => x(args));
    this._onceHandlers = this._onceHandlers.filter(x => onceHandlersCopy.indexOf(x) === -1);
  }
} 