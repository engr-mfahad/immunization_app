## Description

Immunization application for Mars leadership team to analyze historical data and look for the guidance related to a new spreading infection.

## Features

- Dataset can be refreshed as on needed basis and for each request its status could also be tracked.
- Easy fetching of historical data with or without filteration criteria.
- Advice offering with or without filteration criteria.

## Prerequisites

- Redis instance setup and running.
- MySQL instance setup and running.
- See ***.env*** for environment variables configuration.

## API endpoints

- **/datastore/sync:** *Refresh the dataset.*
- **/datastore/job/:id/status:** *Check the refreshed job status.*
- **/disease/history:** *Get historical data with or without using any of the criteria as query params.*
- **/disease/advice:** *Obtain advice with or without using any of the criteria as query params.*

## Special characters encodings for query param

| Character   | Encoding    |
| ----------- | ----------- |
| Space       | %20         |
| !           | %21         |
| “           | %22         |
| #           | %23         |
| $           |	%24         |
| %           |	%25         |
| &           |	%26         |
| ‘           |	%27         |
| *           |	%2A         |
| +           |	%2B         |
| ,           |	%2C         |
| /           |	%2F         |

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
