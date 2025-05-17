# Sticky Note Maker

This Figma plugin allows you to quickly create and place colored sticky notes on your canvas. It's perfect for adding feedback, jotting down ideas, or making annotations directly within your Figma designs.

## Features

* **Create Customizable Sticky Notes:** Add text to your sticky notes.
* **Color-Coded Categories:** Choose from several predefined colors to categorize your notes:
  * 🟡 **Need Attention:** For urgent tasks or items requiring review.
  * 🩷 **Fresh Idea:** For new concepts and brainstorming.
  * 🔵 **Note:** For general information and annotations.
  * 🟢 **Approved:** To mark items that have been approved.
  * 🔴 **Need Fix:** For elements that require correction or changes.
* **Automatic Metadata:** Each sticky note automatically includes:
  * The name of the user who created it (or "Anonymous").
  * The date and time of creation.
* **Smart Positioning:**
  * If a frame is selected, the sticky note will be placed just outside its top-right corner.
  * If no frame is selected, the sticky note will be centered in the current viewport.
* **Simple UI:** Easy-to-use interface to input text and select colors.

## How to Use

1. **Run the Plugin:**
   * In Figma, go to `Plugins` -> `Sticky Note Maker` (or the name you've given it) -> `Create Sticky Note`.
   * Alternatively, you can run it via the command palette by searching for the "create" command associated with this plugin.
2. **Enter Details:**
   * A small UI window (300x252 pixels) will appear.
   * Type your desired note text into the input field.
   * Select a color category that best suits your note.
3. **Create Note:**
   * Click the "Create" button (or equivalent in the UI).
4. The plugin will then create the sticky note, place it on the canvas according to the positioning logic, select it, and zoom into view. The plugin UI will close automatically.

## Version

* v1.0.0

---

This is Version 1 of the plugin.


