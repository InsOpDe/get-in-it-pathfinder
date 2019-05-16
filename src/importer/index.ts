import {
	IImportGraph,
	IImportGraphNode,
	TGraphNodeMap,
	IImportGraphEdge,
	IGraph
} from "../internal";
/**
 * Converts imported JSON to a more useful format
 */
export const convert = (graph: IImportGraph): IGraph => {
	const nodes = createNodeMap(graph.nodes);
	passEdgesToNodes(graph.edges, nodes);
	return { nodes };
};
/**
 * Creates NodeMap from imported JSON
 */
const createNodeMap = (nodes: IImportGraphNode[]): TGraphNodeMap => {
	const sanitizedNodes: TGraphNodeMap = new Map();
	for (const id in nodes) {
		const node = nodes[id];
		sanitizedNodes.set(id, {
			edges: new Map(),
			id,
			label: node.label
		})
	}
	return sanitizedNodes;
};
/**
 * Mutates node-map due passing edges from imported JSON.
 */
const passEdgesToNodes = (edges: IImportGraphEdge[], nodes: TGraphNodeMap) : void => {
	for (const edge of edges) {
		const {
			cost,
			source: sourceId,
			target: targetId
		} = edge;
		/* Graph is undirected, that means we can give costs in both directions */
		const sourceNode = nodes.get(String(sourceId));
		const targetNode = nodes.get(String(targetId));
		sourceNode.edges.set(targetNode.id, cost);
		targetNode.edges.set(sourceNode.id, cost);
	}
};
