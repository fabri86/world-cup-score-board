# WORLD CUP SCORE BOARD (Sport radar tech assessment)

The app consists of:

- a TypeScript+React app
- an Express server module
- a common module for type definitions (and potentially utils) shared between FE and BE

The app can be perceived as a Monorepo leveraging the concepts of workspace in yarn. This strategy can help removing/preventing a lot of duplication around the organization projects' codebase.
For example, I could have inserted the utils as well in the common module together with the type definitions, but after a few days of heat my fingers are tired and my old personal laptop increases my room's temperature by a few degrees XD.

# Architecture and patterns

The choice of introducing an express module has been made to allow fetching data from https://api.football-data.org without being affected by CORS issues. Otherwise CORS will occur when making a request made in the browser to an endpoint on that domain, because different from the domain of the webpage making the request.

The React app components leverage the teams data injected in the Dependency Injection fashion by using the React context (TeamsContext), in order to avoid props drilling.
Other than this pattern, the container/presentational pattern has been used with the goal of keeping the logic in one container (GamesManager) and displaying the app content through presentational components (e.g. GameTile, TeamInfo, ...).

The event handlers are wrapped by useCallback to avoid recreating handlers at each render. I used a useMemo in the GamesList for showing another way of increasing performances of React app, but I am aware that this comes with a cost and unless there are other props changing, this can be an overkill since the collection changes on any event triggered by the user (I prefer Immutability for a series of reasons).

Despite the fact that I am not a fan of comments in code (code as a literature), I left a consideration in the onCreateGameHandler to explain the decision of appending the newly created game at the end of the collection of games. Keeping the array sorted might have been useful to reduce the Big O complexity, in case the sorting by tot amount of goals was not a requirement.
Since the amount of items in the collection cannot go beyond 16 (There are 32 teams in a World Cup final phase, therefore 16 concurrent games at most), keeping sorted that collection on insertion seemed to me an overkill (we should be in favour of KISS rather than over engineering).

I tried to apply SOLID principles in the solution when possible.
For instance (Single Responsibility), I decided to leave the responsibility of sorting the games to the GamesList component (each component should have its own responsibility and I did not want to overload the GamesManager with the sorting one).
Another example is the D (Dependency Inversion) principle, previously mentioned when speaking about the data context. High level modules should depend on abstractions in order to decoupling as much as possible. If one day the data provider or endpoint changes, the GamesManager won't require any modification in order to keep working just fine, as soon as the BE endpoint and the use-fetch-teams keep returning the teams to work with.

I removed wherever possible duplication and promote reusing components, so that it would be easier to scale the app in case more requirements come out.

# Dependencies

I used RTL for testing the app (unit tests/integration tests) because it is the modern approach, to test apps from a app user perspective abstracting from the implementation.
I used tailwind because it comes handy with its straightforward syntax and for simple scenarios like this one, which are not requiring a lot on terms of complex styling.
I used react-icons, react-toastify (notifications) and typpyjs (tooltips) to improve the user experience. I tried not to use too many libraries not to increase the bundle size and to force me considering code splitting for such a easy scenario as a technical assessment.

# Framework

I used vite and vitest because as the French name suggests, it seems lately pretty quick. It was my first usage of Vitest (never tried it before)

# How to run the app

After cloning the app, from the 'sport-radar' folder (one level above the packages), please run:

- yarn (to install dependencies)
- yarn start (to build the common module and run concurrently the FE and BE)
- open the browser on http://localhost:5173/ as suggested by Vite in the console and enjoy the world cup ⚽🏆😎
