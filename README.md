# duck-coding-fe

## Running the application
`npm run start`

## Testing the application`
`npm run test`

## Additional thoughts

I've covered the `Acceptance criteria` I believe. 

For the `Bonus points`: 
  The filtering by category would happen in a similar manner as filtering by name, although I'd have to keep the state of the filters in the page component in order to combine them. 
  The sorting would happen in an sorting component that would emit to the page and sorting would happen there. 
  For error handling I would implement the `ErrorHandler` interface and register that class in the providers of a module under the `ErrorHandler` injection token.
