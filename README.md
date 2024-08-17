# Dynamic Dashboard Project

This project is a dynamic, interactive dashboard built with React, providing a customizable and user-friendly interface for data visualization and management. The application allows users to add, search, and manage widgets within different categories.

## Features

Features

- **Dynamic Widget Management**: Add, remove, and filter widgets within different categories.
- **Search Functionality**: Search for widgets by title or text.
- **Modal for Widget Addition**: A modal interface allows users to add new widgets and manage existing ones.
- **Responsive UI**: Built with Tailwind CSS for responsive design.
- **Navbar Integration**: Includes a Navbar with breadcrumb navigation and a search bar.

## Components

1. **App**
   The main component that handles the application's state and renders the Dashboard, AddWidgetModal, and Navbar components.

2. **Dashboard**
   The core component of the application that displays widgets based on categories. It includes a search feature, dropdowns for time filtering, and buttons to add widgets.

3. **Navbar**
   A simple navigation bar that includes breadcrumb navigation, a search bar, and an icon for notifications.

4. **AddWidgetModal**
   A modal component that allows users to add new widgets to a category. It also allows users to manage existing widgets by checking or unchecking them.

5. **useStore**
   A Zustand store for managing the application's state, including categories and widgets.

## Getting Started

-**Prerequisites**

Node.js (v14 or higher)
npm or Yarn

## Installation

1. **Clone the Repository**:

```bash
   git clone https://github.com/yourusername/dynamic-dashboard.git
   cd dynamic-dashboard

```

## Install Dependencies

### For the Frontend:

```bash
cd ../dynamic-dashboard
npm install
```

### Run the Frontend Server:

```bash
cd ../dynamic-dashboard
npm run dev
```

### Open the Application:

Open your browser and visit http://localhost:5173 to view the application.

## Acknowledgements

-**React Icons**: For the icons used in the Navbar and Dashboard. -**Zustand**: For state management. -**Tailwind CSS**: For styling the application.
