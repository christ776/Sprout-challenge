export interface Payload {
  A: boolean
  B: boolean
  C: boolean
  D: number
  E: number
  F: number
}

export enum H {
  M = 10,
  P = 20,
  T = 30
}

export interface Result {
  H: H
  K: number
}

export interface Resolver {
  getResultsFor(p: Payload) : Result
}
