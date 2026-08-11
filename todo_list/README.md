# Todo List

A beginner-friendly Todo List application built with React, JavaScript, and Vite.

## Features

- Add new todos with the Add button or the Enter key
- Prevent empty todos and trim extra spaces
- Display todos with checkboxes and delete buttons
- Mark todos as completed with a line-through style
- Edit todos with Save and Cancel controls
- Filter todos by All, Active, and Completed
- Show total, active, and completed todo counts
- Clear all completed todos
- Save todos and the selected filter in browser localStorage
- Show a friendly empty state when no todos match the current filter
- Responsive layout for desktop and mobile screens

## React Concepts Used

- Functional components
- `useState`
- `useEffect`
- Props
- Event handlers
- `map()`
- `filter()`
- Conditional rendering
- `localStorage`

## Folder Structure

```text
src/
├── components/
│   ├── TodoForm.jsx
│   ├── TodoItem.jsx
│   ├── TodoList.jsx
│   ├── TodoFilter.jsx
│   └── TodoStats.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Install Dependencies

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Build

```bash
npm run build
```
