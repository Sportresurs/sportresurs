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

All merged pull-requests to the `develop` branch automatically deploy to [staging-server](https://sportresurs-staging.herokuapp.com/). <br />
All merged pull-requests to the `main` branch automatically deploy to [production-server](https://sportresurs.herokuapp.com/).

## Commit strategy

We use [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows) workflow as our commit strategy. <br />

Once the task is complete you should:

1. make sure you don't leave any redundant commented-out code
2. make a pull-request to `develop` branch

You should check your open pull-requests at least once a day and in case if any conflicts occur fix these conflicts.

### Branch naming

We create feature branches out of `develop` with names likes t-69-description, where description starts with capital letter verb. <br />
For example: t-69-add-comments-to-pull-request. 

### Commit naming

We name our commits like T-ticket_number Description, where description starts with capital letter verb. <br />
For example: T-69 Add comments to pull request

### Pull request naming

Pull requests should be named same as task title in Trello starting with task number. <br />
For example: T-69 Review pull requests

_Please note, we always use Present Simple. <br />
For example: use "Add" instead of "added". <br />
We do not use # symbol when referencing tickets, because GitHub references it like link to PR._

## Code style

We use `eslint` static code analyzer with a custom set of rules to ensure appropriate code style.

You need to install a pre-commit hook, to execute `eslint` checks automatically on every commit. <br/>
Run `npm run prepare` to install husky pre-commit hook properly.


### Style conventions

1. We are using `PropTypes` for all our components that have props.
2. All components folders must be named in CamelCase. 
3. All components must be exported with index.js file inside component folder. 
4. We are using upperCase for class naming in our CSS modules.
5. We try to use full names for our variables and imports, and avoid using abbreviations. Examples: "styles", not "s". "classNames", not "cn", etc...
6. We store images in /public folder with possible exception to svg react files.
7. We use .js filetype exclusively for our components
8. When naming bool variables, we use "is" or "should", for example `isUserClient`, `shouldPageRefresh`

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

This approach requires a valid email address (Gmail). <br />
On your email account, you will need to give access to login from third-party applications [account.google](https://myaccount.google.com/lesssecureapps?) <br />
Also, this approach has limitations (500 emails per day / at a time). <br />
If the mail got into the "SPAM" section, you need to indicate the sender as "verified". <br />
After you indicate that this is a verified sender, email will stop getting into "SPAM". <br />

## Administrator Authorization Configuration

Step 1: Login in [console.cloud.google](https://console.cloud.google.com/). <br />
Step 2: Create a [project](https://console.cloud.google.com/projectselector2/apis/credentials?supportedpurview=project). <br />
Step 3: Create [OAuth client ID](https://console.cloud.google.com/apis/credentials/oauthclient), select `Web application` type.<br />
Step 4: Add Configuration <br />
> Authorized JavaScript origins: `{domain name}`, <br />
> Authorized redirect URIs: `{domain name}/api/auth/callback/google`. <br />
Step 5: `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` save in `.env` file. <br />