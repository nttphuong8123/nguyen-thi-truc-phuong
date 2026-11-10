const fs = require('fs');
const db = JSON.parse(fs.readFileSync('src/data/seed-db.json', 'utf8'));
const rm = db.site_pages.find(p => p.route_path === '/study-corner/risk-management');
const ch1Match = rm.html_content.match(/<section[^>]*id=["']chuong-?1["'][^>]*>([\s\S]{1,1500})/i);
if (ch1Match) {
  console.log(ch1Match[0]);
} else {
  console.log('No ch1 found');
}
