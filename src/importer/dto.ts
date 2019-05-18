export interface IImportGraphEdge {
	cost: number;
	source: string;
	target: string;
}
export interface IImportGraphNode {
	label: string;
}
export interface IImportGraph {
	nodes: IImportGraphNode[];
	edges: IImportGraphEdge[];
}
export interface IGraphNode {
	id: TNodeId;
	label: string;
	edges: TGraphEdgeMap;
}
export interface IGraph {
	nodes: TGraphNodeMap;
	labelMap: TGraphLabelMap;
}
export type TNodeId = string;
export type TGraphNodeMap = Map<TNodeId, IGraphNode>;
export type TGraphLabelMap = Map<string, TNodeId>;
export type TGraphEdgeMap = Map<TNodeId, number>;
