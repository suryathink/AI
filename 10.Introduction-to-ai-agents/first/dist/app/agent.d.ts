export interface IMessage {
    role: "system" | "user" | "assistant";
    content: string;
}
export interface ITool {
    name: string;
    description: string;
    doc?: string;
    executor: (input: string) => Promise<string>;
}
export declare class AgentBuilder {
    private instructions;
    toolList: ITool[];
    constructor();
    setInstructions(instructions: string): this;
    Tool(tool: ITool): this;
    build(): Agent;
}
export declare class Agent {
    private instructions;
    private messageHistory;
    private toolMap;
    constructor(builder: AgentBuilder);
    static builder(): AgentBuilder;
    printSystem(): void;
    run(query: string): Promise<void>;
}
//# sourceMappingURL=agent.d.ts.map