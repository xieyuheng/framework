import { expect, test } from "vitest"
import { FetcherSync } from "./index.js"

test("A fetcher can handle http and https by default.", () => {
  const fetcher = new FetcherSync()

  fetcher.fetch(new URL("http://bing.com"))
  fetcher.fetch(new URL("https://bing.com"))
})

test("A fetcher can not handler other protocols by default.", () => {
  const fetcher = new FetcherSync()

  expect(() =>
    fetcher.fetch(new URL("file-store:example-file.txt")),
  ).toThrowError()
})

test("We can extend a fetcher by registering new handler to protocol.", () => {
  const fetcher = new FetcherSync()

  fetcher.register("echo", (url) => {
    return url.href
  })

  const href = fetcher.fetch(new URL("echo:abc"))
  expect(href).toEqual("echo:abc")
})
