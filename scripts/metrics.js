import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("📊 Project Metrics");
console.log("==================");

try {
    let testFileCount = 0;

    // Tests
    console.log("\n🧪 Tests:");
    try {
        const testOutput = execSync('npm run test -- --run', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
        const lines = testOutput.split('\n').filter(line => line.trim() !== '');
        console.log(lines.slice(-5).join('\n'));

        // Extract file count
        // Format: " Test Files  25 passed (25)"
        const testFilesLine = lines.find(l => l.includes('Test Files'));
        if (testFilesLine) {
            const match = testFilesLine.match(/Test Files\s+(\d+)/);
            if (match) testFileCount = match[1];
        }
    } catch (error) {
        console.log("Tests failed or had errors.");
        if (error.stdout) console.log(error.stdout.split('\n').slice(-5).join('\n'));
    }

    // Coverage
    console.log("\n📈 Coverage:");
    try {
        // Run coverage silently and capture output
        const coverageOutput = execSync('npm run test:coverage -- --run', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
        const lines = coverageOutput.split('\n');
        const allFiles = lines.find(l => l.includes('All files'));

        if (allFiles) {
            console.log("File               | % Stmts | % Branch | % Funcs | % Lines |");
            console.log("-------------------|---------|----------|---------|---------|");

            let filesLabel = "All files";
            if (testFileCount > 0) {
                filesLabel = `${testFileCount} Files`;
            }
            // "All files" is 9 chars. Pad to match so columns align.
            console.log(allFiles.replace(/^All files/, filesLabel.padEnd(9)));
        } else {
            console.log("Coverage summary not found.");
        }
    } catch (error) {
        console.log("Coverage run failed.");
    }

    // Lint
    console.log("\n📝 Lint issues:");
    try {
        execSync('npm run lint', { stdio: 'ignore' });
        console.log("0 problems (Lint passed)");
    } catch (error) {
        console.log("Lint issues found (run 'npm run lint' for details)");
    }

    // Bundle size
    console.log("\n📦 Bundle size:");
    const assetsDir = path.join(__dirname, '../dist/assets');
    if (fs.existsSync(assetsDir)) {
        const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));
        files.forEach(file => {
            const stats = fs.statSync(path.join(assetsDir, file));
            const size = (stats.size / 1024).toFixed(2) + ' KB';
            console.log(`${size.padEnd(10)} ${file}`);
        });
    } else {
        console.log("dist/assets not found (run 'npm run build' first)");
    }

} catch (err) {
    console.error("Error executing metrics:", err);
}
