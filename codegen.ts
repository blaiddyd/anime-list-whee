import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'https://graphql.anilist.co/',
    overwrite: true,
    documents: ['src/**/*.(tsx|ts)'],
    generates: {
      './generated/gql/': {
        preset: 'client',
        plugins: []
      }
    }
  }
   
  export default config