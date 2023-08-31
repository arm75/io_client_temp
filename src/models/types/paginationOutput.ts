export default interface TPaginationOutput {
    current: number
    prev: number | null
    next: number | null
    items: number[]
}
