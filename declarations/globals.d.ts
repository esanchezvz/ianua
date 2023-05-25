// https://dev.to/vborodulin/ts-how-to-override-properties-with-type-intersection-554l
type Override<T1, T2 extends Partial<Record<keyof T1, unknown>>> = Omit<T1, keyof T2> & T2

type Merge<T extends object> = {
  [k in AllKeys<T>]: PickType<T, k>
}

type AllKeys<T> = T extends any ? keyof T : never

type PickType<T, K extends AllKeys<T>> = T extends { [k in K]?: any } ? T[K] : undefined
