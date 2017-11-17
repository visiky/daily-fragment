import GUI from '../../utils/Global/Gui';
 /**
  * @todo - 修正格式
  * options - {}[]
  *   - folder
  *      - name
  *      - values
  */
export interface Options {
  [type: string]: {
    value: any;
    range?: any[];
  };
}

abstract class Controller {

  public options: Options = {};
  public colorOptions: Options;

  // 通用可选择的options
  public message: string|string[];
  public speed;
  public displayOutline;
  public explode;
  public noiseStrength;
  public growthSpeed;
  public rotationSpeed;

  private name: string;
  private GUI: GUI;
  constructor(name: string) {
    this.name = name;
    this.GUI = new GUI();
  }

  public init() {
    const options = this.options;
    const name = this.name;
    const keys = Object.keys(options);
    keys.forEach(key => {
      const option = options[key];
      this[key] = option.value;
    });
    this[name] = () => {};

    this.GUI.add(this, name);
    keys.forEach(key => {
      const option = options[key];
      if (option.range) {
       this.GUI.add(this, key, option.range[0], option.range[1]);
      } else {
        this.GUI.add(this, key);
      }
    });
  }

  public initColor() {
    const options = this.colorOptions;
    const name = this.name;
    const keys = Object.keys(options);
    keys.forEach(key => {
      const option = options[key];
      this[key] = option.value;
    });
    this[name] = () => {};

    this.GUI.add(this, name);
    keys.forEach(key => {
      const option = options[key];
      this.GUI.addColor(this, key, option.range[0], option.range[1]);
    });
  }
}

class PrimaryController extends Controller {
  constructor(name) {
    super(name);
  }

  public init(options?: Options) {
    this.options = options;
    super.init();
  }
}

class PositionController extends Controller {

  public positionX: number;
  public positionY: number;
  public positionZ: number;
  private DEFAULT_OPTIONS = {
    positionX: {
      value: 100,
      range: [-2000, 2000],
    },
    positionY: {
      value: 100,
      range: [-2000, 2000],
    },
    positionZ: {
      value: 100,
      range: [-2000, 2000],
    },
  };
  constructor(name: string, options?: Options) {
    super(name);
    this.options = options || this.DEFAULT_OPTIONS;
    this.init();
  }
}

/**
 * @todo - fix
 */
export {
  Controller,
  PrimaryController,
  PositionController,
};
