<h1 align="center"> hermes-crypto</h1>
<p align="center"><img alt="hermes-crypto" src="./src/assets/svg/hermes-crypto-logo.svg" width="200"></p>

# Technical Decisions

## Error Display

I have decided to make use of `ErrorBoundaries` as well as `errorElement`s in `ReactRouter`. Why? The Route component's `errorElement` is useful for the specific occasions an error is thrown during processing a route's loader or action functions or when rendering the routed component and you can render more specific and useful UI whereas the regular React error boundaries are more for unexpected errors. For an error boundary being hit, we display a small pop-up to the user. For errors during route processing, we can customize the error page. For now the error page is quite simple but it can be expanded.
