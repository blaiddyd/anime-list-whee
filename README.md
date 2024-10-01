## Getting Started
If you have nvm installed, you can install the correct node version by running `nvm use`
Otherwise, this project uses node version 18.20.2 

```bash
nvm use
npm i
npm run codegen # generate your GraphQL types
npm run dev # run in dev mode with hot reload
npm run build # make a production build
npm run lint # linting 
```

You can now view the Anime Codex at [http://localhost:3000](http://localhost:3000)

## Project Structure
- Everything lives inside of the `app` folder.
- We have the central `/app/layout.tsx` component which comes with the ombre background.
- The homepage is not very interesting, just a button that takes the user to `/codex`
- `/app/apolloClient.ts` has our Apollo Client setup. This can probably be moved to `app/lib` instead to take advantage of the invisible pages functionality that next has e.g. with the `_components` folder.
- `api/` has all of our API routes. We only have one route `/api/login` which handles the creation/update of sessions
- Pages
    - `/app/login`
    - `/app/profile`
    - `/app/codex`
- Components
    - `/app/_components/AnimeList`: This is the chunky component that comes with all of the logic to load anime info
    - `/app/_components/ImageWithFallback`: Next Image, but with a fallback URL that can be provided in case the image fails to load
    - `/app/_components/Navbar`: Global navbar with navigation to `/codex` & `/profile`
    - `/app/_components/Loader`: Cute little loader

## Future improvements
- There is a significant amount of layout shift happening the main `/codex` page while loading in all the anime. This could be tremendously improved.
- User info should not just be stored in a cookie but since we're not storing passwords for this app, the cookie way works better.
- A more sophisticated state management (using Redux) in the future can save some double fetching of data. 
- The forms on the `/login` and `/profile` pages can be combined to decrease code reuse.
- The API route `/api/login` can be better named since it handles all of the sessions.
- Unit tests with good ol RTL
- E2E tests with Playwright or Cypress
- Bug with the review accordions not closing after clicking, pretty bad user experience
- Proper redirects :/ Because next middleware is too a bit strange with cookie caching and such
- On vercel, for some reason going to a `/codex?page={number}` directly causes the auth state to be null. I could not reproduce this in local production builds and I'm not like super familiar with the vercel environment so not sure what the issue is
... And many more things I am definitely missing!

## Deployment

The anime codex is deployed at [https://anime-list-whee.vercel.app](https://anime-list-whee.vercel.app)
Pages
- [https://anime-list-whee.vercel.app/codex](https://anime-list-whee.vercel.app/codex)
- [https://anime-list-whee.vercel.app/profile](https://anime-list-whee.vercel.app/profile)
- [https://anime-list-whee.vercel.app/login](https://anime-list-whee.vercel.app/login)