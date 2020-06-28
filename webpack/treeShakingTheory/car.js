/**
 * Created by 海枯 on 2018/2/25.
 */
import {V8Engine} from './engine'

class SportsCar {
  constructor (engine) {
    this.engine = engine
  }

  toString() {
    return this.engine.toString() + 'Sports Car'
  }
}

console.log(new SportsCar(new V8Engine()).toString())