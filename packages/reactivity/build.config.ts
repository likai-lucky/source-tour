import { defineBuildConfig } from 'unbuild'

export default {
  entries: ['src/index'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
}
