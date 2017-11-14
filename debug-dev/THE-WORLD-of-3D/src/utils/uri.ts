
export const URIResolver = {
  resolveLocal(uri: string, document: HTMLElement) {
    return null;
  },
  resolve(uri: string, document: HTMLElement) {
    return null;
  },
 };

class URI {
  constructor() {

  }

  public isLocal() {
    return false;
  }
  public isAbsoulute() {
    return false;
  }
  public getAbsoluteURI(uri: string) {
    return '';
  }
  public hasSameOrigin(other: string) {
    return false;
  }
}

export default URI;
