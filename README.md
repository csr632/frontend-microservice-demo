# frontend-microservice-demo

This is a showcase of the workflow that achieves front-end microservices(a.k.a. micro-frontend) with systemJS and rollup.

> [SystemJS](https://github.com/systemjs/systemjs) can be considered as a "shim" to make older browsers support these proposals: [esModule loading](https://github.com/whatwg/loader), [dynamic-import](https://github.com/tc39/proposal-dynamic-import) and [import map](https://github.com/WICG/import-maps). When those old browsers die out, we can even drop systemJS and achieve this workflow natively!

## How to run this

Run `npm install` in these five places:

1. `/`
2. `/shared-lib`
3. `/team-a`
4. `/team-b`
5. `/top-app`

Then, run `npm run serveAll` in the root directory.

Open your browser and visit [http://127.0.0.1:8004/](http://127.0.0.1:8004/).

## What this workflow means

Microservice is all about loosely couple among teams:

> 'Team' refers to a very abstract concept here. It doesn't need to be a real team with real people in it. It can be any project with its own release schedule.

1. Microservices can be developed, published and deployed **independently**.
2. One microservice (or the top app) can call other microservices, without installing and building them. The caller only needs to know the "name" and "interface" of the microservices, and doesn't need to know their deployment and implementation details.

In this demo:

- `/shared-lib` provides several shared libraries, each being a microservice. `/shared-lib` is used to extract common dependencies(usually npm packages) and share them. So other microservices can exclude them from thier bundle and avoid loading duplicate code.
  > `/shared-lib` can be mantained inside `/top-app`, if you want.
- `/team-a` and `/team-b` are two microservices mantained by different teams.
  - They are developed, published and deployed **independently**. (They have different release schedule and deployment address)
  - `/team-a` calls a helper from `/team-b`, without installing and building `/team-b` into its own bundle. `/team-a` don't even need to know where `/team-b` is deployed! `/team-a` refer to `/team-b` by its name, not by its "address". How "name" are resolved into "address" is determined by the "import map", which is configured by `/top-app`
- `/top-app` is the top-level application, with whole control to the HTML file and the import map.
  - Import map is the **only** place where:
    - Microservice "name" are bound to their "deployment location"
      ("deployment location" is usually a CDN URL)
    - Deployment locations appear. (In all other places, we refer to a microservice by its "name")

## Suggestions

### Deliver optimized packages

All shared-libs and microservices should be optimized in production.
"Optimize" means "rolling up" a big module dependency tree (with many modules in it, and **one** of them is the entry point) into one big module (which exports same APIs as the entry point).
Optimizing packages give us these benefits:

- Reduce module-loading requests significantly
- Get granular caching per optimized package boundary, so that users only re-fetch the package that change

We use rollup to optimize packages in this demo. The modules referenced by the import map are already optimized.

### Generate import map automatically

When a microservice release a new version, it is often deployed in a new address(For example, `https://some-cdn.com/team-a/1.0.1/bundle.js`). And the import map should be updated to use the new release. This means that the import map will be updated very frequently.
In practise, we usually build a system to generate import map automatically. (In general, this system monitors the latest **`^1.0.0`** version of `team-a`, and populates the deployment address into the import map of `/top-app`)

### Inline import map into HTML file

It is recommended to inline import map into HTML file in practise, because:

- Import map will make its cache invalidate frequently
- Import map is "critical resource" to render the app

## TODOs

1. Develop a tool that generates import map from a "microservice declaration" (perhaps introducing a new field in package.json)
2. Development workflow

# 场景

1. 【必须共享的依赖】top-app 加载 team-b 的微服务。top-app 将 react 注入 team-b

- 如果 team-b 升级依赖的 react 到下一个大版本（比如 react19），那么 team-b 自己也需要升级大版本号。否则， top-app 会将 react18 注入 team-b，导致 team-b 异常。所以 team-b 要升级大版本号，防止 top-app 加载到依赖 react19 的 team-b。
- 后面 top-app 也要升级大版本的时候，修改 team-b 依赖的大版本号即可。
- 如果 team-b 还没有发布支持 React19 的版本，top-app 就不能先升级。否则，top-app 会将 react19 注入 team-b，而 team-b 本来是依赖 react18 的，这会造成 team-b 异常。

2. 【非必须共享的依赖】top-app 加载 team-b 的微服务。top-app 依赖 lodash4，team-b 依赖 lodash3。由于 lodash 有多份实例不会造成行为异常（只是浪费一些带宽），因此 top-app 可以使用 team-b，不过要做一些额外工作来让 team-b 拿到正确的依赖：

- top-app 不能将自己的 lodash4 注入 team-b，因为 team-b 期待 lodash3。
- top-app 需要安装一份 lodash3（安装方式 `yarn add lodash3@npm:lodash@^3.0.0`），然后在加载 team-b 的时候注入依赖：

```js
import loadsh3 from "loadsh3";
load("team-b", { lodash: loadsh3 });
```

3. 【透传依赖】假设 team-a 是一个微服务，这个微服务要加载另一个微服务 team-b，并且 team-b 依赖于 lodash。team-a 可以先从自己的加载方拿到 lodash，然后将它传递给 team-b。

4. 【动态加载】

提前下载 template
