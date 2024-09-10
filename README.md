# vue3Exercise

UI VUE JavaScript Technical Challenge.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm build
pnpm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### Task Description

Task was completed with Vue3, Javascript, [vue-ganttastic](https://zunnzunn.github.io/vue-ganttastic/) library for displaying graphs

### Task Info

• Task displays specific types of work perfumed by machines.
• Table can display many different work that are done by different machines.
• Each task represent different color
• Table displays and reads data from json, and assumes that that data has specific format:

```sh
  [{jobId: "uniq job Id",
    tasks: [
      {
        taskId: uniq task Id,
        taskName: eg. Printing, Laminate,
        beginDate: MM:HH,
        endDate: MM:HH
      },
    ]
  }]
```

• beginDate and endDate are displayed in a format:

```sh
  "MM:HH"
```

• Assumed that data in json are validated and hour endDate or later than the beginDate
• Machines include, but are not limited to, printers, laminators, guillotines and UV
coating.
• Jobs can be varied by durations.
• A machine can only perform one task at a time.
• A task can only start when its predecessors have completed AND there is availability on the
machine.
• Not all jobs follow the same sequence of tasks.
• Tasks should be performed as early as possible.
