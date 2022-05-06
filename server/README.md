# Discord Profiler Backend

## About this folder

This folder contains the source code for the API of [htts://discord-profiler.vercel.app](https://discord-profiler.vercel.app)

## Project setup

Perform the following steps if you want a working copy of the API

1. Register a Discord application at [https://discord.com/developers/applications](https://discord.com/developers/applications), grab the `CLIENT_ID`, `CLIENT_SECRET` from `Oauth2 > General` on the panel on the left. Then type your `REDIRECT_URI` under the heading `Redirects`, it should follow the format `http://localhost:{YOUR_PORT}/api/callback`
2. Assuming you cloned the entire project, you should see a `config` at the root of `discord-profiler` project folder. That folder contains a `default.json` file with environment variables in their default state. Paste your gotten `CLIENT_ID`, `REDIRECT_URI` and `CLIENT_SECRET` in the corresponding fields in the `default.json`
3. Install the project dependencies using the command

    ```sh
    yarn
    ```

4. There are different modes of the app your can run, the commands are below

    ```sh
    $ yarn dev # This starts server with NODE_ENV=dev
    $ yarn start # This starts server with NODE_ENV=staging
    
    # If you get this output celebrate, 🎊🎊
    # Server listening on http://localhost:YOUR_PORT
    ```

**Note:** Look in the source code for restrictions gotten from the varied `NODE_ENV`

### Configuration

Looking for more stuff, or maybe you just don't like having the defaults, below will help you configure the project

#### Environment Configurations

You can configure the server to use different environment configuration files based on the currently set `NODE_ENV`, this means that in the `config/` folder in the root project folder, to use different environment configurations just create new files, like `prod.json`, and it will automatically pair if corresponding to `NODE_ENV` on server start

**Note:** everything in the `[name].json` can be edited

- `port` = defines where the server will listen to connections on
- `discord.clientID` = Your Discord's application `CLIENT_ID`
- `discord.clientSecret` = Your Discord's application `CLIENT_SECRET`
- `discord.redirectURI` = Your Discord's application `REDIRECT_URI` last division, this means `/callback` for this example
- `secretKey` = Your application secret key, it'll be used to generate the `JWT` token later

#### Secret Keys

You can regenerate your secret keys using the command

```sh
$ yarn generate:id # This only nanoid under the hood
# acqioeGlS7ZzLlBvrGdskJwqwqq8Hj-Bib86W3tTt75Wvt-xUpyF4VqgPk65lY0WWo9D9BGI
```

### License

This project is licensed with [MIT](../LICENSE)

#### Made with 🍞 by OyewoleOyedeji in Nigeria (NG)
