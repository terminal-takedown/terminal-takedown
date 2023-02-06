enum COMMAND_LIST {
    HARD_MODE = 'hard mode',
    DEBUG = 'debug',
    EXIT = 'exit',
    WHOAMI = 'whoami',
}

const SPECIAL_COMMANDS: { [key: string]: string } = {
    [COMMAND_LIST.HARD_MODE]: 'HARD MODE activated',
    [COMMAND_LIST.DEBUG]: 'DEBUG MODE enabled permanently in this browser',
    [COMMAND_LIST.EXIT]: 'we need you to defend the system - no running away!',
    [COMMAND_LIST.WHOAMI]:
        'master of the universe, defender of the systems, best ethical hacker in town',
};
