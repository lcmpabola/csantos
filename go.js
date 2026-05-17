import fs from 'fs';
import fetch from 'node-fetch';

async function main() {
  const url = 'https://broker.csantosvp.pt/abola-odata/v1/ABola';

  const response = await fetch(url, {
    headers: {
      'Cache-Control': 'no-cache',
      'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY
    }
  });
  const jsonData = await response.json();
  const snippet = `var data = (${JSON.stringify(jsonData)});`;

  fs.writeFileSync('public/cs.js', snippet, 'utf-8');

  console.log('Successfully generated cs.js');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});