export type AniseObjectUnit<Props, Methods> = Props & Methods

/**
 * Anise target must has attribute `id`
 */
export interface AniseData {
  id: string
}

export type AniseObject<Props, Methods> = {
  __module__: unknown
  from(data: Props): AniseObjectUnit<Props, Methods>
}

export type AniseProps<Methods> = {
  method: Methods
}

export interface IAniseConstructor<Data extends AniseData> {
  bindProps<Methods>(props: AniseProps<Methods>): AniseObject<Data, Methods>
}

export function AniseConstructor<Data extends AniseData>(name: string): IAniseConstructor<Data> {
  return {
    bindProps(props) {
      return {
        __module__: null,
        from(data) {
          return {
            __data__: data,
            ...data,
            ...props.method
          }
        }
      }
    }
  }
}
