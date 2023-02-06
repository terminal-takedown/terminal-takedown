enum COMMAND_LIST {
    HARD_MODE = 'hard mode',
    DEBUG = 'debug',
    EXIT = 'exit',
    WHOAMI = 'whoami',
    SHUTDOWN = 'shutdown',
    REBOOT = 'reboot',
}
// type SpecialCommand -- frames,text,color
type SpecialCommand = [number, string, string];
const SPECIAL_COMMANDS: { [key: string]: SpecialCommand } = {
    [COMMAND_LIST.HARD_MODE]: [50, 'HARD MODE activated', 'green'],
    [COMMAND_LIST.DEBUG]: [
        75,
        'DEBUG MODE enabled permanently in this browser',
        'green',
    ],
    [COMMAND_LIST.EXIT]: [
        120,
        'we need you to defend the system - no running away!',
        'red',
    ],
    [COMMAND_LIST.WHOAMI]: [
        150,
        'master of the universe, defender of the systems, best ethical hacker in town',
        'green',
    ],
    [COMMAND_LIST.SHUTDOWN]: [
        100,
        'SHUTDOWN aborted - got a job to do!',
        'red',
    ],

    [COMMAND_LIST.REBOOT]: [100, 'REBOOT failed - fulfill your duty', 'red'],
};
