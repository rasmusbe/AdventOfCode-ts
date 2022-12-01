import {copy} from "fs-extra";

const day = (process.argv[2] || new Date().getDate()).toString().padStart(2, '0');
copy(`${__dirname}/DayX`, `${__dirname}/Day${day}`);