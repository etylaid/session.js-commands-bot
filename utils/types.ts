export interface Command {
    execute: (args: string[]) => void;
}

// Type "Command" is for a future release, hopefully