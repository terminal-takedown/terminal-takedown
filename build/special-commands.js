var COMMAND_LIST;
(function (COMMAND_LIST) {
    COMMAND_LIST["HARD_MODE"] = "hard mode";
    COMMAND_LIST["DEBUG"] = "debug";
    COMMAND_LIST["EXIT"] = "exit";
    COMMAND_LIST["WHOAMI"] = "whoami";
})(COMMAND_LIST || (COMMAND_LIST = {}));
const SPECIAL_COMMANDS = {
    [COMMAND_LIST.HARD_MODE]: 'HARD MODE activated',
    [COMMAND_LIST.DEBUG]: 'DEBUG MODE enabled permanently in this browser',
    [COMMAND_LIST.EXIT]: 'we need you to defend the system - no running away!',
    [COMMAND_LIST.WHOAMI]: 'master of the universe, defender of the systems, best ethical hacker in town',
};
