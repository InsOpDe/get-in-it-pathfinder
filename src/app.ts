#!/usr/bin/env node
import { prompt } from "inquirer";
import * as chalk from "chalk";
import { textSync } from "figlet";
import {
	convert,
	ESolver,
	IImportGraph,
	IProblem,
	ISolution,
	solve,
	TGraphLabelMap
} from "./internal";
import { promisify } from "util";
import { readFile } from "fs";
import * as arg from "arg";
const promiseReadFile = promisify(readFile);
const args = arg({
	"--help": Boolean,
	"--file": String,
	"--algorithm": String,
	"--start": String,
	"--end": String,
	"-h": "--help",
	"-s": "--start",
	"-a": "--algorithm",
	"-e": "--end",
	"-f": "--file"
});
const printHelp = () => {
	console.log("Use it like this:");
	console.log(
		"node app.js --file graph.json --start erde --end b3-r7-r4nd7 --algorithm 0"
	);
};
const init = () => {
	console.log(
		chalk.default.green(
			textSync("Pathfinder", {
				font: "Cyberlarge",
				horizontalLayout: "default",
				verticalLayout: "default"
			})
		)
	);
};
const askAlgorithm = async (algorithm?: string) => {
	if (!algorithm) {
		const question = [
			{
				type: "list",
				name: "algorithm",
				message: "Choose algorithm",
				choices: ["Bellman Ford[0]", "Dijkstra[1]", "Floyd Warshall[2]"]
			}
		];
		algorithm = ((await prompt(question)) as any).algorithm;
	}
	return selectAlgorithm(algorithm);
};
const askFile = async (filename?: string): Promise<IImportGraph> => {
	try {
		if (!filename) {
			const question = [
				{
					name: "filename",
					type: "input",
					message: "Path to graph.json"
				}
			];
			filename = ((await prompt(question)) as any).filename;
		}
		return JSON.parse(await promiseReadFile(filename, "utf-8"));
	} catch (e) {
		console.log(chalk.default.red.bold(e));
		return await askFile();
	}
};
const askNode = async (
	labelMap: TGraphLabelMap,
	nodetype: string,
	label?: string
) => {
	if (!label) {
		const question = [
			{
				name: "label",
				type: "input",
				message: `Label of ${nodetype} node`
			}
		];
		label = ((await prompt(question)) as any).label;
	}
	const node = labelMap.get(label.toLowerCase());
	if (typeof node === "undefined") {
		console.log(
			chalk.default.red.bold(`The ${nodetype} node ${label} can't be found`)
		);
		return await askNode(labelMap, nodetype);
	}
	return node;
};
const success = (solution: ISolution, time: number): void => {
	console.log(
		chalk.default.white.bgGreen.bold(
			`Done in ${time}ms! Path is ${solution.path.join(
				", "
			)} with an overall cost of ${solution.cost}`
		)
	);
};
const selectAlgorithm = (selection: string): ESolver => {
	switch (
		selection
			.toLowerCase()
			.trim()
			.replace(" ", "")
	) {
		case "0":
		case "bellmanford":
		default:
			return ESolver.bellmanFord;
		case "1":
		case "dijkstra":
			return ESolver.dijkstra;
		case "2":
		case "floydwarshall":
			return ESolver.floydWarshall;
	}
};
const run = async () => {
	try {
		init();
		if (args["--help"]) {
			return printHelp();
		}
		const graph = convert(await askFile(args["--file"]));
		const solver = await askAlgorithm(args["--algorithm"]);
		const start = await askNode(graph.labelMap, "start", args["--start"]);
		const finish = await askNode(graph.labelMap, "finish", args["--end"]);
		const problem: IProblem = {
			graph,
			solver,
			start,
			finish
		};
		console.log(chalk.default.bold(`Solution is calculated..`));
		const startTime = Date.now();
		const solution = solve(problem);
		success(solution, Date.now() - startTime);
	} catch (e) {
		console.log(chalk.default.red.bold(e));
	}
};
run();
