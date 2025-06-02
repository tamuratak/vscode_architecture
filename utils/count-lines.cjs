#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const visited = new Set();

function readFileLines(filePath) {
	try {
		const content = fs.readFileSync(filePath, 'utf8');
		return content.split('\n').length;
	} catch (e) {
		return 0;
	}
}

function resolveImportPath(importPath, baseDir) {
	if (importPath.startsWith('.')) {
		let fullPath = path.resolve(baseDir, importPath);
		if (fs.existsSync(fullPath)) return fullPath;
		const fullPath2 = fullPath.replace(/\.js$/, '.ts');
		if (fs.existsSync(fullPath2)) return fullPath2;
		if (fs.existsSync(fullPath + '.ts')) return fullPath + '.ts';
		if (fs.existsSync(fullPath + '.js')) return fullPath + '.js';
		if (fs.existsSync(fullPath + '/index.ts')) return fullPath + '/index.ts';
		if (fs.existsSync(fullPath + '/index.js')) return fullPath + '/index.js';
	}
	return null; // Ignore node_modules and others
}

function extractImports(filePath) {
	const content = fs.readFileSync(filePath, 'utf8');
	const importRegex = /import\s+(?:[^'"]+\s+from\s+)?['"](.+)['"]/g;
	const imports = [];
	let match;
	while ((match = importRegex.exec(content)) !== null) {
		imports.push(match[1]);
	}
	const importRegex2 = /import\(['"](.+)['"]\)/g;
	while ((match = importRegex2.exec(content)) !== null) {
		imports.push(match[1]);
	}
	return imports;
}

function countLinesRecursive(filePath) {
	const absPath = path.resolve(filePath);
	if (visited.has(absPath) || !fs.existsSync(absPath)) return 0;
	visited.add(absPath);

	let total = readFileLines(absPath);
	const imports = extractImports(absPath);
	const baseDir = path.dirname(absPath);

	for (const imp of imports) {
		const resolved = resolveImportPath(imp, baseDir);
		if (resolved) {
			console.log(resolved);
			total += countLinesRecursive(resolved);
		}
	}
	return total;
}

// CLI entry
if (require.main === module) {
	const inputFile = process.argv[2];
	if (!inputFile) {
		console.error('Usage: node count-lines.js <entry-file.ts>');
		process.exit(1);
	}
	const totalLines = countLinesRecursive(inputFile);
	console.log(totalLines);
}
