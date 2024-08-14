<h1 align="center"> hermes-crypto</h1>
<p align="center"><img alt="hermes-crypto" src="./../src/assets/svg/hermes-crypto-logo.svg" width="200"></p>

# Technical Decisions

## Error Display

I have decided to make use of `ErrorBoundaries` as well as `errorElement`s in `ReactRouter`. Why? The Route component's `errorElement` is useful for the specific occasions an error is thrown during processing a route's loader or action functions or when rendering the routed component and you can render more specific and useful UI whereas the regular React error boundaries are more for unexpected errors. For an error boundary being hit, we display a small pop-up to the user. For errors during route processing, we can customize the error page. For now the error page is quite simple but it can be expanded.

## Simple, Single Page
Let us not get into the details of react/spas/etc. For now, this application has one page only but the architecture to add routing has already been added. As this application expands, this can be utilized.

## Fetching data
So we use [`Axios HTTP`](https://axios-http.com/docs/intro) as the main way to connect with our API and fetch data. There are 2 layers to this in this project:
```bash
├── src                         
│   ├── data                    <-- Where we keep all our "data" interactions 
│   └── services                <-- This is where we keep our endpoints 
│       └── users.service.ts    <-- This is an example of the users service 
│   └── user.data.ts            <-- This is where we instantiate the instance, create the API service and expose functions to use throughout the app to fetch data
```


## CI/CD

Although not comprehensive, I've decided to make my life easier in these areas:

-   `Linting on PR`: Linting in general is so I can stay consistent. Although I have linting plugins configured, it is a pain to run `npm run lint` every time I make a change or want to see changes. So instead I also run them on creating a merge request. This means that if I collaborate with others, they will be able to see my branch's linting results. Win-win for transparency!
-   `Drafting Releases`: Let us be real. Git should be our source of truth for our code, and when it comes to releases we already spend so much time writing up merge request descriptions. Or at least in my opinion they should be a proper reflection of technical history. Why not use them for release notes? And why trawl through many many releases into `main`? Release drafter makes life easier, pre-formats things and automate something that should truly always have been automated. Drafting release notes.
-   `Running Tests & Coverage`: This is a no-brainer. Setting up tests, running it on each merge request (again, transparency if I had team members) and spitting out the output is meaningful. Of course, it is only meaningful if you have good tests, but that is what reviews are for. There are more powerful tools to review code and perform analysis on them; but that is out of scope for this project.
-   `Deploy after merge`: If not *the* most, then one of the most important pieces of automation. Who wants to build things from their machine and drop it on their server. Or worse yet, build something and deploy it from their terminal? No. Create branch. Work. Merge request. Review. It goes in, and deploy!

### Only 1 environment?

Given the scope of this project, and all the new technologies learnt in the process, I decided to stick with 1 `hosted` environment. That is `prod`. Further enhancements would be to pursue more than one environment and think about my releases differently but as it stands, once something has been tested locally, builds and passes all tests configured then it is ready to be shipped off.

An improvement would be to have a hosted environment like `staging` or `test` where I can [dogfood](https://www.browserstack.com/blog/software-dogfooding/) and test my own work out in the wild using hosted settings. That is out of scope (for this version at least).