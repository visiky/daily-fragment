export interface IPerson {
  name: string;
  age: number;
}
export class Person {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getName() {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  get(): IPerson {
    return {
      name: this.name,
      age: this.age
    }
  }
}
