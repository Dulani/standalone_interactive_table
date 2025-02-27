import { tableData } from "../data/tableData.js";

// Global variables for pagination
let currentPage = 1;
const rowsPerPage = 50;
let filteredData = [];
let sortColumn = null;
let sortAscending = true;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    console.log('Table data:', tableData);
    filteredData = [...tableData];
    setupControls();
    renderTable();
});

function applySearchFilter(data, searchTerm) {
    if (!searchTerm) return data;
    searchTerm = searchTerm.toLowerCase();
    return data.filter(row => 
        Object.values(row).some(value => 
            value.toString().toLowerCase().includes(searchTerm)
        )
    );
}

function applyYearFilter(data, yearStart, yearEnd) {
    return data.filter(row => row.year >= yearStart && row.year <= yearEnd);
}

function applyLawFilter(data, selectedFilters) {
    if (!selectedFilters.length) return data;
    return data.filter(row => selectedFilters.includes(row.law_class));
}

function sortData(data, column) {
    if (!column) return data;
    return [...data].sort((a, b) => {
        const aVal = a[column];
        const bVal = b[column];
        const order = sortAscending ? 1 : -1;
        return aVal < bVal ? -order : aVal > bVal ? order : 0;
    });
}

function paginate(data) {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
}

function updatePaginationControls() {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function renderTable() {
    const table = document.getElementById('dataTable');
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    
    // Clear existing content
    thead.innerHTML = '';
    tbody.innerHTML = '';
    
    if (!tableData.length) {
        console.error('No table data available');
        return;
    }
    
    // Add headers with sort functionality
    const headerRow = document.createElement('tr');
    Object.keys(tableData[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        th.style.cursor = 'pointer';
        th.onclick = () => {
            if (sortColumn === key) {
                sortAscending = !sortAscending;
            } else {
                sortColumn = key;
                sortAscending = true;
            }
            renderTable();
        };
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    
    // Apply filters and sorting
    let displayData = [...filteredData];
    const searchTerm = document.getElementById('searchInput').value;
    displayData = applySearchFilter(displayData, searchTerm);
    
    // Get year filter values
    const yearStart = parseInt(document.getElementById('minYearDisplay').textContent);
    const yearEnd = parseInt(document.getElementById('maxYearDisplay').textContent);
    displayData = applyYearFilter(displayData, yearStart, yearEnd);
    
    // Get selected law classes
    const selectedLaws = Array.from(document.querySelectorAll('#lawClassFilters input:checked'))
        .map(checkbox => checkbox.value);
    displayData = applyLawFilter(displayData, selectedLaws);
    
    // Sort data
    displayData = sortData(displayData, sortColumn);
    
    // Update filtered data
    filteredData = displayData;
    
    // Paginate
    displayData = paginate(displayData);
    
    // Render rows
    displayData.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    
    updatePaginationControls();
}

function setupControls() {
    // Set up search input
    document.getElementById('searchInput').addEventListener('input', renderTable);
    
    // Set up pagination controls
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });
    
    document.getElementById('nextPage').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredData.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });
    
    // Set up law class filters
    const lawClasses = [...new Set(tableData.map(row => row.law_class))];
    const lawClassFilters = document.getElementById('lawClassFilters');
    lawClasses.forEach(lawClass => {
        const div = document.createElement('div');
        div.className = 'checkbox-item';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = lawClass;
        input.id = `law-${lawClass}`;
        const label = document.createElement('label');
        label.htmlFor = `law-${lawClass}`;
        label.textContent = lawClass;
        div.appendChild(input);
        div.appendChild(label);
        lawClassFilters.appendChild(div);
        input.addEventListener('change', renderTable);
    });
}
