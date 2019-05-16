export interface IImportGraphEdge {
	cost: number,
	source: string,
	target: string
}
export interface IImportGraphNode {
	label: string
}
export interface IImportGraph {
	nodes: IImportGraphNode[],
	edges: IImportGraphEdge[]
}
export interface IGraphNode {
	id: TGraphId,
	label: string,
	edges: TGraphEdgeMap
}
export interface IGraph {
	nodes: TGraphNodeMap
}
export type TGraphId = string;
export type TGraphNodeMap = Map<TGraphId, IGraphNode>;
export type TGraphEdgeMap = Map<TGraphId, number>;
