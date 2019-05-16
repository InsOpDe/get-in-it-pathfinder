import { expect, use } from "chai";
import { readFile } from "fs";
import { promisify } from "util";
import {
	IImportGraph,
	convert
} from "../internal";
import * as chaiAsPromised from "chai-as-promised";
import "mocha";
use(chaiAsPromised);
const promiseReadFile = promisify(readFile);
describe("Importer", () => {
	it("should create a graph from mock data", async () => {
		/* Arrange */
		const graphToImport: IImportGraph = {
			nodes: [
				{
					label: "foo"
				},
				{
					label: "bar"
				}
			],
			edges: [
				{
					source: "0",
					target: "1",
					cost: 1
				}
			]
		};
		/* Act */
		const graph = convert(graphToImport);
		/* Assert */
		expect(graph.nodes.get("0").id).to.be.eq("0");
		expect(graph.nodes.get("0").label).to.be.eq("foo");
		expect(graph.nodes.get("1").label).to.be.eq("bar");
		expect(graph.nodes.get("0").edges.get("1")).to.be.eq(1);
		expect(graph.nodes.get("1").edges.get("0")).to.be.eq(1);
	});
	it("should create a graph from import", async () => {
		/* Arrange */
		const graphToImport: IImportGraph = JSON.parse(await promiseReadFile("./data/generatedGraph.json", "utf-8"));
		/* Act */
		const graph = convert(graphToImport);
		/* Assert */
		expect(graph.nodes.get("0").edges.get("716")).to.be.eq(0.6822963504682433);
		expect(graph.nodes.get("716").edges.get("0")).to.be.eq(0.6822963504682433);
		expect(graph.nodes.get("0").edges.get("545")).to.be.eq(0.03357866023634526);
		expect(graph.nodes.get("545").edges.get("0")).to.be.eq(0.03357866023634526);
		expect(graph.nodes.get("0").edges.get("577")).to.be.eq(0.9906129305526605);
		expect(graph.nodes.get("577").edges.get("0")).to.be.eq(0.9906129305526605);
		expect(graph.nodes.get("0").edges.get("932")).to.be.eq(0.17459311924978604);
		expect(graph.nodes.get("932").edges.get("0")).to.be.eq(0.17459311924978604);
	})
});
