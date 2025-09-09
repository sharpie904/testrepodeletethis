#!/usr/bin/env tsx

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// This script can be extended to generate types from Prisma schema
// For now, we'll use it to ensure our build process works

const generateApiTypes = () => {
  const content = `// Auto-generated API types
// This file is generated automatically. Do not edit manually.

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/sign-in/email',
    REGISTER: '/api/auth/sign-up/email',
    LOGOUT: '/api/auth/sign-out',
    SESSION: '/api/me',
  },
  ORGANIZATIONS: {
    LIST: '/api/organizations',
    GET: (id: string) => \`/api/organizations/\${id}\`,
    CREATE: '/api/organizations',
    UPDATE: (id: string) => \`/api/organizations/\${id}\`,
    DELETE: (id: string) => \`/api/organizations/\${id}\`,
  },
  FAMILY_MEMBERS: {
    LIST: (orgId: string) => \`/api/family-members/\${orgId}\`,
    CREATE: (orgId: string) => \`/api/family-members/\${orgId}\`,
    GET: (orgId: string, memberId: string) => \`/api/family-members/\${orgId}/\${memberId}\`,
    UPDATE: (orgId: string, memberId: string) => \`/api/family-members/\${orgId}/\${memberId}\`,
    DELETE: (orgId: string, memberId: string) => \`/api/family-members/\${orgId}/\${memberId}\`,
    ROLE: (orgId: string) => \`/api/family-members/\${orgId}/role\`,
  },
} as const;
`;

  const outputDir = join(process.cwd(), 'src', 'generated');
  mkdirSync(outputDir, { recursive: true });
  
  writeFileSync(join(outputDir, 'api-endpoints.ts'), content);
  console.log('✅ Generated API endpoints');
};

const main = () => {
  console.log('🔄 Generating types...');
  generateApiTypes();
  console.log('✅ Type generation complete!');
};

main();