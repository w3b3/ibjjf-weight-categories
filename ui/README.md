# Published using Vercel

dev

## UI Styling Standards

- The UI uses a modern, accessible, and mobile-responsive design leveraging Bootstrap 5 components only.
- The color palette is light-themed, using Bootstrap's default backgrounds and text colors for maximum readability and accessibility.
- All backgrounds, cards, and buttons use Bootstrap's classes (e.g., `bg-light`, `bg-white`, `btn`, `card`).
- The layout is card-based, with user info and weight categories presented as Bootstrap cards for a modern, Instagram-like appearance.
- All interactive elements (buttons, dropdowns) use Bootstrap's button and form classes for compactness, clarity, and accessibility.
- Layout is fully responsive using Bootstrap's grid system.
- Avoid all custom CSS and inline styles for color or background; use only Bootstrap classes.
- When adding new UI components, follow these standards and update this section if changes are made.

## Gender & Category Support

- The UI now supports both MALE - ADULT and FEMALE - ADULT IBJJF weight categories.
- The top right dropdown allows users to switch between male and female adult categories, updating the weight cards accordingly.
- Category data and translations are structured by gender in the main script. When adding new categories or updating weights, ensure both genders are updated in all supported languages.
- The login button has been removed for simplicity.