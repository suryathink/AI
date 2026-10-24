import { Agent, AgentBuilder } from "./app/agent.js";
const weatherTool = {
    name: "fetchWeatherInfo",
    description: "Fetches realtime weather data by cityname",
    doc: 'fetchWeatherInfo(cityName: string): ',
    executor: async function (input) {
        return Promise.resolve("Resolved");
    }
};
async function main() {
    const agent = Agent.builder()
        .setInstructions("You are a helpful assistant math expert.").Tool(weatherTool).build();
    agent.printSystem();
}
main();
//# sourceMappingURL=index.js.map