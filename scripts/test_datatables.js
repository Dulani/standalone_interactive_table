// Test script for DataTables implementation
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Function to check if the HTML file contains DataTables
function testDataTablesImplementation() {
    try {
        // Read the HTML file
        const htmlPath = path.join(__dirname, '..', 'index.html');
        const html = fs.readFileSync(htmlPath, 'utf8');
        
        // Check for DataTables resources
        const hasDataTablesCSS = html.includes('datatables.net') && 
                                html.includes('.css');
        const hasDataTablesJS = html.includes('datatables.net') && 
                               html.includes('.js');
        const hasJQuery = html.includes('jquery');
        
        // Check for DataTables initialization
        const hasDataTablesInit = html.includes('DataTable(');
        
        // Log results
        console.log('DataTables CSS:', hasDataTablesCSS ? '✓' : '✗');
        console.log('DataTables JS:', hasDataTablesJS ? '✓' : '✗');
        console.log('jQuery:', hasJQuery ? '✓' : '✗');
        console.log('DataTables Initialization:', hasDataTablesInit ? '✓' : '✗');
        
        // Overall result
        const implementationComplete = hasDataTablesCSS && hasDataTablesJS && 
                                      hasJQuery && hasDataTablesInit;
        console.log('\nDataTables Implementation:', implementationComplete ? 'COMPLETE ✓' : 'INCOMPLETE ✗');
        
        return implementationComplete;
    } catch (error) {
        console.error('Error testing DataTables implementation:', error);
        return false;
    }
}

// Run the test
testDataTablesImplementation();
