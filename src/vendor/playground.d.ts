declare type Sandbox = import("./sandbox").Sandbox;
declare type Monaco = typeof import("monaco-editor");
import { PluginUtils } from "./pluginUtils";
import type React from "react";
export { PluginUtils } from "./pluginUtils";
export declare type PluginFactory = {
    (i: (key: string, components?: any) => string, utils: PluginUtils): PlaygroundPlugin;
};
/** The interface of all sidebar plugins */
export interface PlaygroundPlugin {
    /** Not public facing, but used by the playground to uniquely identify plugins */
    id: string;
    /** To show in the tabs */
    displayName: string;
    /** Should this plugin be selected when the plugin is first loaded? Lets you check for query vars etc to load a particular plugin */
    shouldBeSelected?: () => boolean;
    /** Before we show the tab, use this to set up your HTML - it will all be removed by the playground when someone navigates off the tab */
    willMount?: (sandbox: Sandbox, container: HTMLDivElement) => void;
    /** After we show the tab */
    didMount?: (sandbox: Sandbox, container: HTMLDivElement) => void;
    /** Model changes while this plugin is actively selected  */
    modelChanged?: (sandbox: Sandbox, model: import("monaco-editor").editor.ITextModel, container: HTMLDivElement) => void;
    /** Delayed model changes while this plugin is actively selected, useful when you are working with the TS API because it won't run on every keypress */
    modelChangedDebounce?: (sandbox: Sandbox, model: import("monaco-editor").editor.ITextModel, container: HTMLDivElement) => void;
    /** Before we remove the tab */
    willUnmount?: (sandbox: Sandbox, container: HTMLDivElement) => void;
    /** After we remove the tab */
    didUnmount?: (sandbox: Sandbox, container: HTMLDivElement) => void;
    /** An object you can use to keep data around in the scope of your plugin object */
    data?: any;
}
interface PlaygroundConfig {
    /** Language like "en" / "ja" etc */
    lang: string;
    /** Site prefix, like "v2" during the pre-release */
    prefix: string;
    /** Optional plugins so that we can re-use the playground with different sidebars */
    plugins?: PluginFactory[];
    /** Should this playground load up custom plugins from localStorage? */
    supportCustomPlugins: boolean;
}
export declare const setupPlayground: (sandbox: Sandbox, monaco: Monaco, config: PlaygroundConfig, i: (key: string) => string, react: typeof React) => {
    exporter: {
        openProjectInStackBlitz: () => void;
        openProjectInCodeSandbox: () => void;
        reportIssue: () => Promise<void>;
        copyAsMarkdownIssue: () => Promise<void>;
        copyForChat: () => void;
        copyForChatWithPreview: () => void;
        openInTSAST: () => void;
    };
    // ui: import("./createUI").UI;
    registerPlugin: (plugin: PlaygroundPlugin) => void;
    plugins: PlaygroundPlugin[];
    getCurrentPlugin: () => PlaygroundPlugin;
    tabs: HTMLButtonElement[];
    setDidUpdateTab: (func: (newPlugin: PlaygroundPlugin, previousPlugin: PlaygroundPlugin) => void) => void;
};
export declare type Playground = ReturnType<typeof setupPlayground>;
