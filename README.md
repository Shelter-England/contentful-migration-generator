# Contentful migration/content export generator

Creates a base set of migrations based on your Contentful content models. A single migration file will be added to the `/migrations` folder for each content model.

This is then easily importable into any other Contentful space or can be used as a base to be included in development workflow for new features if you haven't been creating migrations during the initial phases of your build.

Content exporting has been added, to pull all your environment entries including setup like webhook configuration and roles.

Create a `.env` file in the project root and provide your Contentful environment, space id and access token.

- space_env = 'master'
- space_id = 'YOUR SPACE ID'
- access_token = 'YOUR CDA TOKEN'

Run `yarn install` followed by `yarn migrations-generate`.
