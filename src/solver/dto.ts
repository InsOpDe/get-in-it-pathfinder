import {
	IGraph, TNodeId,
} from "../internal";
export interface IProblem {
	solver: ESolver,
	graph: IGraph,
	start: string,
	finish: string
}
export interface ISolution {
	path: TNodeId[],
	cost: number
}
export enum ESolver {
	dijkstra,
	floydWarshall
}
