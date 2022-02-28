export default interface IEqual<T> {
  Equal(object:T):boolean;
  EqualRelation(object:T):boolean;
  ToString(): String;
}
