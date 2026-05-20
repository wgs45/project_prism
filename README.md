# 🌈 Prism — AI Summarizer Chrome Extension

> AI-powered summarizer built with a modern full-stack web architecture.

---

# ⚙️ Tech Stack

| Layer    | Technology   |
| -------- | ------------ |
| Frontend | React.js     |
| Backend  | Next.js      |
| Styling  | Tailwind CSS |
| API Key  | TBD          |

---

# 🚀 Running the Project

## Prerequisites

- Install Docker on your computer

---

## Setup Steps

1. Open your terminal
   - Unix/Linux → Terminal
   - Windows → CMD / PowerShell

2. Clone the repository

3. Navigate to the project root directory

   > Make sure you are outside the `frontend` and `backend` folders

4. Start the containers

```bash
docker compose up
```

1. Wait until Docker finishes building and running the services

2. Open your browser and visit:

```txt
http://localhost:YourPortNumber
```

✅ The project should now be running successfully.

## Setup Chrome extension

1. Find frontend container id

```bash
docker ps
```

1. Pack source code into chrome extension

```bash
docker exec -it <Docker_frontend_container_ID> pnpm run build
```

1. Open Chrome browser, then navigate to extension setting page

2. Enable Developer Mode, click load unpack

3. Browse project file and choose this specific path, then click ok

```bash
project_prism/frontend/dist
```

✅ The extension should appear now on your browser.

> [!NOTE]
> dist directory only appear upon successful pnpm run build.

---

## Stop the Project

```bash
docker compose down
```

---

# 🌿 Git Workflow

## Before Making Changes

Always pull the latest changes first:

```bash
git pull
```

---

## Development Flow

1. Navigate to the project directory

2. Create a new branch

```bash
git checkout -b your-branch-name
```

1. Start developing ✨

2. Commit your changes with a clear message

```bash
git commit -m "Add feature: summary history"
```

1. Push your branch to GitHub

```bash
git push origin your-branch-name
```

1. Create a Pull Request (PR)
   - Compare your branch against `main`

2. Wait for GitHub Actions to pass ✅

3. Request code review from team members

4. After approval, the PR can be merged into `main`

---

# 📌 Important Notes

> [!IMPORTANT]
> Direct pushes to the `main` branch are blocked to maintain code quality and project consistency.

> [!NOTE]
> Bypassing GitHub Actions is not allowed.

> [!TIP]
> Push changes only after:
>
> - Fixing a bug 🐛
> - Adding a feature ✨
> - Completing meaningful work
>
> Avoid pushing every small line change.

---

# 💬 Need Help?

If you have any questions, feel free to ask in the group.
Happy coding everyone 🚀
