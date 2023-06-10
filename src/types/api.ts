export type ApiResponse<T> = {
  message: string
  data: T
  count?: number
}
