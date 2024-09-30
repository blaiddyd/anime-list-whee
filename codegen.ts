import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'https://graphql.anilist.co/',
    overwrite: true,
    documents: ['src/**/*.(tsx|ts)'],
    generates: {
      './generated/gql/': {
        preset: 'client',
        plugins: [],
        config: {
            inlineFragmentTypes: "combine"
        }
      }
    }
  }
   
  export default config