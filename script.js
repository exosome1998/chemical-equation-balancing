document.addEventListener('DOMContentLoaded', () => {
    const equationSelect = document.getElementById('equation-select');
    const equationDisplay = document.getElementById('equation-display');
    const atomCountsTableBody = document.getElementById('atom-counts-table').getElementsByTagName('tbody')[0];
    const statusMessage = document.getElementById('status-message');
    const resetButton = document.getElementById('reset-button');

    // Equations without polyatomic ions, increasing in difficulty
    const equations = [
        { id: 0, string: "H2 + O2 → H2O", name: "Water Formation" },
        { id: 1, string: "Mg + O2 → MgO", name: "Magnesium Oxide Formation" },
        { id: 2, string: "Fe + S → FeS", name: "Iron Sulfide Formation" },
        { id: 3, string: "Al + O2 → Al2O3", name: "Aluminum Oxide Formation" },
        { id: 4, string: "Zn + Cl2 → ZnCl2", name: "Zinc Chloride Formation" },
        { id: 5, string: "Na + Cl2 → NaCl", name: "Sodium Chloride Formation" },
        { id: 6, string: "C + O2 → CO2", name: "Carbon Dioxide Formation" },
        { id: 7, string: "P4 + O2 → P4O10", name: "Phosphorus Pentoxide Formation" },
        { id: 8, string: "Cu + S → Cu2S", name: "Copper(I) Sulfide Formation" },
        { id: 9, string: "K + Br2 → KBr", name: "Potassium Bromide Formation" },
        { id: 10, string: "CH4 + O2 → CO2 + H2O", name: "Methane Combustion" },
        { id: 11, string: "C2H6 + O2 → CO2 + H2O", name: "Ethane Combustion" },
        { id: 12, string: "Fe + O2 → Fe2O3", name: "Iron Oxide Formation" },
        { id: 13, string: "N2 + H2 → NH3", name: "Ammonia Synthesis" },
        { id: 14, string: "Si + O2 → SiO2", name: "Silicon Dioxide Formation" },
        { id: 15, string: "Al + CuCl2 → AlCl3 + Cu", name: "Aluminum + Copper Chloride" },
        { id: 16, string: "Mg + N2 → Mg3N2", name: "Magnesium Nitride Formation" },
        { id: 17, string: "C3H8 + O2 → CO2 + H2O", name: "Propane Combustion" },
        { id: 18, string: "S8 + O2 → SO2", name: "Sulfur Dioxide Formation" },
        { id: 19, string: "Pb + O2 → PbO", name: "Lead(II) Oxide Formation" },
        { id: 20, string: "C4H10 + O2 → CO2 + H2O", name: "Butane Combustion" },
        { id: 21, string: "C5H12 + O2 → CO2 + H2O", name: "Pentane Combustion" },
        { id: 22, string: "FeS2 + O2 → Fe2O3 + SO2", name: "Pyrite Oxidation" },
        { id: 23, string: "Al + Fe2O3 → Al2O3 + Fe", name: "Thermite Reaction" },
        { id: 24, string: "C6H14 + O2 → CO2 + H2O", name: "Hexane Combustion" },
        { id: 25, string: "P4 + Cl2 → PCl5", name: "Phosphorus Pentachloride Formation" },
        { id: 26, string: "As + O2 → As2O5", name: "Arsenic Pentoxide Formation" },
        { id: 27, string: "C7H16 + O2 → CO2 + H2O", name: "Heptane Combustion" },
        { id: 28, string: "Sb + Cl2 → SbCl3", name: "Antimony Trichloride Formation" },
        { id: 29, string: "C8H18 + O2 → CO2 + H2O", name: "Octane Combustion" }
    ];

    let currentEquation = null;
    let coefficients = {};

    function populateEquationSelector() {
        equations.forEach(eq => {
            const option = document.createElement('option');
            option.value = eq.id;
            option.textContent = eq.name + " (" + eq.string + ")";
            equationSelect.appendChild(option);
        });
        equationSelect.value = ''; // Prompt to select
    }

    function parseMolecule(moleculeStr) {
        const atoms = {};
        const regex = /([A-Z][a-z]*)(\d*)/g;
        let match;
        while ((match = regex.exec(moleculeStr)) !== null) {
            const element = match[1];
            const count = match[2] ? parseInt(match[2]) : 1;
            atoms[element] = (atoms[element] || 0) + count;
        }
        return atoms;
    }

    function formatMoleculeFormula(moleculeStr) {
        // Convert numbers to subscripts (e.g., H2O → H<sub>2</sub>O)
        return moleculeStr.replace(/(\d+)/g, '<sub>$1</sub>');
    }

    function displayEquation(equationId) {
        currentEquation = equations.find(eq => eq.id == equationId);
        if (!currentEquation) return;

        equationDisplay.innerHTML = '';
        coefficients = {};
        const parts = currentEquation.string.split('→');
        const reactantsStr = parts[0].trim();
        const productsStr = parts[1].trim();

        let moleculeIndex = 0;

        function addMoleculesToDisplay(moleculesStr, type) {
            const molecules = moleculesStr.split('+').map(m => m.trim());
            molecules.forEach((mol, index) => {
                const coefficientInput = document.createElement('input');
                coefficientInput.type = 'number';
                coefficientInput.min = '1';
                coefficientInput.value = '1';
                coefficientInput.dataset.moleculeIndex = moleculeIndex;
                coefficientInput.dataset.moleculeType = type; // 'reactant' or 'product'
                coefficientInput.dataset.moleculeFormula = mol;
                coefficientInput.addEventListener('input', handleCoefficientChange);
                coefficients[moleculeIndex] = 1;

                const moleculeSpan = document.createElement('span');
                moleculeSpan.innerHTML = formatMoleculeFormula(mol);
                moleculeSpan.classList.add('molecule-formula');

                const moleculeContainer = document.createElement('div');
                moleculeContainer.classList.add('molecule');
                moleculeContainer.appendChild(coefficientInput);
                moleculeContainer.appendChild(moleculeSpan);

                equationDisplay.appendChild(moleculeContainer);
                moleculeIndex++;

                if (index < molecules.length - 1) {
                    const plusSpan = document.createElement('span');
                    plusSpan.textContent = '+';
                    plusSpan.classList.add('plus-sign');
                    equationDisplay.appendChild(plusSpan);
                }
            });
        }

        addMoleculesToDisplay(reactantsStr, 'reactant');

        const arrowSpan = document.createElement('span');
        arrowSpan.textContent = '→';
        arrowSpan.classList.add('arrow-sign');
        equationDisplay.appendChild(arrowSpan);

        addMoleculesToDisplay(productsStr, 'product');
        updateAtomCounts();
    }

    function handleCoefficientChange(event) {
        const index = event.target.dataset.moleculeIndex;
        const value = parseInt(event.target.value);
        if (isNaN(value) || value < 1) {
            coefficients[index] = 1;
            event.target.value = '1';
        } else {
            coefficients[index] = value;
        }
        updateAtomCounts();
    }

    function updateAtomCounts() {
        if (!currentEquation) return;

        const reactantCounts = {};
        const productCounts = {};
        const allElements = new Set();

        document.querySelectorAll('#equation-display input[type="number"]').forEach(input => {
            const molIndex = input.dataset.moleculeIndex;
            const type = input.dataset.moleculeType;
            const formula = input.dataset.moleculeFormula;
            const coefficient = coefficients[molIndex] || 1;
            const atomsInMolecule = parseMolecule(formula);

            for (const element in atomsInMolecule) {
                allElements.add(element);
                const count = atomsInMolecule[element] * coefficient;
                if (type === 'reactant') {
                    reactantCounts[element] = (reactantCounts[element] || 0) + count;
                } else {
                    productCounts[element] = (productCounts[element] || 0) + count;
                }
            }
        });

        atomCountsTableBody.innerHTML = '';
        let allBalanced = true;

        Array.from(allElements).sort().forEach(element => {
            const rCount = reactantCounts[element] || 0;
            const pCount = productCounts[element] || 0;
            const isBalanced = rCount === pCount;
            if (!isBalanced) allBalanced = false;

            const row = atomCountsTableBody.insertRow();
            row.insertCell().textContent = element;
            row.insertCell().textContent = rCount;
            row.insertCell().textContent = pCount;
            const balancedCell = row.insertCell();
            balancedCell.textContent = isBalanced ? 'Yes' : 'No';
            balancedCell.className = isBalanced ? 'balanced-true' : 'balanced-false';
        });

        if (allElements.size === 0) {
            statusMessage.textContent = 'Select an equation to begin or check the equation format.';
            statusMessage.className = 'status-neutral';
            return;
        }

        if (allBalanced) {
            statusMessage.textContent = 'Equation is BALANCED!';
            statusMessage.className = 'status-balanced';
        } else {
            statusMessage.textContent = 'Equation is NOT balanced. Keep trying!';
            statusMessage.className = 'status-unbalanced';
        }
    }

    equationSelect.addEventListener('change', (event) => {
        if (event.target.value === "") {
            equationDisplay.innerHTML = '';
            atomCountsTableBody.innerHTML = '';
            statusMessage.textContent = 'Select an equation to begin.';
            statusMessage.className = 'status-neutral';
            currentEquation = null;
        } else {
            displayEquation(event.target.value);
        }
    });

    resetButton.addEventListener('click', () => {
        if (currentEquation) {
            displayEquation(currentEquation.id);
        }
    });

    // Initial setup
    populateEquationSelector();
    updateAtomCounts();
});