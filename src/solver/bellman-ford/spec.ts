import { expect, use } from "chai";
import { readFile } from "fs";
import { promisify } from "util";
import {
	convert,
	bellmanFord,
	ESolver,
	IImportGraph,
	IProblem
} from "../../internal";
import * as chaiAsPromised from "chai-as-promised";
import "mocha";
use(chaiAsPromised);
const promiseReadFile = promisify(readFile);
describe("Solver: Bellman Ford", () => {
	it("should solve path and cost from test import", async () => {
		/* Arrange */
		const graphToImport: IImportGraph = JSON.parse(
			await promiseReadFile("./data/test.json", "utf-8")
		);
		const graph = convert(graphToImport);
		const problem: IProblem = {
			graph,
			solver: ESolver.floydWarshall,
			start: "0",
			finish: "2"
		};
		/* Act */
		const { cost, path } = bellmanFord(problem);
		/* Assert */
		expect(cost).to.be.eq(2);
		expect(path).to.be.eql(["0", "1", "2"]);
	});
	it("should not solve path from test import", async () => {
		/* Arrange */
		const graphToImport: IImportGraph = JSON.parse(
			await promiseReadFile("./data/test.json", "utf-8")
		);
		const graph = convert(graphToImport);
		const problem: IProblem = {
			graph,
			solver: ESolver.floydWarshall,
			start: "0",
			finish: "3"
		};
		/* Act */
		const { cost, path } = bellmanFord(problem);
		/* Assert */
		expect(cost).to.be.eq(Infinity);
		expect(path).to.be.eql([]);
	});
	it("should solve path and cost from import", async () => {
		/* Arrange */
		const graphToImport: IImportGraph = JSON.parse(
			await promiseReadFile("./data/generatedGraph.json", "utf-8")
		);
		const graph = convert(graphToImport);
		const problem: IProblem = {
			graph,
			solver: ESolver.floydWarshall,
			start: "0",
			finish: "246"
		};
		/* Act */
		const { cost, path } = bellmanFord(problem);
		/* Assert */
		expect(cost).to.be.eq(2.9460583961187536);
		expect(path).to.be.eql(["0", "932", "778", "240", "689", "294", "246"]);
	});
});
