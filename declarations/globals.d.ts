// https://dev.to/vborodulin/ts-how-to-override-properties-with-type-intersection-554l
type Override<T1, T2 extends Partial<Record<keyof T1, unknown>>> = Omit<T1, keyof T2> & T2
