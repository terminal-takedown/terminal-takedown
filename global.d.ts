// This file will add both p5 instanced and global intellisence
import * as p5Global from 'p5/global';
import { SoundFile } from 'p5';
import module = require('p5');
export = module;
export as namespace p5;

declare global {
    function loadSound(
        path: string | any[],
        successCallback?: (...args: any[]) => any,
        errorCallback?: (...args: any[]) => any,
        whileLoading?: (...args: any[]) => any
    ): p5.SoundFile;
    function soundFormats(f1: string, f2: string): void;
}
