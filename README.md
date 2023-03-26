# Electron-Live-Server

> A live-server simulator of Electron desktop application for simulation purposes.
> 
> 一个用于模拟electron桌面应用的electron版本的live-server模拟器。

## Clone project & Use it
1. Initialize project and download dependencies
    ```bash
    # into your local project address
    cd [your address]
    npm install
    # waiting download
    ```
2. Edit pakage.json
3. Replace files in the `dist` directory
4. Get start
    ```bash
    # use script
    npm run start
    ```


## DIY

1. Init project
    ```bash
    # change `entry point` content into `main.js`
    npm init
    ```

2. Download electron
    ```bash
    npm install --save-dev electron
    ```

3. importing electron-forge into an Existing Project<br/>
    [Refer to the official documentation](https://www.electronforge.io/import-existing-project)

4. Edit main.js<br/>
    The key point is express.<br/>
    Change the directory according to the actual situation.
    ```bash
    const server = new express();
    server.use(express.static('./'));
    server.listen(80,()=>{
        console.log('your server is running... at here 80')
    })
    ```

5. Edit package.json<br/>
    Add `"express": "^4.18.2"` into package.json dependencies.

6. Get start
    ```bash
    # use script
    npm run start
    ```