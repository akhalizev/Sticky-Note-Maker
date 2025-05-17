"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Map of color categories to their RGB values
const colors = {
    "need-attention": { r: 1, g: 0.9, b: 0.4 }, // Yellow for urgent tasks
    "fresh-idea": { r: 1, g: 0.7, b: 0.8 }, // Pink for new ideas
    "note": { r: 0.5, g: 0.7, b: 1 }, // Blue for general notes
    "approved": { r: 0.6, g: 0.9, b: 0.6 }, // Green for approved items
    "need-fix": { r: 1, g: 0.2, b: 0.2 } // Red for items needing correction
};
// Helper function to calculate absolute canvas coordinates of a node
function getAbsolutePosition(node) {
    let x = node.x;
    let y = node.y;
    let currentNode = node.parent; // Use BaseNode to include all node types
    // Walk up the parent chain, adding x and y offsets where they exist
    while (currentNode) {
        // Check if the node has x and y properties (not all BaseNodes do, e.g., DocumentNode)
        if ('x' in currentNode && 'y' in currentNode) {
            x += currentNode.x;
            y += currentNode.y;
        }
        currentNode = currentNode.parent;
    }
    return { x, y };
}
// Function to create and position a sticky note
function createStickyNote(color, noteText) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // Load the font asynchronously
        yield figma.loadFontAsync({ family: "Inter", style: "Regular" });
        // Create the sticky note frame
        const stickyFrame = figma.createFrame();
        stickyFrame.resize(200, 200); // Initial size (height will adjust)
        stickyFrame.fills = [{ type: "SOLID", color }]; // Apply selected color
        stickyFrame.name = "Sticky Note";
        // Set up auto-layout for vertical stacking
        stickyFrame.layoutMode = "VERTICAL";
        stickyFrame.paddingLeft = 10;
        stickyFrame.paddingRight = 10;
        stickyFrame.paddingTop = 10;
        stickyFrame.paddingBottom = 10;
        stickyFrame.itemSpacing = 8;
        stickyFrame.primaryAxisSizingMode = "AUTO"; // Height adjusts to content
        stickyFrame.counterAxisSizingMode = "FIXED"; // Fixed 200px width
        // Create the main note text
        const text = figma.createText();
        text.fontName = { family: "Inter", style: "Regular" };
        text.characters = noteText || "Type your note here...";
        text.fontSize = 14;
        text.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]; // Black text
        text.name = "Sticky Text";
        text.layoutGrow = 0;
        text.layoutAlign = "STRETCH";
        text.textAutoResize = "HEIGHT";
        // Create the username and date text
        const now = new Date();
        const dateString = now.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }); // e.g., "Feb 20, 2025, 3:45 PM"
        const usernameText = figma.createText();
        usernameText.fontName = { family: "Inter", style: "Regular" };
        usernameText.characters = `— ${((_a = figma.currentUser) === null || _a === void 0 ? void 0 : _a.name) || "Anonymous"} @ ${dateString}`;
        usernameText.fontSize = 14;
        usernameText.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }]; // Gray text
        usernameText.name = "Sticky Username";
        usernameText.layoutAlign = "STRETCH";
        usernameText.textAutoResize = "HEIGHT";
        usernameText.layoutPositioning = "AUTO";
        // Add text nodes to the frame
        stickyFrame.appendChild(text);
        stickyFrame.appendChild(usernameText);
        // Positioning logic: Check if a frame is selected
        const selectedNodes = figma.currentPage.selection; // Get current selection
        const selectedFrame = selectedNodes.find(node => node.type === "FRAME");
        if (selectedFrame) {
            // Get absolute canvas coordinates of the selected frame
            const absolutePos = getAbsolutePosition(selectedFrame);
            const frameRightEdge = absolutePos.x + selectedFrame.width;
            const frameTopEdge = absolutePos.y;
            // Position sticky note just outside the frame’s top-right corner
            stickyFrame.x = frameRightEdge + 10; // 10px offset to the right
            stickyFrame.y = frameTopEdge; // Align with top edge
            // Debug: Log coordinates to verify
            console.log(`Selected Frame - Relative: x=${selectedFrame.x}, y=${selectedFrame.y}, width=${selectedFrame.width}, height=${selectedFrame.height}`);
            console.log(`Selected Frame - Absolute: x=${absolutePos.x}, y=${absolutePos.y}`);
            console.log(`Sticky Note: x=${stickyFrame.x}, y=${stickyFrame.y}`);
        }
        else {
            // Fallback: Center in viewport if no frame is selected
            const viewport = figma.viewport.center;
            stickyFrame.x = viewport.x - 100; // Center horizontally
            stickyFrame.y = viewport.y - 100; // Center vertically
            console.log(`Viewport Center: x=${viewport.x}, y=${viewport.y}, Sticky: x=${stickyFrame.x}, y=${stickyFrame.y}`);
        }
        // Add the sticky note to the canvas, select it, and zoom
        figma.currentPage.appendChild(stickyFrame);
        figma.currentPage.selection = [stickyFrame];
        figma.viewport.scrollAndZoomIntoView([stickyFrame]);
    });
}
// Show the UI when the plugin runs or via menu command
if (figma.command === "create") {
    figma.showUI(__html__, { width: 300, height: 252 });
}
// Handle messages from the UI
figma.ui.onmessage = (msg) => {
    if (msg.type === "create-sticky") {
        const selectedColor = colors[msg.color];
        const noteText = msg.text;
        if (selectedColor) {
            createStickyNote(selectedColor, noteText)
                .then(() => figma.closePlugin()) // Close UI on success
                .catch((err) => figma.closePlugin(`Error: ${err.message}`));
        }
        else {
            figma.closePlugin("Invalid color selected");
        }
    }
};
