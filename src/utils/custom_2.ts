import { Payload, Result, H } from "./calcs"
import DefaultResolver from "./default"

class Custom2Resolver extends DefaultResolver {

  getResultsFor(p: Payload) : Result {
    if (p.A && p.B && !p.C) {
        return { H: H.T, K: p.D - (p.D * p.F / 30)}
    }
    if (p.A && !p.B && p.C) {
      return { H: H.M, K: p.F + p.D + (p.D * p.E / 100) }
    }
  
    return super.getResultsFor(p)
  } 
}

export default Custom2Resolver