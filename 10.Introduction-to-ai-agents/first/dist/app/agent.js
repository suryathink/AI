import { HARNESS_PROMPT } from "./config.js";
export class AgentBuilder {
    instructions;
    toolList;
    constructor() {
        this.toolList = [];
    }
    setInstructions(instructions) {
        this.instructions = instructions;
        return this;
    }
    Tool(tool) {
        this.toolList.push(tool);
        return this;
    }
    build() {
        return new Agent(this);
    }
}
export class Agent {
    instructions;
    messageHistory;
    toolMap;
    constructor(builder) {
        this.instructions = `${HARNESS_PROMPT}\n\n System prompt: ${builder["instructions"]} Available Tools:
            ${builder.toolList.map((t) => JSON.stringify({ functionName: t.name, functionDescription: t.description, functionDoc: t.doc })).join("\n")}`;
        this.messageHistory = [];
        this.toolMap = new Map();
        for (const tool of builder.toolList) {
            this.toolMap.set(tool.name, tool);
        }
    }
    static builder() {
        return new AgentBuilder();
    }
    printSystem() {
        console.log(this.instructions);
    }
    async run(query) {
        console.log(`Running agent with query: ${query}`);
    }
}
//# sourceMappingURL=agent.js.map