type ApiMethods<T> = { [p: string]: (this: T) => any }

interface ApiConfig {
  name: string,
  source: string,
  method: ApiMethods<any>
}

export function makeAPI<T extends ApiMethods<ApiConfig>>(
  config: ApiConfig & {method: T}
): ApiConfig & T {
  return {
    ...config,
    ...Object.fromEntries(Object.entries(config.method).map(([name, func]) => {
      return [name, func.bind(config)]
    }))
  }
}


class APIHandler {
  private source: string
  constructor(source: string) {
    this.source = source
  }
  add() {

  }
}