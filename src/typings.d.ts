/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module "*.json" {
    const value: any;
    export default value;
}


declare module "*.js" {
    const value: any;
    export default value;
}

declare module "node-telegram-bot-api" {
    const value: any;
    export default value;
}

declare module "xmlhttprequest-ssl" {
    const value: any;
    export default value;
}





