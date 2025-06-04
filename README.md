# macOS Sonoma Desktop Simulator

This project provides a simple, pure HTML/CSS/JavaScript simulation of the macOS Sonoma desktop interface.

## Features
- Desktop with draggable icons and a gradient wallpaper (`assets/wallpaper.svg`).
- Menu bar with Apple menu, status icons and clock.
- Dock with magnification effect when hovering icons.
- Basic windows with draggable title bars and close/minimize/maximize buttons.
- Spotlight, Control Center and Notification Center overlays with blur and basic animations.
- Sample application windows launched from the dock.

Everything is implemented without any JavaScript frameworks. Only standard web technologies are used.

## Running
Simply open `index.html` in Chrome or Safari. No build step is required.

## Usage
- Click the  icon to open the Apple menu. Choose **About This Mac** to show system information.
- Use the Dock icons to open simple demo windows.
- Click the Spotlight icon to open a search field.
- Click the Control Center icon to toggle quick controls.
- Click the clock to open the Notification Center.
- Drag desktop icons to rearrange them.

## Assets
All visual elements are represented with emoji or CSS for simplicity. The default wallpaper lives in `assets/wallpaper.svg`. Feel free to replace it or add your own images inside the `assets/` directory and update the HTML/CSS accordingly.

## License
This project is provided for educational purposes only and is not affiliated with Apple Inc.
