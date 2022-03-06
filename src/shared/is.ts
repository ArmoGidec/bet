export function isPromise<T>(obj: any): obj is Promise<T> {
  return !!(
    obj as Promise<T>
  ).then;
}
