#!/usr/bin/env node

/**
 * Global CLI tool to create a new Next.js project from the starter template
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Path to this template repository
const TEMPLATE_PATH = path.join(__dirname, '..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Ask the user for input
 * @param {string} question 
 * @returns {Promise<string>}
 */
async function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

/**
 * Copy the template to a new directory
 * @param {string} targetDir 
 */
function copyTemplate(targetDir) {
  console.log(`📁 Creating new project in ${targetDir}...`);
  
  // Check if directory exists
  if (fs.existsSync(targetDir)) {
    const isEmpty = fs.readdirSync(targetDir).length === 0;
    if (!isEmpty) {
      throw new Error(`Directory ${targetDir} is not empty. Please choose an empty directory.`);
    }
  } else {
    // Create directory if it doesn't exist
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Get list of files to copy, excluding .git and node_modules
  const filesToCopy = execSync(`find . -type f -not -path "*/node_modules/*" -not -path "*/.git/*"`, { 
    cwd: TEMPLATE_PATH, 
    encoding: 'utf8' 
  }).split('\n').filter(Boolean);
  
  // Also get directories to ensure they exist (excluding .git and node_modules)
  const dirsToCreate = execSync(`find . -type d -not -path "*/node_modules/*" -not -path "*/.git/*"`, { 
    cwd: TEMPLATE_PATH, 
    encoding: 'utf8' 
  }).split('\n').filter(Boolean);
  
  // Create all directories first
  for (const dir of dirsToCreate) {
    const targetPath = path.join(targetDir, dir);
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }
  }
  
  // Copy all files
  for (const file of filesToCopy) {
    const sourcePath = path.join(TEMPLATE_PATH, file);
    const targetPath = path.join(targetDir, file);
    
    // Only copy if source exists (to handle any weird find results)
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
  
  console.log('✅ Template files copied successfully');
}

/**
 * Run the project setup script in the new directory
 * @param {string} targetDir 
 */
function runSetupScript(targetDir) {
  console.log('🚀 Running setup script...');
  execSync('npm run setup', { 
    cwd: targetDir, 
    stdio: 'inherit' 
  });
}

/**
 * Main function
 */
async function main() {
  console.log('🌟 Create Next.js Fullstack Project 🌟\n');
  
  try {
    // Get project location from command line args or ask user
    let projectPath = process.argv[2];
    if (!projectPath) {
      projectPath = await askQuestion('Where would you like to create your project? ');
    }
    
    // Convert to absolute path if relative
    if (!path.isAbsolute(projectPath)) {
      projectPath = path.join(process.cwd(), projectPath);
    }
    
    // Copy template
    copyTemplate(projectPath);
    
    // Run setup script
    const shouldSetup = await askQuestion('Do you want to run the setup script now? (y/n): ');
    if (shouldSetup.toLowerCase() === 'y') {
      runSetupScript(projectPath);
    } else {
      console.log(`\n✨ Template copied to ${projectPath}`);
      console.log('To complete setup, run:');
      console.log(`  cd ${projectPath}`);
      console.log('  npm run setup');
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the script
main(); 