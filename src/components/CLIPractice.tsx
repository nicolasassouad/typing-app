import {
  Stat,
  TypedText,
  TypingStats,
  useTypingSession,
} from './TypingSession';

interface CLICommand {
  command: string;
  description: string;
}

// Common CLI/bash commands
const CLI_COMMANDS: CLICommand[] = [
  {
    command: 'ls -la',
    description: 'List all files and directories with details',
  },
  {
    command: 'cd ~/Documents',
    description: 'Change directory to Documents folder',
  },
  {
    command: 'mkdir myproject',
    description: 'Create a new directory named myproject',
  },
  {
    command: 'rm -rf node_modules',
    description: 'Remove directory and all contents recursively',
  },
  {
    command: 'cp file.txt backup.txt',
    description: 'Copy file.txt to backup.txt',
  },
  {
    command: 'mv old.txt new.txt',
    description: 'Rename or move old.txt to new.txt',
  },
  {
    command: 'grep -r "pattern" .',
    description: 'Search for pattern recursively in current directory',
  },
  {
    command: 'find . -name "*.js"',
    description: 'Find all JavaScript files in current directory',
  },
  { command: 'cat file.txt', description: 'Display contents of file.txt' },
  {
    command: 'head -n 10 file.txt',
    description: 'Display first 10 lines of file.txt',
  },
  {
    command: 'tail -f log.txt',
    description: 'Follow and display log.txt in real-time',
  },
  { command: 'chmod +x script.sh', description: 'Make script.sh executable' },
  {
    command: 'ps aux | grep node',
    description: 'List all processes and filter for node',
  },
  {
    command: 'kill -9 12345',
    description: 'Force kill process with PID 12345',
  },
  {
    command: 'tar -czf archive.tar.gz folder/',
    description: 'Create compressed tar archive of folder',
  },
  {
    command: 'tar -xzf archive.tar.gz',
    description: 'Extract compressed tar archive',
  },
  { command: 'git status', description: 'Show the working tree status' },
  { command: 'git add .', description: 'Stage all changes for commit' },
  {
    command: 'git commit -m "message"',
    description: 'Commit changes with a message',
  },
  {
    command: 'git push origin main',
    description: 'Push commits to main branch on origin',
  },
  {
    command: 'git pull origin main',
    description: 'Fetch and merge from main branch',
  },
  {
    command: 'npm install',
    description: 'Install dependencies from package.json',
  },
  {
    command: 'npm run build',
    description: 'Run build script from package.json',
  },
  { command: 'docker ps', description: 'List running Docker containers' },
  {
    command: 'docker build -t myapp .',
    description: 'Build Docker image from current directory',
  },
  { command: 'ssh user@host', description: 'Connect to remote server via SSH' },
  {
    command: 'scp file.txt user@host:/path',
    description: 'Copy file to remote server via SCP',
  },
];

const COMMANDS = CLI_COMMANDS.map((cmd) => cmd.command);

export function CLIPractice() {
  const { state, stats, restart } = useTypingSession(COMMANDS);

  return (
    <div className="typing-practice-container">
      <TypingStats stats={stats} onRestart={restart}>
        <Stat label="Completed" value={state.completedCount} />
      </TypingStats>
      <div className="cli-description component-text-s">
        {CLI_COMMANDS[state.itemIndex].description}
      </div>
      <TypedText state={state} className="cli-text" />
    </div>
  );
}
