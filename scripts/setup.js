#!/usr/bin/env node

/**
 * Project Setup Script
 * 
 * This script helps initialize the starter template for a new project by:
 * - Updating the project name, description, and author in package.json
 * - Updating the project name in README.md
 * - Cleaning up example files that are not needed
 * - Creating a fresh Git repository
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const rootDir = path.join(__dirname, '..');

/**
 * Ask the user for input
 * @param {string} question 
 * @returns {Promise<string>}
 */
function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

/**
 * Update package.json with the new project info
 * @param {string} projectName 
 * @param {string} description 
 * @param {string} author 
 */
function updatePackageJson(projectName, description, author) {
  const packageJsonPath = path.join(rootDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  packageJson.name = projectName.toLowerCase().replace(/\s+/g, '-');
  packageJson.version = '0.1.0';
  packageJson.description = description;
  packageJson.author = author;
  
  // Reset license if needed
  // packageJson.license = 'MIT';
  
  // Remove scripts meant for starter template only
  // delete packageJson.scripts['some-starter-specific-script'];
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Updated package.json');
}

/**
 * Update README.md with the new project name
 * @param {string} projectName 
 * @param {string} description 
 */
function updateReadme(projectName, description) {
  const readmePath = path.join(rootDir, 'README.md');
  let readme = fs.readFileSync(readmePath, 'utf8');
  
  // Replace title
  readme = readme.replace(/# Next.js Fullstack Starter/g, `# ${projectName}`);
  
  // Replace description
  const descriptionRegex = /A modern, production-ready template for building full-stack web applications with Next\.js 15, React 19, Tailwind CSS 4, and Supabase\./g;
  readme = readme.replace(descriptionRegex, description);
  
  fs.writeFileSync(readmePath, readme);
  console.log('✅ Updated README.md');
}

/**
 * Clean up example files that are not needed in a new project
 */
function cleanupExamples() {
  try {
    // Optional: You can uncomment these lines to remove example files
    // fs.rmdirSync(path.join(rootDir, 'src', 'stories'), { recursive: true });
    console.log('✅ Cleaned up example files');
  } catch (error) {
    console.error('Error cleaning up examples:', error);
  }
}

/**
 * Initialize a fresh Git repository
 */
function initializeGit() {
  try {
    // Remove existing .git directory
    fs.rmdirSync(path.join(rootDir, '.git'), { recursive: true });
    
    // Initialize new Git repository
    execSync('git init', { cwd: rootDir });
    execSync('git add .', { cwd: rootDir });
    execSync('git commit -m "Initial commit from Next.js Fullstack Starter"', { cwd: rootDir });
    
    console.log('✅ Initialized fresh Git repository');
  } catch (error) {
    console.error('Error initializing Git:', error);
  }
}

/**
 * Update .env.local with Supabase credentials
 * @param {string} supabaseUrl 
 * @param {string} supabaseKey 
 */
function updateEnvFile(supabaseUrl, supabaseKey) {
  const envPath = path.join(rootDir, '.env.local');
  
  // Create .env.local file if it doesn't exist
  if (!fs.existsSync(envPath)) {
    fs.copyFileSync(path.join(rootDir, '.env.example'), envPath);
  }
  
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Update Supabase credentials
  envContent = envContent.replace(/NEXT_PUBLIC_SUPABASE_URL=.*/, `NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}`);
  envContent = envContent.replace(/NEXT_PUBLIC_SUPABASE_ANON_KEY=.*/, `NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseKey}`);
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Updated .env.local with Supabase credentials');
}

/**
 * Install dependencies
 */
function installDependencies() {
  try {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { cwd: rootDir, stdio: 'inherit' });
    console.log('✅ Dependencies installed');
  } catch (error) {
    console.error('Error installing dependencies:', error);
  }
}

/**
 * Main setup function
 */
async function setup() {
  console.log('\n🚀 Welcome to the Next.js Fullstack Starter Setup!\n');
  
  try {
    const projectName = await askQuestion('Project name: ');
    const description = await askQuestion('Project description: ');
    const author = await askQuestion('Author: ');
    
    const setupSupabase = await askQuestion('Do you want to set up Supabase credentials now? (y/n): ');
    
    updatePackageJson(projectName, description, author);
    updateReadme(projectName, description);
    
    if (setupSupabase.toLowerCase() === 'y') {
      const supabaseUrl = await askQuestion('Supabase URL: ');
      const supabaseKey = await askQuestion('Supabase Anon Key: ');
      updateEnvFile(supabaseUrl, supabaseKey);
    }
    
    const cleanupOption = await askQuestion('Do you want to clean up example files? (y/n): ');
    if (cleanupOption.toLowerCase() === 'y') {
      cleanupExamples();
    }
    
    const gitOption = await askQuestion('Do you want to initialize a fresh Git repository? (y/n): ');
    if (gitOption.toLowerCase() === 'y') {
      initializeGit();
    }
    
    const installOption = await askQuestion('Do you want to install dependencies now? (y/n): ');
    if (installOption.toLowerCase() === 'y') {
      installDependencies();
    }
    
    console.log('\n✨ Setup complete! Happy coding!\n');
  } catch (error) {
    console.error('Error during setup:', error);
  } finally {
    rl.close();
  }
}

// Run the setup
setup(); 