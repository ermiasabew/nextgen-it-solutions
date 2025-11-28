// Simple test script to verify server functionality
const http = require('http');

console.log('🧪 Testing NextGen IT Solutions Server...\n');

// Test if server is running
function testServer() {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        if (res.statusCode === 200) {
            console.log('✅ Server is running on http://localhost:3000');
            console.log('✅ Status Code:', res.statusCode);
            testAPI();
        } else {
            console.log('⚠️  Server responded with status:', res.statusCode);
        }
    });

    req.on('error', (error) => {
        console.log('❌ Server is not running!');
        console.log('💡 Start the server with: npm start');
        console.log('   Or double-click: start-server.bat\n');
    });

    req.end();
}

// Test API endpoint
function testAPI() {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/content',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        if (res.statusCode === 200) {
            console.log('✅ API is working');
            console.log('✅ API Status:', res.statusCode);
            showResults();
        } else {
            console.log('⚠️  API responded with status:', res.statusCode);
        }
    });

    req.on('error', (error) => {
        console.log('❌ API test failed');
    });

    req.end();
}

function showResults() {
    console.log('\n' + '='.repeat(50));
    console.log('🎉 All Tests Passed!');
    console.log('='.repeat(50));
    console.log('\n📍 Access Points:');
    console.log('   Main Website: http://localhost:3000');
    console.log('   Admin Panel:  http://localhost:3000/admin');
    console.log('\n🔐 Default Login:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('\n✨ Server is ready to use!\n');
}

// Run tests
testServer();
