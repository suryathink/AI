import {Agent, AgentBuilder} from "./app/agent.js";
import type {ITool} from "./app/agent.js";

const weatherTool:ITool = {
    name: "fetchWeatherInfo",
    description: "Fetches realtime weather data by cityname",
    doc: 'fetchWeatherInfo(cityName: string): ',
    executor: async function (input: string): Promise<string> {
         return Promise.resolve("Resolved")
    }
};

async function main() {
    const agent = Agent.builder()
        .setInstructions("You are a helpful assistant math expert.").Tool(weatherTool).build()
        
      
        agent.printSystem()

    }

main()