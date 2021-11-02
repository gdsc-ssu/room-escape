class Terminal {
  constructor() {
    this.state = {
      command: "",
      dir: "/",
    };

    this.commands = {
      help: this.help,
      ls: this.ls,
      cat: this.cat,
      clear: this.clear,
      exit: this.exit,
    };

    this.dir_tree = {
      "/": {
        "index.html": `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="./style.css" rel="stylesheet"/>
    <script type="module" src="./script.js"></script>
    <title>Document</title>
</head>
<body>
    <h1>Hello, world!</h1>
</body>
</html>
        `,
        "style.css": "body { color: red; }",
        "script.js": "alert('next password is 960506');",
      },
    };
  }

  help = () => {
    return "Available commands: help, clear, ls, cat, exit";
  };

  ls = () => {
    return Object.keys(this.dir_tree[this.state.dir]).join(" ");
  };

  exit = () => {
    return "들어올때는 마음대로지만 나갈땐 아니란다.";
  };

  cat = () => {
    const args = this.state.command.split(" ").slice(1);
    if (args.length === 0) {
      return "cat: missing operand";
    }
    const file = args[0];
    if (!this.dir_tree[this.state.dir][file]) {
      return `cat: ${file}: No such file or directory`;
    }
    return this.dir_tree[this.state.dir][file];
  };

  /**
   *
   * @param {string} command
   * @returns {string}
   */
  eval = (command) => {
    this.state.command = command;
    const cmd = command.split(" ")?.[0] ?? command;
    if (command.length === 0) {
      return "";
    }
    if (Object.keys(this.commands).includes(cmd)) {
      return this.commands[cmd]();
    } else {
      return "Unknown command: " + command;
    }
  };
}

const term = new Terminal();

jQuery(function ($, undefined) {
  $("#term_demo").terminal(
    function (command) {
      if (command !== "") {
        var result = term.eval(command, this);
        if (result != undefined) {
          this.echo(String(result));
        }
      } else if (command === "clear") {
        this.clear();
      }
    },
    {
      greetings: "안녕하세요!",
      name: "js_demo",
      height: 200,
      width: 450,
      prompt: "$ ",
    }
  );
});
