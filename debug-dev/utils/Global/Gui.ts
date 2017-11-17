/**
 * @see https://github.com/Microsoft/TypeScript/issues/17032
 */
export default class GUI extends ((window as any).dat.GUI as { new(): any; }) {
  constructor() {
    super();
  }
  public add(...args): any {
    return super.add(...args);
  }
  public addFolder(name: string, ...args): any {
    return super.addFolder(name, ...args);
  }
}
