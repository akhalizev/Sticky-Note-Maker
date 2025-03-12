// Define an interface for RGB color values used in sticky note fills
interface Color {
  r: number; // Red value (0-1)
  g: number; // Green value (0-1)
  b: number; // Blue value (0-1)
}

// Map of color categories to their RGB values for sticky note backgrounds
const colors: { [key: string]: Color } = {
  "need-attention": { r: 1, g: 0.9, b: 0.4 }, // Yellow for urgent tasks
  "fresh-idea": { r: 1, g: 0.7, b: 0.8 },     // Pink for new ideas
  "note": { r: 0.5, g: 0.7, b: 1 },           // Blue for general notes
  "approved": { r: 0.6, g: 0.9, b: 0.6 },     // Green for approved items
  "need-fix": { r: 1, g: 0.2, b: 0.2 }        // Red for items needing correction
};

// Async function to create a sticky note with a given color and text
async function createStickyNote(color: Color, noteText: string): Promise<void> {
  // Load the "Inter Regular" font asynchronously before using it
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  // Create a frame to act as the sticky note container
  const stickyFrame: FrameNode = figma.createFrame();
  stickyFrame.resize(200, 200); // Set initial size to 200x200px
  stickyFrame.fills = [{ type: "SOLID", color }]; // Apply the selected color as a solid fill
  stickyFrame.name = "Sticky Note"; // Name for easy identification in Figma layers

  // Configure auto-layout to stack contents vertically
  stickyFrame.layoutMode = "VERTICAL"; // Stack text nodes top-to-bottom
  stickyFrame.paddingLeft = 10; // Inner padding on all sides
  stickyFrame.paddingRight = 10;
  stickyFrame.paddingTop = 10;
  stickyFrame.paddingBottom = 10;
  stickyFrame.itemSpacing = 8; // Space between main text and username/date
  stickyFrame.primaryAxisSizingMode = "AUTO"; // Height adjusts to content
  stickyFrame.counterAxisSizingMode = "FIXED"; // Width stays at 200px

  // Create the main note text
  const text: TextNode = figma.createText();
  text.fontName = { family: "Inter", style: "Regular" }; // Use the loaded font
  text.characters = noteText || "Type your note here..."; // User input or default text
  text.fontSize = 14; // Consistent font size with UI
  text.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]; // Black text
  text.name = "Sticky Text"; // Name for layer panel
  text.layoutGrow = 0; // Don’t stretch vertically
  text.layoutAlign = "STRETCH"; // Stretch horizontally within padding
  text.textAutoResize = "HEIGHT"; // Height adjusts to text content

  // Get current date and time for the username footer
  const now = new Date();
  const dateString = now.toLocaleString("en-US", {
    month: "short", // e.g., "Feb"
    day: "numeric", // e.g., "20"
    year: "numeric", // e.g., "2025"
    hour: "numeric", // e.g., "3"
    minute: "2-digit", // e.g., "45"
    hour12: true // AM/PM format
  }); // Formats as "Feb 20, 2025, 3:45 PM"

  // Create the username and date text
  const usernameText: TextNode = figma.createText();
  usernameText.fontName = { family: "Inter", style: "Regular" }; // Same font
  usernameText.characters = `— ${figma.currentUser?.name || "Anonymous"} @ ${dateString}`; // e.g., "— Jane Doe @ Feb 20, 2025, 3:45 PM"
  usernameText.fontSize = 14; // Matching main text size
  usernameText.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }]; // Gray for contrast
  usernameText.name = "Sticky Username"; // Layer name
  usernameText.layoutAlign = "STRETCH"; // Stretch horizontally
  usernameText.textAutoResize = "HEIGHT"; // Height adjusts to content
  usernameText.layoutPositioning = "AUTO"; // Follows auto-layout rules

  // Add both text nodes to the frame
  stickyFrame.appendChild(text); // Main note text first
  stickyFrame.appendChild(usernameText); // Username/date below

  // Center the sticky note in the current viewport
  const viewport: { x: number; y: number } = figma.viewport.center;
  stickyFrame.x = viewport.x - 100; // Offset by half the width
  stickyFrame.y = viewport.y - 100; // Offset by half the height

  // Add the frame to the current page and focus it
  figma.currentPage.appendChild(stickyFrame);
  figma.currentPage.selection = [stickyFrame]; // Select the sticky note
  figma.viewport.scrollAndZoomIntoView([stickyFrame]); // Zoom to it
}

// Display the UI with a fixed size (300x300px as per your final choice)
figma.showUI(__html__, { width: 300, height: 300 });

// Handle messages from the UI
figma.ui.onmessage = (msg) => {
  if (msg.type === "create-sticky") { // Check for the create command
    const selectedColor: Color = colors[msg.color]; // Get the color from the map
    const noteText: string = msg.text; // Get the user-entered text
    if (selectedColor) { // Ensure a valid color was selected
      createStickyNote(selectedColor, noteText) // Create the sticky note
        .then(() => figma.closePlugin()) // Close plugin on success
        .catch((err) => figma.closePlugin(`Error: ${err.message}`)); // Close with error message if it fails
    } else {
      figma.closePlugin("Invalid color selected"); // Close with error if color is invalid
    }
  }
};