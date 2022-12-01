const day = (process.argv[2] || new Date().getDate()).toString().padStart(2, '0');

require(`./Day${day}`).run();