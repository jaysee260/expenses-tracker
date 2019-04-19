# Expenses Tracker

A personal project I started some 4+ months ago, left behind, and am picking up again.

What is here is a very young, somewhat working prototype that consumes part of the Plaid API in sandbox mode.

### Short term goals for this project
- Refactor the back end code to be better organized to avoid headaches going forward.
- Limit the back end's responsibilities.
    - It currently serves some mark-up. Make it a completely headless API.
- Migrate current front end code to a React client.
    - The backend code currently serves a client page, which is built using EJS. I adopted this because it's what the Plaid tutorial used; at the time, I just wanted to get something to work. Part of this migration to a stand-alone React applications would inevitably entail refactoring.

### Long term goals
- Better API keys managements
    - Redis?
- On the client side:
    - Replace React Router with [Reach Router](https://reach.tech/router)
    - Implement a Drag and Drop library. Tentative options are:
        - [React DnD](https://react-dnd.github.io/react-dnd/docs/overview)
        - [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) by Atlassian