var COMMAND_LIST;
(function (COMMAND_LIST) {
    COMMAND_LIST["HARD_MODE"] = "hard mode";
    COMMAND_LIST["DEBUG"] = "debug";
    COMMAND_LIST["EXIT"] = "exit";
    COMMAND_LIST["WHOAMI"] = "whoami";
    COMMAND_LIST["SHUTDOWN"] = "shutdown";
    COMMAND_LIST["REBOOT"] = "reboot";
})(COMMAND_LIST || (COMMAND_LIST = {}));
const SPECIAL_COMMANDS = {
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
