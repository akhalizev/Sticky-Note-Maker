# My First Figma Plugin - Sticky Notes

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
   * In Figma, go to `Plugins` -> `My First Plugin` (or the name you've given it) -> `Create Sticky Note`.
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

Below are the steps to get your plugin running. You can also find instructions at:

  https://www.figma.com/plugin-docs/plugin-quickstart-guide/

This plugin template uses Typescript and NPM, two standard tools in creating JavaScript applications.

First, download Node.js which comes with NPM. This will allow you to install TypeScript and other
libraries. You can find the download link here:

  https://nodejs.org/en/download/

Next, install TypeScript using the command:

  npm install -g typescript

Finally, in the directory of your plugin, get the latest type definitions for the plugin API by running:

  npm install --save-dev @figma/plugin-typings

If you are familiar with JavaScript, TypeScript will look very familiar. In fact, valid JavaScript code
is already valid Typescript code.

TypeScript adds type annotations to variables. This allows code editors such as Visual Studio Code
to provide information about the Figma API while you are writing code, as well as help catch bugs
you previously didn't notice.

For more information, visit https://www.typescriptlang.org/

Using TypeScript requires a compiler to convert TypeScript (code.ts) into JavaScript (code.js)
for the browser to run.

We recommend writing TypeScript code using Visual Studio code:

1. Download Visual Studio Code if you haven't already: https://code.visualstudio.com/.
2. Open this directory in Visual Studio Code.
3. Compile TypeScript to JavaScript: Run the "Terminal > Run Build Task..." menu item,
    then select "npm: watch". You will have to do this again every time
    you reopen Visual Studio Code.

That's it! Visual Studio Code will regenerate the JavaScript file every time you save.
