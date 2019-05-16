import {
	IGraph, TGraphId,
} from "../internal";
export interface IProblem {
	solver: ESolver,
	graph: IGraph,
	start: string,
	finish: string
}
export interface ISolution {
	path: TGraphId[],
	cost: number
}
export enum ESolver {
	dijkstra
}
