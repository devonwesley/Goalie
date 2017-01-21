# Goalie ![Image of Goalie](http://mrnussbaum.com/slapshot1/ipad/images/goalie.gif =100x20)

## Contributing

1. Take a ticket from the issues tab
2. Cut a topic branch
3. Finish the ticket
4. Submit a pull request

### Development Setup

You'll need to
[register this app](https://github.com/settings/applications/new)
as an `Oauth application` on Github.

```
Application name
Goalie (development)

Homepage URL
http://localhost:5000/

Application description
A Goal viewer for learners to easily navigate the goal library.

Authorization callback URL
http://localhost:5000/oauth_callback
```

Copy the `client id` and `client secret` and use them below:

Create a `.env` file in the root of the cloned repo that looks like this:
```
GITHUB_CLIENT_ID=GET_THIS_VALUE_FROM_GITHUB
GITHUB_CLIENT_SECRET=GET_THIS_VALUE_FROM_GITHUB
```

```
#### Run the Server!

At this point, you should be able to run 'npm start' without errors.


#### Running Tests

Run `npm test` to run the mocha tests

#### Submitting a pull request

Rebase your branch off of the latest `origin/master` before submitting your pull request

```sh
git commit ... // commit all your changes
git rebase origin/master
// resolve any conflicts
npm install
npm test
git push origin `BRANCH-NAME-HERE`
```

## Architecture

- Node
- Express
- Webpack
- Babel es2016
- Github API
- React


#### HTTP API

| action                     | CRUD   | verb | path                             |
| -------------------------- | ------ | ---- | ---------------------------------|
| loginCallback()            | index  | get  | /api/v1/auth/login               |
| oauthCallback()            | index  | get  | /api/v1/auth/oauth_callback      |
| goalDetailsCallback()      | show   | get  | /api/v1/goals/goal_details       |
| getLabelsCallback()        | show   | get  | /api/v1/goals/all_labels         |
| getAllMilestonesCallback() | show   | get  | /api/v1/goals/all_milestones     |
| getCommentsCallback()      | show   | get  | /api/v1/comments/:comment_number |
| createCommentCallback()    | create | post | /api/v1/comments/create_comment  |
| updateCommentCallback()    | update | post | /api/v1/comments/update_comment  |

### Contributors
