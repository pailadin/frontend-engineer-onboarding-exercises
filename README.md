## Directory Structure
The top level directory structure will be as follows:

* assets - global static assets such as images, svgs, company logo, etc.
* components - global shared/reusable components, such as layout (wrappers, navigation), form components, buttons
* modules - JavaScript modules (all components under specific page should go here, e.g. **modules/dashboard/component.tsx** will contain components rendered in **pages/dashboard.tsx**)
* store - Global Redux store
* utils - Utilities & helper functions and the like
* pages - NextJS page files

### [Structure reference](https://www.taniarascia.com/react-architecture-directory-structure)