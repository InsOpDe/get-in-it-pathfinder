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
	id: TNodeId,
	label: string,
	edges: TGraphEdgeMap
}
export interface IGraph {
	nodes: TGraphNodeMap
}
export type TNodeId = string;
export type TGraphNodeMap = Map<TNodeId, IGraphNode>;
export type TGraphEdgeMap = Map<TNodeId, number>;
