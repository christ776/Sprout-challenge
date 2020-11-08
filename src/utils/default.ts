import { Resolver, Payload, Result, H } from "./calcs"

class DefaultResolver implements Resolver {
  
  getResultsFor(p: Payload) : Result {
    if (p.A && p.B && !p.C) {
        return { H: H.M, K: p.D + (p.D * p.E / 10) }
    }
    if (p.A && p.B && p.C) {
      return { H: H.P, K: p.D + (p.D * (p.E - p.F) / 25.5) }
    }
    if (!p.A && p.B && p.C) {
      return { H: H.T, K: p.D - (p.D * p.F / 30) }
    }
  
    throw new Error('Does not compute')
  } 
}

export default DefaultResolver