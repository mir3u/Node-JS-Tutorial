var {NodeVM} = require("vm2");

const vm = new NodeVM({
    console: 'inherit',
    require: {
        external: true,
        builtin: ['*'],
        import:[ 'express', 'simplecrawler'],
        root: "../",
        mock: {
            fs: {
                readFileSync() { return 'Nice try!'; }
            }
        }
    }
});
const sandboxModule = module.exports = {
    runJsFunction: (code, variableRun)=>{
        try {
            let a = vm.run(code, __filename);
            let m = a(10);
            return m;
        }catch (e) {
            console.log(e);
        }

    }

}