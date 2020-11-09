import { Mode, Resolver } from "./calcs"
import Custom1Resolver from "./custom_1"
import Custom2Resolver from "./custom_2"
import DefaultResolver from "./default"

const resolvers: Map<Mode, Resolver> = new Map()
resolvers.set(Mode.Default, new DefaultResolver())
resolvers.set(Mode.Custom1, new Custom1Resolver())
resolvers.set(Mode.Custom2, new Custom2Resolver())

export default resolvers