const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];
if (!componentName) {
  console.error('Please provide a component name: npm run create:component Button');
  process.exit(1);
}

const componentDir = path.join('src', 'components', 'shared');
const componentContent = `import React from 'react';

export interface ${componentName}Props {
  children: React.ReactNode;
}

export function ${componentName}({ children }: ${componentName}Props) {
  return (
    <div>
      {children}
    </div>
  );
}`;

fs.mkdirSync(componentDir, { recursive: true });
fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), componentContent);

// Create test file
const testContent = `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders children correctly', () => {
    render(<${componentName}>Test Content</${componentName}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});`;

fs.writeFileSync(path.join(componentDir, `${componentName}.test.tsx`), testContent);

console.log(`✅ Created component at src/components/shared/${componentName}.tsx`);
console.log(`✅ Created test at src/components/shared/${componentName}.test.tsx`);
