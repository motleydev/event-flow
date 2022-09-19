1. Init NextJS project
   a. `npx create-next-app@latest --ts www`
2. Enable Codegen
   a. `yarn add -D @graphql-codegen/cli`
   b. `yarn graphql-code-generator init`
3. Auth
   a. openssl rand -hex 32
   ```
   { "key": "this-is-a-generic-HS256-secret-key-and-you-should-really-change-it", "type": "HS256"}
   ```
