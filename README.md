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
2. One microservice (or the top app) can call other microservices, without installing and building them. The caller only need to know the "name" and "API" of the callee, and don't need to know it's deployment and implementation details.

In this demo:

- `/shared-lib` provide several shared libraries, each being a microservices. `/shared-lib` is used to extract common dependencies(usually npm packages) and share them. So other microservices can exclude them from thier bundle and avoid loading duplicate code.
  > `/shared-lib` can be mantained inside `/top-app`, if you want.
- `/team-a` and `/team-b` are two microservices mantained by different teams.
  - They are developed, published and deployed **independently**. (They have different release schedule and deployment address)
  - `/team-a` call a helper from `/team-b`, without installing and building `/team-b` into its own bundle. `/team-a` don't even need to know where `/team-b` is deployed! `/team-a` refer to `/team-b` by its name, not by its "address". How "name" are resolved into "address" is determined by "import map", which is configure by `/top-app`
- `/top-app` is the top-level application, with whole control to the HTML file and the import map.
  - Import map is the **only** place where:
    - "Microservice name" are bound to their "deployment location"
      ("deployment location" is usually a CDN URL)
    - Deployment locations appear. (In all other places, we refer to a microservice by its "name")

When a microservice release a new versoion, it is deploy in a new address(For example, `https://some-cdn.com/team-a/1.0.1/bundle.js`). And the import map should be updated to use the new release. So the import map will be updated very frequently. In practise, we usually build a system to generate import map automatically. (In general, this system monitor the latest **`^1.0.0`** version of `team-a`, and populate its deployment address into the import map of `/top-app`)

Because import map will make its cache invalidate frequently, and also, it is "critical resource" to render the app, it is recommended to inline import map into the HTML file.
