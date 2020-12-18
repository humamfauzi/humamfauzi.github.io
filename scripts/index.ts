import * as PlottableLib from './plottable_lib'

export class GeneralLibrary {
  public ExtractPlottableLib() {
    return PlottableLib.PlottableLibrary
  }

  public consolePrint(words :string) :void {
    console.log(words)
  }
}