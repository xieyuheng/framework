import { Logger, type LogOptions } from "../logger/index.js"

export class SilentLogger extends Logger {
  log(opts: LogOptions): void {}
}
