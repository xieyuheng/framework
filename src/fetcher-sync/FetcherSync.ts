import request from "sync-request"

type Handler = (url: URL) => string

export class FetcherSync {
  private handlers: Record<string, Handler>

  constructor() {
    this.handlers = {}
    this.register("http", httpHandler)
    this.register("https", httpHandler)
  }

  get knownProtocols(): Array<string> {
    return Object.keys(this.handlers)
  }

  fetch(url: URL): string {
    const handler = this.handlers[url.protocol]
    if (handler === undefined) {
      throw new Error(
        [
          `I can not handle protocol: ${JSON.stringify(url.protocol)},`,
          `  known protocols are: ${JSON.stringify(this.knownProtocols)}`,
        ].join("\n"),
      )
    }

    return handler(url)
  }

  register(protocol: string, handler: Handler): this {
    if (!protocol.endsWith(":")) protocol += ":"
    this.handlers[protocol] = handler
    return this
  }
}

function httpHandler(url: URL): string {
  const res = request("GET", url.href)
  return res.getBody("utf-8")
}
