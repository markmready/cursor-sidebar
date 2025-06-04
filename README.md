# Sidebar Navigation Component

A modern, accessible sidebar navigation component with advanced keyboard navigation and search functionality. Built with vanilla JavaScript, HTML, and CSS.

## Demo

View the live demo: [Sidebar Navigation Demo](https://markmready.github.io/cursor-sidebar/)

## Features

- 🎯 **Hierarchical Navigation**: Multi-level navigation structure with expandable categories
- ⌨️ **Keyboard Navigation**: Full keyboard support with arrow keys and focus management
- 🔍 **Search Functionality**: Real-time filtering of navigation items
- 📱 **Responsive Design**: Collapsible sidebar with smooth transitions
- ♿ **Accessibility**: ARIA attributes and semantic HTML for screen reader support
- 🎨 **Modern UI**: Clean design with hover states and visual feedback
- 🖼️ **Icon Support**: Both default and filled state icons for interactive elements

## Installation

1. Clone the repository:
```bash
git clone https://github.com/markmready/cursor-sidebar.git
```

2. Navigate to the project directory:
```bash
cd cursor-sidebar
```

3. Open `index.html` in your web browser to view the component.

## Usage

### Basic Structure

The sidebar follows a hierarchical structure:
- Level 1: Main categories (Home, Rosters, Timesheets, etc.)
- Level 2: Sub-categories and links
- Level 3: Nested sub-categories and links

### Keyboard Navigation

- `↑` / `↓`: Navigate between items
- `→`: Expand category (when focused on category header)
- `←`: Collapse category (when focused on category header)
- `Enter` / `Space`: Activate links or toggle categories
- `Tab`: Navigate through interactive elements

### Search Filter

The search functionality at the top of the sidebar allows users to:
- Filter navigation items in real-time
- Quickly find specific pages or categories
- Clear search with the escape key

## File Structure

- `index.html` - Main HTML structure and content
- `styles.css` - All styling and animations
- `script.js` - JavaScript functionality and event handlers
- `Icons/` - SVG icons for navigation items

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License. 