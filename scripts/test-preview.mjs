import { spawn } from 'child_process';
import http from 'http';

console.log('Testing preview server...');
const preview = spawn('npm.cmd', ['run', 'preview', '--', '--port', '4173'], {
  stdio: 'pipe',
  shell: true,
});

let output = '';
preview.stdout.on('data', (d) => {
  output += d.toString();
});
preview.stderr.on('data', (d) => {
  output += d.toString();
});

setTimeout(() => {
  const req = http.get('http://localhost:4173', (res) => {
    console.log(`Server responded with status: ${res.statusCode}`);
    let body = '';
    res.on('data', (chunk) => (body += chunk));
    res.on('end', () => {
      console.log(`Response length: ${body.length} characters`);
      const hasMakeItYours = body.includes('Make it yours') || body.includes('root');
      console.log(`Contains expected bundle or root: ${hasMakeItYours}`);
      preview.kill();
      process.exit(0);
    });
  });

  req.on('error', (err) => {
    console.error('Request failed:', err.message);
    console.error('Server output:', output);
    preview.kill();
    process.exit(1);
  });
}, 2500);

