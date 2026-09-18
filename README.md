
# DevLink

A dynamic developer resource hub built with **Next.js** and **Tailwind CSS** for discovering, searching, filtering, saving, and quickly exploring useful resources for software development.

DevLink provides a focused directory of developer tools, frameworks, APIs, UI libraries, and other resources through a responsive single-page interface.

## Live Demo

**DevLink is deployed and available online.**

🔗 [**Visit DevLink →**](https://dev-link-by-smi.vercel.app/)


## Overview

Finding useful developer resources often means searching through many websites, bookmarks, and documentation pages.

**DevLink** brings commonly used development resources into one organized interface where users can:

* Search resources by title, description, and tags
* Filter resources by category
* Save useful resources for later
* View only saved resources
* Open a quick overview of a resource without leaving the page
* Share filtered results through URL query parameters
* Keep bookmarks saved locally in the browser

The project was built as a practical **Next.js learning project**, focusing on client-side state management, URL-based filtering, reusable components, dynamic UI behavior, and browser storage.

---

## Features

### Resource Search

Search through the available resources using a single search field.

The search checks relevant resource information such as:

* Resource title
* Description
* Tags

This makes it easier to find a specific tool or discover resources related to a particular technology.

### Category Filtering

Resources can be filtered by category using the category controls.

The available categories are generated from the resource data rather than being hard-coded individually, allowing the directory to remain easier to maintain as resources are added.

### URL-Based Filtering

Search and category filters are reflected in the URL through query parameters.

For example:

```text
?search=react&category=Framework
```

This allows filtered views to be:

* Refreshed without losing the selected filters
* Shared with another person
* Opened directly through a URL

### Bookmarks

Users can save resources they want to revisit later.

Bookmarks are stored in the browser using **localStorage**, so no backend or database is required.

### Saved Resources

A dedicated **Show Saved Only** view allows users to quickly switch from the complete resource directory to their bookmarked resources.

### Quick View

Resources can be opened in a quick-view interface to inspect their information without navigating away from the main directory.

### Responsive Interface

The interface is designed to work across different screen sizes, including:

* Desktop
* Tablet
* Mobile

### Reusable Components

The application separates reusable interface elements into components to keep the project organized and easier to maintain.

---

## Tech Stack

| Technology             | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| **Next.js**            | React framework and application structure |
| **React**              | Building interactive UI components        |
| **JavaScript**         | Application logic and state handling      |
| **Tailwind CSS**       | Styling and responsive UI                 |
| **localStorage**       | Client-side bookmark persistence          |
| **Next.js App Router** | Routing and application structure         |

---

## Project Structure

```text
DevLink/
├── app/
│   ├── layout.js
│   ├── page.js
│   └── ...
│
├── components/
│   ├── ResourceCard.js
│   └── ...
│
├── data/
│   └── resources.js
│
├── public/
│   └── ...
│
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
└── README.md
```

### Main directories

**`app/`**

Contains the main Next.js application files, including the primary page and layout.

**`components/`**

Contains reusable UI components used throughout the application.

**`data/`**

Contains the local resource dataset used to populate the directory.

**`public/`**

Contains static assets used by the application.

---

## How It Works

DevLink uses a local resource dataset rather than a backend database.

The general flow is:

```text
Resource Data
     ↓
Next.js Application
     ↓
Search / Category Filters
     ↓
Filtered Resources
     ↓
Resource Cards
     ↓
Quick View / Bookmark
     ↓
localStorage
```

### Search and Filtering

The application maintains the current search and category selections as client-side state.

When the user changes a filter:

1. The selected value is updated.
2. The resource list is filtered.
3. The URL query parameters are updated.
4. The resulting resources are displayed.

This keeps the UI state and URL state connected.

### Bookmarks

Bookmarks follow a simple browser-storage flow:

```text
User saves resource
        ↓
Bookmark state updates
        ↓
Resource ID is stored in localStorage
        ↓
Saved resources can be displayed later
```

Because the project uses localStorage, bookmarks are stored locally in the user's browser rather than on a server.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Smi-abbasi/DevLink.git
```

Move into the project directory:

```bash
cd DevLink
```

Install dependencies:

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

---

## Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

---

## Data Management

DevLink currently uses a local JavaScript data file for its resources.

Each resource contains information used by the interface, such as its:

* Name
* Description
* Category
* Tags
* Resource link

This approach keeps the project simple and removes the need for a backend or external database.

Adding another resource can be done by extending the resource dataset.

---

## Key Concepts Practiced

DevLink was developed as a hands-on Next.js project to practice concepts including:

* Next.js App Router
* React components
* Client Components
* `useState`
* `useEffect`
* URL query parameters
* `useSearchParams`
* `useRouter`
* `usePathname`
* Dynamic filtering
* Array methods such as `filter()`, `map()`, and `some()`
* Browser `localStorage`
* JSON serialization and parsing
* Conditional rendering
* Reusable components
* Responsive layouts with Tailwind CSS

The project was intentionally kept frontend-focused so that the core concepts could be understood and implemented without adding unnecessary backend complexity.

---

## Design Goals

The interface was designed around a few practical principles:

* **Simple** — resources should be easy to discover.
* **Responsive** — the interface should work across screen sizes.
* **Reusable** — UI functionality should be separated into reusable components.
* **Persistent** — bookmarks should remain available after refreshing the page.
* **Shareable** — filtered results should be represented in the URL.
* **Maintainable** — resource data should remain separate from UI logic.

---

## Current Scope

DevLink is a frontend-focused resource directory.

It does **not** currently require:

* A backend server
* A database
* User authentication
* Server-side bookmark storage
* External APIs

Resource data is maintained locally, while user bookmarks are persisted through browser localStorage.

---

## Learning Objective

This project was created as part of my practical learning journey with **Next.js**.

The main goal was not simply to create a resource directory, but to understand how a modern React/Next.js application handles:

* Application state
* Client-side interactions
* URL state
* Browser persistence
* Component-based architecture
* Data-driven rendering
* Responsive UI development

Building DevLink provided a practical way to apply these concepts together in one complete project.

---

## Future Improvements

Possible future improvements could include:

* Expanding the resource collection
* Adding more advanced filtering
* Adding resource sorting
* Introducing a backend for shared data
* User accounts and synchronized bookmarks
* Admin functionality for managing resources

These are outside the current project scope and would require additional architecture beyond the current frontend implementation.

---

## Author

**Sami Ullah Akhtar (SMI)**

Computer Science student and aspiring **Full-Stack Developer, Python Developer, and AI Automation Engineer**.

### Links

* GitHub: [Smi-abbasi](https://github.com/Smi-abbasi)
* DevLink Repository: [github.com/Smi-abbasi/DevLink](https://github.com/Smi-abbasi/DevLink)

---

## License

This project was created for learning and portfolio purposes.
