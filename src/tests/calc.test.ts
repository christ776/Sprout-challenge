import { Mode, resolvers } from "../app/slice"
import { Payload } from "../utils/calcs"
import { H } from "../utils/calcs"

describe('Default Resolver starts', () => {
  it ('A && B && !C -> M', () => {
    const D = 0.50
    const E = 30
    const payload: Payload = {
      A: true,
      B: true,
      C: false,
      D: D,
      E: E,
      F: 0
  }
  
    const resolver = resolvers.get(Mode.Default)
    const result = resolver?.getResultsFor(payload)
    expect(result?.H).toBe(H.M)
    expect(result?.K).toBe(D + (D * E / 10))
  })
  it ('A && B && C -> P', () => {
    const D = 0.50
    const E = 30
    const F = 10
    const payload: Payload = {
      A: true,
      B: true,
      C: true,
      D: D,
      E: E,
      F: F
  }
  
    const resolver = resolvers.get(Mode.Default)
    const result = resolver?.getResultsFor(payload)
    expect(result?.H).toBe(H.P)
    expect(result?.K).toBe(D + (D * (E - F) / 25.5))
  })
  it ('!A && B && C -> T', () => {
    const D = 0.50
    const E = 30
    const F = 10
    const payload: Payload = {
      A: false,
      B: true,
      C: true,
      D: D,
      E: E,
      F: F
  }
  
    const resolver = resolvers.get(Mode.Default)
    const result = resolver?.getResultsFor(payload)
    expect(result?.H).toBe(H.T)
    expect(result?.K).toBe(D - (D * F / 30))
  })
})

describe('Tests Custom 1 Resolver', () => {
  it ('!A && B && C -> P', () => {
    const D = 0.50
    const E = 30
    const F = 10
    const payload: Payload = {
      A: true,
      B: true,
      C: true,
      D: D,
      E: E,
      F: F
  }
  
    const resolver = resolvers.get(Mode.Custom1)
    const result = resolver?.getResultsFor(payload)
    expect(result?.H).toBe(H.P)
    expect(result?.K).toBe(2 * D + (D * E / 100))
  })
})

describe('Tests Custom 2 Resolver', () => {
  it ('A && B && !C -> T', () => {
    const D = 0.50
    const E = 30
    const F = 10
    const payload: Payload = {
      A: true,
      B: true,
      C: false,
      D: D,
      E: E,
      F: F
  }
  
    const resolver = resolvers.get(Mode.Custom2)
    const result = resolver?.getResultsFor(payload)
    expect(result?.H).toBe(H.T)
    expect(result?.K).toBe(D - (D * F / 30))
  })

  it ('A && !B && C -> M', () => {
    const D = 0.50
    const E = 30
    const F = 10
    const payload: Payload = {
      A: true,
      B: false,
      C: true,
      D: D,
      E: E,
      F: F
  }
  
    const resolver = resolvers.get(Mode.Custom2)
    const result = resolver?.getResultsFor(payload)
    expect(result?.H).toBe(H.M)
    expect(result?.K).toBe(F + D + (D * E / 100))
  })
})

describe('Tests Edge Conditions', () => {
  it ('!A && !B && !C -> P', () => {
    const D = 0.50
    const E = 30
    const F = 10
    const payload: Payload = {
      A: false,
      B: false,
      C: false,
      D: D,
      E: E,
      F: F
  }
  
    const resolver = resolvers.get(Mode.Default)
    expect(() => {
      resolver?.getResultsFor(payload)
    }).toThrow('Does not compute')
  })
  it ('!A && !B && !C -> P with Custom 1', () => {
    const D = 0.50
    const E = 30
    const F = 10
    const payload: Payload = {
      A: false,
      B: false,
      C: false,
      D: D,
      E: E,
      F: F
  }
  
    const resolver = resolvers.get(Mode.Custom1)
    expect(() => {
      resolver?.getResultsFor(payload)
    }).toThrow('Does not compute')
  })
  it ('!A && !B && !C -> P with Custom 2', () => {
    const D = 0.50
    const E = 30
    const F = 10
    const payload: Payload = {
      A: false,
      B: false,
      C: false,
      D: D,
      E: E,
      F: F
  }
  
    const resolver = resolvers.get(Mode.Custom2)
    expect(() => {
      resolver?.getResultsFor(payload)
    }).toThrow('Does not compute')
  })
})

describe('Another edge condition', () => {
  it('Same input, but changing resolver', () => {
    const D = 0.50
    const E = 30
    const F = 10
    const payload: Payload = {
      A: true,
      B: false,
      C: true,
      D: D,
      E: E,
      F: F
  }
  
    let resolver = resolvers.get(Mode.Custom2)
    const result = resolver?.getResultsFor(payload)
    expect(result?.H).toBe(H.M)
    expect(result?.K).toBe(F + D + (D * E / 100))

    //change resolver
    resolver = resolvers.get(Mode.Default)

    expect(() => {
      resolver?.getResultsFor(payload)
    }).toThrow('Does not compute')
  })
})


