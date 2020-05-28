# Answers to technical questions

---

## 1.

Spent roughly 8-10 hours on-and-off. I would add the following:

- A page to see more details about each restaurant.
- A more in-depth integration with the Opentable API to allow reservation from the restaurant page. But this isn't really possibly with the current public API.

## 2.

There are few really nice additions to ES2020 like nullish coalescing and dynamic imports. But my favorite one has to be optional chaining!

Instead of checking the action's returned properties manually: `error.response && error.response.status && error.response.status === 404`, you can optionally chain it: `error?.response?.status === 404`. Unfortunately there's no support for it on IE (just yet).

## 3.

The best way would be to have CI/CD as part of your delivery and deployment process. Previously had to track a bug in production which was slowing down on the same request but at random intervals. The problem was a backend one but I arrived at the conclusion through comparing and debugging the staging environment with what was in production. I've found that this is generally a very underutilized process if initially your logs aren't telling you much.

## 4.

- Return a 404 status if a city isn't found. Currently it just sends back an empty array of restaurants and the frontend has to handle that case.
- Have the API return a `400 - Bad Request` instead of a 404 when trying to hit a malformed endpoint.
- Build backend functionality to search and filter restaurants. While frontend searching is totally fine, you're limited to performing a search on only the returned list of restauraunts. That or you make a fetch call every time a filter is performed. There's pros and cons to both approaches and I'm happy to discuss this further.

## 5.

```
{
  "name": "Vishesh",
  "profession": {
    "full_time": "Full stack developer",
    "part_time": "🍕 connoisseur"
  },
  "technical_skills": [
    "HTML",
    "CSS",
    "JavaScript",
    "C++",
    "React",
    "Redux",
    "Vue.js",
    "Node.js",
    "MySQL",
    "PostgreSQL",
    "Jest",
    "Enzyme",
    "Testing Library",
    "Git",
    "Redis",
    "Docker"
  ],
  "likes": [
    "pizza",
    "electronic music production",
    "running",
    "travelling"
  ]
}
```
