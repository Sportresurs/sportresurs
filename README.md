# About project

This project for ЛКП «Спортресурс» helps to share information about news and sports grounds in Lviv. We are using [Trello](https://trello.com/b/J2wr6eQW/sportresurs) to manage issues.

## Development flow

1. On the Sprint planning, PM moves tasks from Backlog to Sprint backlog, and the entire team estimates these tickets.
2. Developer takes a task from the Sprint backlog column on the [board](https://trello.com/b/J2wr6eQW/sportresurs), assigns to himself, and moves it to "In progress".
3. Once finished, the task gets moved to the "Code review" column, and a pull-request gets created.
4. Team lead and mentor review pull-request and request changes if necessary.
5. Once the pull-request is approved, the team lead merges it, and the task is moved to "Staging deployment".
6. Team lead deploys tasks to the staging server and moves tickets to the "Staging testing" column.
7. QA-engineer performs manual and regression testing and either returns task to "In progress" with explanation in comments or moves it to the "Production deployment" column.
8. Team lead deploys tasks to the production server and moves tickets to the "Production testing" column.
9. QA-engineer performs manual and regression testing. If bugs are found, new tickets are created in Backlog.
10. After the demo at the end of the sprint all the tasks get moved to the "Done" column.

**NB!** A developer should take a new task only if they have nothing in progress AND if there is no unresolved code review feedback.

## Running project in development mode

1. Clone repository
2. Make sure you have PostgreSQL and nvm with appropriate node-version installed
3. `cp .env.example .env` and update env with proper values
4. Run `npm install` to fetch required development-dependencies
5. Run `npm run dev` to start an application

## Deployment

We are using Heroku for all the deployments. You can safely deploy to [staging-server](https://sportresurs-staging.herokuapp.com/) for QA-engineers to be able to test completed tasks.

All merged pull-requests to the `develop` branch automatically deploy to [staging-server](https://sportresurs-staging.herokuapp.com/).
All merged pull-requests to the `main` branch automatically deploy to [production-server](https://sportresurs.herokuapp.com/).

## Commit strategy

We use [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows) workflow as our commit strategy.
We create feature branches out of `develop` with names likes feature/31 where a number is a task number from the Trello board.

Commit message should contain a brief description.

Once the task is complete you should:

1. make sure you don't leave any redundant commented-out code
2. make a pull-request to `develop` branch

You should check your open pull-requests at least once a day and in case if any conflicts occur fix these conflicts.

## Code style

We use `eslint` static code analyzer with a custom set of rules to ensure appropriate code style.

You need to install a pre-commit hook, to execute `eslint` checks automatically on every commit. 
Run `npm run prepare` to install husky pre-commit hook properly.

## Error tracking

We use [Sentry](https://sentry.io/) for error tracking.

To capture API Routes errors, you need to wrap your route handlers with Sentry function:

```js
import { withSentry } from "@sentry/nextjs";

const handler = async (req, res) => {
    res.status(200).json({ name: "John Doe" });
};

export default withSentry(handler);
```

## Testing

We use Jest for testing.

Run `npm run test` command to run Jest in watch mode. <br/>
Run `npm run jest` command to run all tests.

## Setup emails

This approach requires a valid email address (Gmail).
On your email account, you will need to give access to login
from third-party applications [account.google](https://myaccount.google.com/lesssecureapps?)
Also, this approach has limitations (500 emails per day / at a time).
If the mail got into the "SPAM" section, you need to indicate the sender as "verified"
After you indicate that this is a verified sender, email will stop getting into "SPAM"
