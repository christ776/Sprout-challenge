import { Payload, Result, H } from "./calcs"
import DefaultResolver from "./default"

class Custom1Resolver extends DefaultResolver {

  getResultsFor(p: Payload) : Result {

    if (p.A && p.B && p.C) {
      return { H: H.P, K: 2 * p.D + (p.D * p.E / 100) }
    }
  
    return super.getResultsFor(p)
  } 
}

export default Custom1Resolver