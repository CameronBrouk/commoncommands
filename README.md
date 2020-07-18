## Dependencies

- ramda
- react-testing-library
- tailwind
- react-spring
- rxjs-hooks
- rxfire
- rxjs
- typescript
- firebase
- react-router
- react-form-hooks

---

## File Structure

### There are 2 Base Components

1. **_App.tsx_**: contains context wrappers, layout components, and Router
2. **_Routes.tsx_**: The router, created using react-router

### There are 5 main folders:

1. **_Firebase_**: contains hooks and context related to querying the api
2. **_Auth_**: contains login/register components
3. **_layout_**: contains your header/sidebar/nav stuff
4. **_shared_**: contains hooks, components, and util functions commonly used throughout the application.
5. **_main_**: All code specific to this application

### File Structure Overview

#### _starting at src/app, and excluding buffer / typing / testing files._

- firebase
  - firestore
    - useFirestore
    - useFirestoreQuery
    - useDocumentFromRouteParams
  - user
    - usePermissions
    - CurrentUserContext
- auth
  - Login.tsx
  - Register.tsx
- layout
  - Header
    - _this is generally implementation specific_
  - Sidebar
    - DesktopSidebar.tsx
    - MobileSidebar.tsx
- shared
  - hooks
    - useSearch
    - useKeybind
    - useUI
  - components
    - Button
      - Button.tsx
      - NavLink.tsx
      - MenuItem.tsx
    - Popup
      - Popup.tsx
      - Modal.tsx
      - Drawer.tsx
      - Mask.tsx
      - Menu.tsx
    - Layout
      - Divider
      - Expansion Panel
      - Stepper
    - Forms
      - Input
      - Select
  - utils
    - rxjs
- main
  - components
    - _your components that compose the routes will go here_
  - pages
    - _your routes will go here_
- App.tsx
- Routes.tsx
- NavLinks.tsx

## File Structure Explanation

---

### **_src/firebase_**

This has two sub folders

1. **_firestore_** this folder has a collection of hooks that make it very easy to query firestore

   - **_useFirestore_**: exposes crud functions
   - **_useFirestoreQuery_**: exposes a function that takes an object containing query filters(limit, where, orderBy)
   - **_useDocumentFromRouteParams_**: grab document from collection whos id is equal to the id in the route params

2. **_user_**: this folder contains a content and set of hooks to be used within it.

   - **_CurrentUserContext_**: exposes the current users profile information and permissions information
   - **_usePermissions_**: exposes a set of functions that allow you to check or change the current users permission

### **\_src/auth**

---

This folder is pretty self explanatory. It contains the components that allow a user to login in and/or register. These components can be placed wherever you want. In a modal, in their own page, whatever. If you want Login or Register to be it's own page, you just need to add them to the Routes.tsx file to utilize React-router. Change the styles as you see fit.

---

### **/src/layout**

This folder contains the main layout of your application. Specifically header/footer/sidenav/main shit. Your Layout should be consistent. Each page should have a similar layout. Headings / Titles should be similar.

1. **_Header_**
   - This folder is implementation specific. You might have a search bar. You might have a navbar. who knows. Do what you want, but place components that create the Global application header in this file.
2. **_Sidebar_**

- this folder contains the mobile and desktop global sidebar impllimentation

---

### **/src/shared/**

This file contains stuff that are shared everywhere in your app.

<!-- prettier-ignore -->
  1. **_shared/components_**
    - Button: has button stuff
    - Popup: has anything that pops over your other components
    - Layout: has stuff meant to layout content dynamically like expansion panels and steppers
    - Forms: has common form fields
  2. **_/shared/hooks_**
    - useKeybind: bind a function to a keybind, scope that keybind to a component
    - useUI: exposes functions that have to do with UI, like checking whether the user is on mobile or not
    - useSearch: exposes functions that allow you to recursively search components
  3. **_/shared/utils_**
    - rxjs: common rxjs operators that, for whatever reason, don't exist
    - form-validators: functions that check common validity scenarios
    - search: functions that filter stuff by a string(i.e. searching)

---

### **_src/main_**

This is where you place all your application specific crap. Most of this will be in a 'Main' page. You should be composing your components using the components and hooks built out
