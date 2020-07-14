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
            let beforeFun = 'module.exports =  ';
            let codeGood = beforeFun+code;
            console.log(codeGood);
            let c = vm.run(codeGood, __filename);
            let m = c();
            return m;
        }catch (e) {
            console.log(e);
        }

    }

}