import { HARNESS_PROMPT } from "./config.js";

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

export class AgentBuilder {
  private instructions: string | undefined;
  public toolList: ITool[];

  constructor() {
    this.toolList = [];
  }

  public setInstructions(instructions: string) {
    this.instructions = instructions;
    return this;
  }

  public Tool(tool: ITool) {
    this.toolList.push(tool);
    return this;
  }

  public build() {
    return new Agent(this);
  }
}

export class Agent {
  private instructions: string;
  private messageHistory: IMessage[];
  private toolMap: Map<string, ITool>;
  private MAX_LOOP = 30;

  constructor(builder: AgentBuilder) {
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

  public printSystem(){
    console.log(this.instructions);
  }

  public async run(query: string) {
    console.log(`Running agent with query: ${query}`);
  }
}
