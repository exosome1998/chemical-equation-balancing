# Animation Flow Design for Chemical Equation Balancer

This document outlines the design for an interactive HTML animation that teaches users how to balance chemical equations step-by-step. The target audience is Year 10-11 science students in NSW. The application focuses on equations without polyatomic ions to simplify balancing for beginners.

## 1. Core Features

*   **Equation Selection:** Users can choose from a predefined list of 30 chemical equations without polyatomic ions.
*   **Interactive Balancing:** Users can input coefficients to balance the selected equation.
*   **Real-time Feedback:** Atom counts for each element on both reactant and product sides will update dynamically as coefficients are changed.
*   **Balancing Verification:** The application will indicate whether the current set of coefficients results in a balanced equation.
*   **Step-by-Step Guidance (Conceptual):** The animation will visually demonstrate the impact of changing coefficients on atom counts, inherently guiding the user through the balancing process.

## 2. User Interface (UI) and User Experience (UX)

### 2.1. Main Layout

The interface will be divided into a few key sections:

*   **Equation Selection Area:**
    *   A dropdown menu (`<select>`) will list the 30 available chemical equations.
    *   Upon selection, the chosen equation will be displayed in the balancing area.
*   **Balancing Area:**
    *   The selected chemical equation will be displayed with input fields (e.g., `<input type="number">` with min="1") before each reactant and product.
    *   Reactants and products will be clearly separated by an arrow (→).
    *   Example: `_ H2 + _ O2 → _ H2O` (where `_` represents an input field).
*   **Atom Count Display Area:**
    *   This section will show a table of all elements present in the equation.
    *   For each element, it will display the current count on the reactant side and the product side.
    *   Counts will update in real-time as the user modifies coefficients.
    *   A visual indicator (e.g., color change: red for unbalanced, green for balanced) will show the balance status for each element.
*   **Status/Feedback Area:**
    *   A message area will display feedback, such as "Equation is balanced!" or "Keep trying! Check the counts for [element]."
*   **Controls Area:**
    *   "Reset Equation" button: Resets coefficients for the current equation to their default (usually 1 or blank).

### 2.2. Interaction Flow

1.  **Start:** The user is presented with the equation selection dropdown.
2.  **Select Equation:** The user selects an equation from the dropdown.
3.  **Display Equation:** The selected equation appears in the balancing area with default coefficients (e.g., 1 or blank placeholders).
4.  **Initial Atom Counts:** The atom count display is populated based on the initial (unbalanced) equation.
5.  **User Input:**
    *   The user types or adjusts numbers in the coefficient input fields.
    *   With each change:
        *   The atom counts for all affected elements are immediately recalculated and updated in the atom count display.
        *   The balance status for each element is updated (e.g., color indicators).
        *   The overall status message is updated (e.g., "Equation Balanced!" or indicating which elements are still unbalanced).
6.  **Balancing Achieved:** When all elements are balanced (reactant count = product count for all elements):
    *   A prominent success message is displayed.
    *   The equation might be highlighted or styled to indicate completion.
7.  **Reset:** If the user clicks "Reset Equation", all coefficients for the current equation are cleared/reset to 1, and atom counts are updated accordingly.
8.  **Change Equation:** The user can select a different equation from the dropdown at any time. The balancing area and atom counts will update to reflect the new equation.

## 3. Step-by-Step Animation Aspect

The "step-by-step" animation will be achieved through:

*   **Immediate Visual Feedback:** The dynamic update of atom counts as coefficients are changed provides a direct visual consequence for each action the user takes. This helps them understand the cause-and-effect relationship in balancing.
*   **Focus on Individual Elements:** The atom count display, with its per-element balance status, encourages users to focus on balancing one element at a time, which is a key strategy.
*   **Iterative Process:** The interface supports the iterative nature of balancing. Users can try different coefficients and immediately see the results, allowing them to learn through trial and error in a guided environment.

## 4. Technical Implementation Details (HTML, CSS, JavaScript)

*   **HTML:** Structure the page with semantic elements (header, main, section, footer, form, input, select, button, table).
*   **CSS:** Style the application for clarity, readability, and a user-friendly appearance. Responsive design to ensure usability on different screen sizes.
*   **JavaScript:** This will be the core of the interactivity.
    *   **Equation Data:** Store the 30 equations as an array of objects, each containing the unbalanced equation string and a descriptive name.
    *   **Event Listeners:** Attach event listeners to the equation selector, coefficient input fields, and control buttons.
    *   **Parsing Equations:** A function to parse the chemical equation string to identify reactants, products, and elements within each molecule (including subscripts).
    *   **Calculating Atom Counts:** A function that takes the current coefficients and the parsed equation to calculate the total count of each atom on both sides.
    *   **Updating the DOM:** Functions to dynamically update the displayed equation, atom counts, and status messages in the HTML.
    *   **Validation Logic:** Logic to check if the equation is balanced.

## 5. Equations List

The 30 equations are designed to increase in difficulty and avoid polyatomic ions. See `chemical_equations.txt` for the full list.

## 6. Future Enhancements (Optional)

*   **Detailed Hints:** Provide specific hints based on common balancing strategies (e.g., "Try balancing oxygen last in combustion reactions.").
*   **Scoring/Progress Tracking:** If part of a larger learning module.
*   **Visual Representation of Atoms:** Show simple visual representations of atoms (e.g., colored circles) to enhance understanding, though this adds complexity.

This design provides a solid foundation for creating an effective and engaging interactive tool for learning how to balance chemical equations without polyatomic ions.