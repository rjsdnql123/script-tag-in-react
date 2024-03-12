# script-tag-in-react

React Jsx 내부에서 3rd-party-script를 호출 하기 위한 라이브러리.

처음부터 불러오지 않아도 되는 D3, jquery, chart lib 를 필요한 페이지 혹은 Component에서 불러올 수 있도록 하는 라이브러리

## install
#### NPM

```js
npm i script-tag-in-react
```

## Example

```js
import Script from "script-tag-in-react";

function Component() {
  const onReady = () => {
    // ... 이 전에 스크립트를 다운로드 했거나, 스크립트 다운 완료 후 사용 준비 완료
  };

  const onError = () => {
    // ... 스크립트 다운로드 실패
  };

  const onLoad = () => {
    // ... 첫번 째 스크립트 다운 완료
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


