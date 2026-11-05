import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const options = {cwd:fileURLToPath(new URL('../',import.meta.url)),env:{...process.env,SITE_MODE:'production'},stdio:'inherit'};
for(const args of [['scripts/prepare-media.mjs'],['scripts/validate-content.mjs','--production'],['node_modules/astro/bin/astro.mjs','build'],['scripts/check-dist.mjs']]) { const result=spawnSync(process.execPath,args,options); if(result.status!==0) process.exit(result.status||1); }
