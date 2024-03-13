# script-tag-in-react

A library for calling third-party scripts within React JSX.

In situations where a React application needs to utilize third-party scripts (such as for payments, D3, jQuery, etc.), it may arise that loading the entire library upfront when the application is launched is unnecessary and costly. This can degrade the user experience and impair rendering performance.

This library is designed to be used in situations where it's not necessary everywhere, but only required in specific pages or components. By using this library, you can call scripts within react-jsx without worrying about duplicate calls to third-party libraries


## install
#### NPM

```js
npm i script-tag-in-react
```

## Features
- You can use the <script> tag within React's JSX.
- You can call third-party scripts from the desired page or React Component, not just index.html.
- You don't need to worry about duplicate calls.
- Once loaded, they persist.
- It supports all functionalities of the HTML <script> tag.
- Supports idleTime calls.
- You can use onLoad, onReady, onError callbacks.

## Example

```js
import Script from "script-tag-in-react";

function Component() {
  const onReady = () => {
    // A function that operates when downloaded and ready for use.
    // If there is a duplicate call, the script will not be invoked,
    //but the function will still operate.
  };

  const onError = () => {
    // function that operates when script download fails.
  };

  const onLoad = () => {
    // A function that operates when the script load is complete.
  };

  return (
    <div>
      <Script
        onReady={onReady}
        onError={onError}
        onLoad={onLoad}
        src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"
        getScriptOption="requestIdleTime"
      />
    ...
  );
}
```

### use Jquery

```js
import Script from "script-tag-in-react";

function ScriptLoadComponent() {
  const jqueryReady = () => {
    window.$((e) => {
      alert(e, "Hello jQuery!!");
    });

  };

  return (
    <div>
      <Script
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        onReady={jqueryReady}
      />
    </div>
  );
}

export default ScriptLoadComponent;

```

## API

### getScriptOption
 - Type: ```afterInteractive | requestIdleTime```
 - Default: ```afterInteractive```
 - optional

### id
 - Type: ```String```
 - optional

### onError
 - Type: ```callback function```
 - optional

### onReady
 - Type: ```callback function```

 - optional

### onLoad
 - Type: ```callback function```
 - optional


